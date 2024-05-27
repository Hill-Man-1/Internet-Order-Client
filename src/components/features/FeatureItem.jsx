/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function FeatureItem({ icon, title, description }) {
    return (
        <div className="text-center p-5">
            <img src={icon} alt={title} className="mx-auto h-12 w-12" />
            <h4 className="text-xl font-semibold mt-3 mb-2">{title}</h4>
            <p className='text-justify'>{description}</p>
        </div>
    );
}

export default FeatureItem;
