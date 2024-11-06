// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const PaymentsTbl = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:8081/payments');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-left text-gray-700">Payment Details</h2>
            <div className="overflow-x-auto">
                <div className="max-h-80 overflow-y-auto rounded-lg">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead className="sticky top-0 bg-blue-100 text-gray-700 shadow">
                        <tr>
                            <th className="p-4 font-medium">Account Number</th>
                            <th className="p-4 font-medium">Receipt Number</th>
                            <th className="p-4 font-medium">Customer Name</th>
                            <th className="p-4 font-medium">Address</th>
                            <th className="p-4 font-medium">Paid Date</th>
                            <th className="p-4 font-medium">Amount Paid</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.slice(0, 10).map((payment, index) => (
                            <tr
                                key={payment.paymentId}
                                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="p-4 border-b">{payment.consumer.accountNo}</td>
                                <td className="p-4 border-b">{payment.receiptNumber}</td>
                                <td className="p-4 border-b">{`${payment.consumer.firstName} ${payment.consumer.lastName}`}</td>
                                <td className="p-4 border-b">{payment.consumer.address}</td>
                                <td className="p-4 border-b">
                                    {new Date(payment.paymentDate).toLocaleDateString()}
                                </td>
                                <td className="p-4 border-b text-left text-blue-600 font-semibold">
                                    {`Rs. ${payment.amount.toFixed(2)}`}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsTbl;
