import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import Planet from "../assets/planet-earth.png"
// import Plant from "../assets/save-the-world.png"
// import Pencil from "../assets/pencil.png"
// import Checklist from "../assets/checklist.png"
// import Recycle from "../assets/recycling-bag.png"
// import Trashcan from "../assets/recycling.png"
import axios from 'axios'
import ReactQuill from 'react-quill';
import "../quill.css"



function WhatWeDo() {

  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/whyChoosePaper/getAllWhyChoosePaper`, { withCredentials: true });
    console.log(response)
      if (Array.isArray(response.data)) {
        const itemsWithIds = response.data.map((item, index) => ({
          ...item,
        }));
        setItems(itemsWithIds);
      } else {
        console.error('Data is not an array', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('/api/pageHeading/heading?pageType=whychoosepaper', { withCredentials: true });
      const { heading, subheading } = response.data;
      setHeading(heading || '');
      setSubheading(subheading || '');
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchHeadings();
  }, []);

  const settings = {
    dots: false,
    infinite: true, // Keep only one definition
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true, // Keep this only once here as well
          dots: false,
          arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true, // Keep this only once here as well
          arrows: false,
        }
      }
    ]
  };
    

  return (
    <div className='  lg:pb-10 w-full relative pb-16 overflow-hidden'>
     
      <div className='flex flex-col justify-center items-center mb-10 mt-10 lg:mx-[16rem]'>
        <p className='text-xl md:text-2xl lg:text-3xl xl:text-4xl md:mx-[8rem] xl:mx-[15rem] lg:mx-0  text-center font-bold text-transparent bg-clip-text bg-[#df950d] bg-left font-cursive bg-fixed '>{heading}</p>
      </div>
      <Slider {...settings} className='mx-8 gap-8 m-4 lg:gap-1 xl:relative  '>
        {items.map((item, index) => (
          <div className=' space-y-5'>
            <div key={index} className=' bg-[#f1f7f4]  p-10 xl:top-[4rem] xl:mt-[1rem] md:px-10  h-[16cm] md:h-[12cm]  '>
              <img src={`/api/image/download/${item.photo}`} alt={`${item.alt}`} title={`${item.imgTitle}`} className='w-[3cm] h-[3cm]' />
              <div className='mt-8'>
                <p className='uppercase font-bold text-green-700 text-[24px]'>{item.title}</p>
                <p className='mt-4 text-[#666666] mb-8 text-[17px]'> <ReactQuill
                  readOnly={true}
                  value={item.description}
                  modules={{ toolbar: false }}
                  theme="bubble"
                  className="quill"
                /></p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default WhatWeDo;
