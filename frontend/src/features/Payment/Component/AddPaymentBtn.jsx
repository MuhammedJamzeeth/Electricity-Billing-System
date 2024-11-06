// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Notification from './Notification.jsx';
import ConfirmationDialog from "./ConfirmationDialog.jsx";

// eslint-disable-next-line react/prop-types
const InputField = ({ label, type, value, onChange, disabled = false, name }) => (
    <div>
        <label className="block text-gray-700 font-medium">{label}:</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            name={name}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern={type === 'number' ? '[0-9]*' : undefined}
        />
    </div>
);

const AddPaymentBtn = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        accountNumber: '',
        customerName: '',
        receiptNumber: '',
        amount: '',
        paymentDate: '',
    });
    const [notification, setNotification] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const toggleForm = () => setShowForm((prev) => !prev);

    const handleChange = ({ target: { name, value } }) => setFormData((prevData) => ({ ...prevData, [name]: value }));

    const handleAccountNumberChange = async (e) => {
        const accountNumber = e.target.value;
        handleChange(e);
        if (!accountNumber) return setFormData((prev) => ({ ...prev, customerName: '' }));

        try {
            const response = await fetch('http://localhost:8081/payments');
            const data = await response.json();
            const customer = data.find(payment => payment.consumer.accountNo.toString() === accountNumber);
            setFormData((prevData) => ({
                ...prevData,
                customerName: customer ? `${customer.consumer.firstName} ${customer.consumer.lastName}` : '',
            }));
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const handleConfirmSubmit = async () => {
        const { accountNumber, receiptNumber, amount, paymentDate } = formData;
        setShowConfirmation(false);

        try {
            const response = await fetch('http://localhost:8081/payments/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accountNumber: parseInt(accountNumber, 10),
                    receiptNumber: parseInt(receiptNumber, 10),
                    amount: parseFloat(amount),
                    paymentDate,
                }),
            });

            if (response.ok) {
                setNotification('New payment added successfully');
                setFormData({ accountNumber: '', customerName: '', receiptNumber: '', amount: '', paymentDate: '' });
                setShowForm(false);
            } else {
                console.error('Failed to create payment:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true); // Show confirmation dialog
    };

    return (
        <div className="relative mt-4">
            <button
                onClick={toggleForm}
                className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
                Add Payment
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add Payment</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <InputField
                                label="Account No"
                                type="number"
                                value={formData.accountNumber}
                                onChange={handleAccountNumberChange}
                                name="accountNumber"
                            />
                            <InputField
                                label="Customer Name"
                                type="text"
                                value={formData.customerName}
                                disabled
                            />
                            <InputField
                                label="Receipt No"
                                type="number"
                                value={formData.receiptNumber}
                                onChange={handleChange}
                                name="receiptNumber"
                            />
                            <InputField
                                label="Amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                name="amount"
                            />
                            <InputField
                                label="Payment Date"
                                type="date"
                                value={formData.paymentDate}
                                onChange={handleChange}
                                name="paymentDate"
                            />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleForm();
                                        setNotification('Payment cancelled');
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onConfirm={handleConfirmSubmit}
                onCancel={() => setShowConfirmation(false)}
            />

            {/* Notification */}
            <Notification message={notification} onClose={() => setNotification('')} />
        </div>
    );
};

export default AddPaymentBtn;
