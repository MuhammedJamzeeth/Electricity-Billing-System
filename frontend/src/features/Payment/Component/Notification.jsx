// Notification.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, duration = 2000, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-200">
            {message}
        </div>
    );
};

export default Notification;
