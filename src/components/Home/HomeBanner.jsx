/* eslint-disable no-unused-vars */
import React, {useRef} from 'react';
import towerImage from '../../assets/towerImage.webp'

function HomeBanner() {
    return (
        <div id='home' className="bg-white p-10">
            <div className="container mx-auto px-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-1 text-center">
                        <h1 className="text-7xl font-bold text-gray-900 mb-4">
                            The Best Internet Provider Service at Home
                        </h1>
                        <p className="mb-8">
                            BlackLine Internet is ranked #1 in customer satisfaction for
                            Residential Internet Service in the world according to
                            newspaper.
                        </p>
                        <div className="flex gap-8 justify-center">
                            <button className="bg-black text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-900">
                                Get Started
                            </button>
                            <button className="bg-white text-black px-6 py-2 rounded-lg border border-black hover:bg-gray-100">
                                Learn more
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 md:ml-10 mt-10 md:mt-0">
                        <img src={towerImage} alt="Tower" className="w-90 h-550px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;
