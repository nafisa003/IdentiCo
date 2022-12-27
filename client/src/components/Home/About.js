import React from 'react';
import './About.css';
const About = () => {

    const aboutContainer={
        textAlign:"center",
        marginTop:25,
       
    }
    return (
        <div style={aboutContainer} className="feature-container">
            <h3 className="feature-heading">Checkout the cool features!😎 </h3>
            <p><span className="feature">This is a DApp (decentralized application) that uses Ethereum Blockchain to secure the identity of you products!</span></p>
            <p><span  className="feature">Make Sure to sign in with email or google account before registering your company.</span>🤔</p>
            <p><span  className="feature">We guarentee security and protocols of company supply chain infrastructure.</span> </p>
            <p><span  className="feature">Get QR codes for products absolutely free!!</span>🤩</p>

        </div>
    );
};

export default About;