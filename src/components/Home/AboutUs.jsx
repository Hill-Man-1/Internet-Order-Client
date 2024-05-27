/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import FeaturesGrid from '../features/FeatureGrid';
import teamImage from '../../assets/teamImage.webp';

function AboutUs() {
    return (
        <div id='about' className="bg-white py-10 px-5">
            <div className="container mx-auto px-10 flex flex-col md:flex-row items-center">
                <div className="flex-1 flex justify-center mb-6 md:mb-0">
                    <img src={teamImage} alt="Our Team" className="w-full max-w-md" />
                </div>
                <div className="flex-1 text-center md:text-left p-2 shadow-md rounded-lg bg-gray-300">
                    <h1 className="text-4xl font-bold mb-3 text-center">About Us!</h1>
                    <p className="text-xl mb-2 text-justify">
                        At <span className="font-bold">BlackLink</span>, we understand the importance of fast, reliable, and
                        secure connectivity in today's digital age. As an innovative Internet Service Provider (ISP),
                        we are committed to delivering connectivity solutions that not only meet today's needs but also
                        anticipate future demands. Founded by a group of professionals with extensive experience in the
                        telecommunications industry, we are dedicated to bringing the fastest and most reliable connections to homes, 
                        offices, and devices across Indonesia.
                    </p>
                </div>
            </div>
                <FeaturesGrid/>
        </div>
    );
}

export default AboutUs;
