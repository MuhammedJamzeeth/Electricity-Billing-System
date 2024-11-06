// eslint-disable-next-line no-unused-vars
import React from 'react';
import AddPaymentBtn from "../../features/Payment/Component/AddPaymentBtn.jsx";
import PaymentsTbl from "../../features/Payment/Component/PaymentsTbl.jsx";

const Payment = () => {
    return (
        <div className="container">
            <AddPaymentBtn/>
            <PaymentsTbl/>
        </div>
    );
};

export default Payment;