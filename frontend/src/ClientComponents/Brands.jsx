import React from 'react';
import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import  logo1 from '../assets/logo1.png';
import  logo2 from '../assets/logo2.png';
import  logo3 from '../assets/logo3.png';
import  logo4 from '../assets/logo4.jpg';
import  logo5 from '../assets/logo5.jpg';


function Brands() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToShow: 5, // Default for xl screens
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1536, // xl and above
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1280, // lg
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1022, // tablet
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 766, // mobile
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: false,
            },
          },
        ],
      };
      

  return (
    <div className="bg-white px-5 lg:px-28 pb-10 pt-10 md:pt-5  lg:pt:0 xl:pt:0 ">
      <ReactSlick {...settings}>
        <div>
          <img src={logo1} alt="Client Logo 1" className="mx-auto h-[4cm] w-[full]" />
        </div>
        <div>
          <img src={logo2} alt="Client Logo 2" className="mx-auto  h-[4cm] w-[full]" />
        </div>
        <div>
          <img src={logo3} alt="Client Logo 3" className="mx-auto  h-[4cm] w-[full]" />
        </div>
        <div>
          <img src={logo4} alt="Client Logo 4" className="mx-auto  h-[4cm] w-[full]" />
        </div>
        <div>
          <img src={logo5} alt="Client Logo 5" className="mx-auto  h-[4cm] w-[full]" />
        </div>
      </ReactSlick>
    </div>
  );
}

export default Brands;