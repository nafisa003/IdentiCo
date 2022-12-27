import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {

    
    const slideImage={
        height:400,
        width:"70%"
    }
    return (
        <div >
            <Carousel
            
            autoPlay={true}
            infiniteLoop={true}
           showThumbs={false}
            autoFocus={true}>
            <div>
                    <img src="/images/img6.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="/images/img5.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="/images/img4.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                    <img src="/images/img3.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                    <img src="/images/img2.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                    <img src="/images/img1.jpg" style={slideImage} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    );
};

export default HomeCarousel;