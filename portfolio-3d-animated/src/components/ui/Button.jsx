import React from 'react';

const Button = ({ children, onClick, className, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;