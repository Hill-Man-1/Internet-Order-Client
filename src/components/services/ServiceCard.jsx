/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function ServiceCard({ icon, title, description}) {
    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between h-64 w-65">
            <div className="flex flex-col items-center p-2">
                <img src={icon} alt={title} className="h-12 w-12" />
            </div>
            <div className="p-2 text-center flex-grow">
                <h3 className="font-bold text-3xl mb-1 text-black">{title}</h3>
                <p className="text-black text-xl text-justify">{description}</p>
            </div>
        </div>
    );
}

export default ServiceCard;