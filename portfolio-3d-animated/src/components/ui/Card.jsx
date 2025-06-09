import React from 'react';

const Card = ({ title, description, imageUrl, link }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-700 mt-2">{description}</p>
                <a href={link} className="mt-4 inline-block text-blue-500 hover:underline">
                    View Project
                </a>
            </div>
        </div>
    );
};

export default Card;