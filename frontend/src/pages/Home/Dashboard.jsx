// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dash.css';

function Home() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [branchCount, setBranchCount] = useState(0);
    const [consumerCount, setConsumerCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [monthlyPayments, setMonthlyPayments] = useState([]);

    // Month mapping from number to month name
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Fetch employee count from backend
    useEffect(() => {
        async function fetchEmployeeCount() {
            try {
                const response = await fetch('http://localhost:8081/employees/count'); // Adjust with your backend URL
                const count = await response.json();
                setEmployeeCount(count);
            } catch (error) {
                console.error("Failed to fetch employee count:", error);
            }
        }
        fetchEmployeeCount();
    }, []);

    useEffect(() => {
        async function fetchBranchCount() {
            try {
                const response = await fetch('http://localhost:8081/branch/branch/count');
                const count = await response.json();
                setBranchCount(count);
            } catch (error) {
                console.error("Failed to fetch branch count:", error);
            }
        }
        fetchBranchCount();
    },[]);

    useEffect(() => {
        async function fetchConsumerCount() {
            try {
                const response = await fetch('http://localhost:8081/consumer/count');
                const count = await response.json();
                setConsumerCount(count);
            } catch (error) {
                console.error("Failed to fetch consumer count:", error);
            }
        }
        fetchConsumerCount();
    },[]);

    useEffect(() => {
        async function fetchPaymentCount() {
            try {
                const response = await fetch('http://localhost:8081/payment/count');
                const count = await response.json();
                setPaymentCount(count);
            } catch (error) {
                console.error("Failed to fetch payment count:", error);
            }
        }
        fetchPaymentCount();
    },[]);

    //barchart
    useEffect(() => {
        async function fetchMonthlyPayments() {
            try {
                const response = await fetch('http://localhost:8081/payment/monthly');
                const data = await response.json();

                // Format the data to convert month numbers to month names
                const formattedData = data.map(item => ({
                    month: monthNames[item[0] - 1],  // Convert 1-based month number to 0-based index for monthNames
                    totalPayment: item[1]
                }));

                setMonthlyPayments(formattedData);
            } catch (error) {
                console.error("Failed to fetch monthly payments:", error);
            }
        }
        fetchMonthlyPayments();
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Consumers</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{consumerCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Branches</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{branchCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Employees</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>{employeeCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Payments</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>{paymentCount}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={350}
                        height={300}
                        data={monthlyPayments}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip formatter={(value) => [`${value} Rupees`, "Monthly Payments"]} />
                        <Legend formatter={() => "Monthly Payments"} />
                        <Bar dataKey="totalPayment" name="Monthly Payments" fill="#2E3944"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
