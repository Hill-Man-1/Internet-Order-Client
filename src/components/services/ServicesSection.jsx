/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import ServiceCard from './ServiceCard';
import corporateIcon from '../../assets/Icon/corporateIcon.svg';
import homeIcon from '../../assets//Icon/homeIcon.svg';
import wirelessIcon from '../../assets//Icon/wirelessIcon.svg';
import iotIcon from '../../assets//Icon/iotIcon.svg';

function ServicesSection() {
    const servicesRef = useRef(null)
    return (
        <div id='services' ref={servicesRef} className="bg-white py-10 flex justify-center items-center">
            <div className="container mx-auto px-10">
                <div className="bg-gray-900 text-white p-8 rounded-lg flex flex-col items-center">
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-bold mb-3">SERVICES</h3>
                        <h1 className="text-4xl font-bold mb-3">Our Special Services!</h1>
                        <p>We provide a full suite of superfast internet & data connectivity services for corporate businesses with dedicated bandwidth, and multi-point data service</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ServiceCard 
                            icon={corporateIcon}
                            title="Corporate Internet"
                            description="We provide specialized internet solutions for businesses, featuring dedicated bandwidth that enables seamless business operations. Our multi-point data service is designed to support companies with multiple locations, ensuring strong and consistent connections at all branches"
                        />
                        <ServiceCard 
                            icon={homeIcon}
                            title="Home Internet"
                            description="Our broadband service offers superfast internet connectivity, ideal for home use. From high-quality video streaming to lag-free online gaming, our service ensures that every family member can enjoy the internet to its fullest."
                        />
                        <ServiceCard 
                            icon={wirelessIcon}
                            title="Wireless Network"
                            description="Our wireless network uses state-of-the-art RF technology to provide limitless connectivity without the need for cables. This solution is perfect for places that require configuration flexibility and mobility, such as cafes, hotels, or university campuses."
                        />
                        <ServiceCard 
                            icon={iotIcon}
                            title="IoT Solutions"
                            description="Our services for the Internet of Things (IoT) facilitate connectivity between smart devices, helping businesses and households automate processes and enhance efficiency. From smart home security systems to integrated building management solutions, our IoT services provide a strong foundation for future technologies."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesSection;