// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PaymentsTbl from "../../features/Payment/Component/PaymentsTbl.jsx";
import PaymentSearch from "../../features/Payment/Component/PaymentSearch.jsx";

const Payment = () => {
    return (
        <div className="container">

            <PaymentsTbl />
            <PaymentSearch/>
        </div>
    );
};

export default Payment;
