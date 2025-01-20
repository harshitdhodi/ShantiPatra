import React, { useState } from 'react';
import SplashScreen from './Splashscreen';
import Homecarousel from '../Homecarousel';
import WhyChoosePaper from '../WhyChoosePaper';
import AboutUs from '../Aboutus';
import WhyChooseUs2 from '../WhyChooseUs2';
import Counter from "../Counter"
import OurClients from '../OurClients';
import LatestBlogs from '../LatestBlogs';
import Steps from "../Steps";
import Testimonial from '../Testimonial';
import WhatsAppButton from '../Whatsapp';
import Certificates from '../Certificates';
import ProductSlider from '../ProductSlider';
import ProductHome from '../ProductHome';
import CalculatorPage from '../calculator/CalculatorePage';


function Home() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashEnd = () => {
    setIsSplashVisible(false);
  };

  return (
    <div  className="relative w-full bg-gray-50">
     <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
      <SplashScreen
        onTransitionEnd={handleSplashEnd}
        isVisible={isSplashVisible}
      />


      <div>
      
        <Homecarousel />
        <AboutUs />
        <ProductHome />
       
        {/* <MissionVision/> */}
        {/* <WhyChooseUs /> */}
        {/* <WhyChooseUs2 /> */}
        {/* <WhyChoosePaper />
        <Steps /> */}
        {/* <Testimonial /> */}
        {/* <Certificates /> */}
        <LatestBlogs />
       
        <div id="calculator">
        <CalculatorPage />
        </div>
        <OurClients />
        {/* <Brands/> */}
      </div>
    </div>
  );
}

export default Home;
