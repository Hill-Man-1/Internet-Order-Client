/* eslint-disable no-unused-vars */
import React from 'react';
import FeatureItem from './FeatureItem';
import communityIcon from '../../assets/Icon/communityIcon.svg'; 
import commitmentIcon from '../../assets/Icon/commitmentIcon.svg';
import forwardIcon from '../../assets/Icon/forwardIcon.svg';
import joinIcon from '../../assets/Icon/joinIcon.svg';

function FeaturesGrid() {
    return (
        <div className=" text-black p-10">
            <div className="grid md:grid-cols-4 gap-4">
                <FeatureItem
                    icon={communityIcon}
                    title="Community and Support"
                    description="With us, become part of a community that 
                        thrives on innovation and growth. 
                        We believe that the true power of an ISP 
                        service lies in its ability to empower communities. BlackLine is committed to local
                        community development through various educational programs and partnerships with tech startups."
                />
                <FeatureItem
                    icon={commitmentIcon}
                    title="Our Commitment to Quality"
                    description="With us, you don't just get fast internet; 
                        you get internet you can rely on. Our customer support team is available 24/7 
                        to ensure that any questions or issues you have are addressed promptly and efficiently."
                />
                <FeatureItem
                    icon={forwardIcon}
                    title="Looking Forward"
                    description="With us, stay ahead of the curve. At BlackLine, 
                        we are always looking for ways to expand and improve our services.
                        With technology evolving every day, we are dedicated to ensuring that you are 
                        connected with the best and latest solutions."
                />
                <FeatureItem
                    icon={joinIcon}
                    title="Join Us"
                    description="At BlackLine ISP, we are not just your internet service provider; 
                        we are partners in your growth and success. 
                        Welcome to the future of connectivity. 
                        Embrace this journey with us, where every connection is a gateway to new opportunities."
                />
            </div>
        </div>
    );
}

export default FeaturesGrid;