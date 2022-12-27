import React from 'react';
import About from './About';
import HomeCarousel from './HomeCarousel';

const Home = () => {
    return (
        <div>
            <HomeCarousel></HomeCarousel>
            <div>
            <About></About>
            </div>
            
            
        </div>
    );
};

export default Home;