import axios from 'axios';
import React, { useState } from 'react';
import './checkout.css';

const Checkout = () => {
  const [checkout, setCheckout] = useState({ accountNo: "" });
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [billDetails, setBillDetails] = useState({
    currentDate: new Date().toISOString().split("T")[0],
    unit: "",
    monthBill: "",
    previousTotalDue: "",
    calckedUnit: "",
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCancel = () => {
    setCheckout({ accountNo: "" });
    setIsAccountValid(false);
    setBillDetails({
      currentDate: new Date().toISOString().split("T")[0],
      unit: "",
      monthBill: "",
      previousTotalDue: "",
      calckedUnit: "",
    });
    setIsCalculated(false);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "accountNo" && !/^\d*$/.test(value)) return;
    setCheckout({ ...checkout, [name]: value });
  };

  const onUnitChange = (e) => {
    setBillDetails({ ...billDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/eBillCheck', {
        accountNo: parseInt(checkout.accountNo, 10),
      });
      if (response.status === 200 && response.data === "Account approved") {
        setIsAccountValid(true);
        alert("Account verified successfully");
      } else {
        throw new Error("Invalid account");
      }
    } catch (error) {
      alert(error.response?.data || "An unexpected error occurred. Please try again.");
    }
  };

  const onCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:8081/calculateBill', {
        consumer: { accountNo: parseInt(checkout.accountNo, 10) },
        crntUnit: parseInt(billDetails.unit, 10),
      });
      const { monthBill, previousTotalDue, calckedUnit } = response.data;
      setBillDetails({
        ...billDetails,
        monthBill: monthBill || "",
        previousTotalDue: previousTotalDue || "",
        calckedUnit: calckedUnit || "",
      });
      setIsCalculated(true);
      alert("Bill calculated successfully");
    } catch (error) {
      alert(error.response?.data || "Error calculating bill");
    }
  };

  // const onSave = async () => {
  //   try {
  //     await axios.post('http://localhost:8081/saveBillDetails', {
  //       consumer: { accountNo: parseInt(checkout.accountNo, 10) },  
  //       crntUnit: parseInt(billDetails.unit, 10),  
  //       monthBill: parseFloat(billDetails.monthBill),  
  //       totalBill: parseFloat(billDetails.previousTotalDue) + parseFloat(billDetails.monthBill), 
  //       crntDate: formattedDate,  
  //     })
  //     .then(response => {
  //       console.log('Response:', response);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error.response || error);
  //     });
      
  //     alert("Bill saved successfully");
  //     handleCancel();
  //   } catch (error) {
  //     console.log(error)
  //     alert(error.response?.data || "Error saving bill");
  //   }
  // };


  const onSave = async () => {
    try {
        // Define formattedDate here
        const formattedDate = new Date().toLocaleString('en-GB', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        }).replace(',', ''); // format as yyyy-MM-dd HH:mm:ss
        
        // Now formattedDate can be used in the request
        await axios.post('http://localhost:8081/saveBillDetails', {
            consumer: { accountNo: parseInt(checkout.accountNo, 10) },  
            crntUnit: parseInt(billDetails.unit, 10),  
            monthBill: parseFloat(billDetails.monthBill),  
            totalBill: parseFloat(billDetails.previousTotalDue) + parseFloat(billDetails.monthBill), 
            crntDate: formattedDate,  
        })
        .then(response => {
            console.log('Response:', response);
        })
        .catch(error => {
            console.error('Error:', error.response || error);
        });
        
        alert("Bill saved successfully");
        handleCancel();
    } catch (error) {
        alert(error.response?.data || "Error saving bill");
    }
};

  return (
    <div className="bodch">
      <div className="checkout-container">
        <h1>Electricity Bill Calculator</h1>
        <p>Government Expanding Project</p>
        <hr />

        {!isAccountValid ? (
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="accountNo">Account Number</label>
              <input
                className="thumbnail-input"
                id="accountNo"
                name="accountNo"
                placeholder="390 xxx xx9"
                required
                maxLength={17}
                type="text"
                value={checkout.accountNo}
                onChange={onInputChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="reset" onClick={handleCancel}>Clear</button>
          </form>
        ) : (
          <div className="bill-details">
            <h2>Bill Details</h2>
            <table>
              <tbody>
                <tr>
                  <td>Account Number</td>
                  <td><input type="text" value={checkout.accountNo} disabled /></td>
                </tr>
                <tr>
                  <td>Current Date</td>
                  <td><input type="text" value={billDetails.currentDate} disabled /></td>
                </tr>
                <tr>
                  <td>Unit</td>
                  <td>
                    <input
                      type="number"
                      name="unit"
                      value={billDetails.unit}
                      onChange={onUnitChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Month Bill</td>
                  <td><input type="text" value={billDetails.monthBill} disabled /></td>
                </tr>
                <tr>
                  <td>Previous Total Due</td>
                  <td><input type="text" value={billDetails.previousTotalDue} disabled /></td>
                </tr>
                <tr>
                  <td>Calculated Unit</td>
                  <td><input type="text" value={billDetails.calckedUnit} disabled /></td>
                </tr>
              </tbody>
            </table>
            <button onClick={onCalculate} disabled={isCalculated}>Calculate</button>
            <button onClick={onSave} disabled={!isCalculated}>Save</button>
            <button onClick={handleCancel}>Clear</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
