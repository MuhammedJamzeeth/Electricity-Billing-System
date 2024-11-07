import React, { useState } from 'react';
import axios from 'axios';

const PaymentSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [payments, setPayments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input change in the search bar
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await axios.get('http://localhost:8081/payments/search', {
                params: {
                    searchTerm: searchTerm
                }
            });

            if (response.data.length === 0) {
                setErrorMessage('No consumer for the provided account number or name, try again.');
                setPayments([]);
            } else {
                setPayments(response.data);
            }
        } catch (error) {
            setErrorMessage('Error fetching data, please try again later.');
            setPayments([]);
        }
    };

    // Handle clear button to reset search and results
    const handleClear = () => {
        setSearchTerm('');
        setPayments([]);
        setErrorMessage('');
    };

    return (
        <div className="max-w-5xl mt-1 p-4 bg-white rounded-lg shadow-lg flex">
            {/* Left Side - Search Bar */}
            <div className="w-1/4 pr-4">
                <h2 className="text-xl font-bold mb-4">Search for Payments</h2>
                <form onSubmit={handleSearch} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Enter account number or full name"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Clear
                    </button>
                </form>
                {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
            </div>

            {/* Right Side - Payments List */}
            <div className="w-3/4 pl-4">
                {payments.length > 0 && (
                    <div>
                        <h3 className="text-xl text-center text-green-700 bg-amber-200 rounded-3xl font-semibold mb-2">Payments List of: {searchTerm}</h3>
                        <div className="overflow-x-auto max-h-40 border border-gray-300 rounded-lg">
                            <table className="min-w-full table-auto border-collapse">
                                <thead className="sticky top-0 bg-blue-100">
                                <tr>
                                    <th className="px-4 py-2 border-b text-left">Payment ID</th>
                                    <th className="px-4 py-2 border-b text-left">Receipt Number</th>
                                    <th className="px-4 py-2 border-b text-left">Amount</th>
                                    <th className="px-4 py-2 border-b text-left">Payment Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        <td className="px-4 py-2 border-b">{payment.paymentId}</td>
                                        <td className="px-4 py-2 border-b">{payment.receiptNumber}</td>
                                        <td className="px-4 py-2 border-b">{payment.amount}</td>
                                        <td className="px-4 py-2 border-b">{payment.paymentDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSearch;
