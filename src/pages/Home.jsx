/* eslint-disable no-unused-vars */
import React from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import ServicesSection from '../components/services/ServicesSection';
import AboutUs from '../components/Home/AboutUs';
import PricingSection from '../components/Home/PricingList'

function Home() {
    return (
        <div>
            <HomeBanner />
            <AboutUs/>
            <ServicesSection />
            <PricingSection/>
        </div>
    );
}

export default Home;
