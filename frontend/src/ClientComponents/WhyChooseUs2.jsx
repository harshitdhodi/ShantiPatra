import React, { useState, useEffect, useRef } from 'react';
import Star from "../assets/star.png";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WhyChooseUs2() {
  const [animate, setAnimate] = useState(false);
  const [whuChooseUs, setWhyChooseUs] = useState([]);
  const [title, setTitle] = useState();
  const [no, setNo] = useState();
  const [sign, setSign] = useState();
  const [photo, setPhoto] = useState();
  const [alt, setAlt] = useState();
  const [imgTitle, setImgTitle] = useState();
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [counter, setCounter] = useState(0); // State for counter animation
  const [hasAnimated, setHasAnimated] = useState(false); // Prevent re-animation

  const componentRef = useRef(null); // Ref for the component

  useEffect(() => {
    const fetchWhyChooseUsCounter = async () => {
      try {
        const response = await axios.get(`
/api/whyChooseUsCounter/getWhyChooseUsCounters`, { withCredentials: true });
        const counter = response.data;
        setTitle(counter.title);
        setNo(counter.no);
        setSign(counter.sign);
        setPhoto(counter.photo);
        setAlt(counter.alt);
        setImgTitle(counter.imgTitle)
      } catch (error) {
        console.error(error);
      }
    };

    fetchWhyChooseUsCounter();
  }, []);

  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        const response = await axios.get("/api/whychooseus/getAllWhyChooseUs", { withCredentials: true });
        setWhyChooseUs(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchWhyChooseUs();
  }, []);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('/api/pageHeading/heading?pageType=whychooseus', { withCredentials: true });
      const { heading, subheading } = response.data;
      setHeading(heading || '');
      setSubheading(subheading || '');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  useEffect(() => {
    if (animate && !hasAnimated) {
      let start = 0;
      const end = parseInt(no, 10);
      if (start < end) {
        const duration = 3000; // Duration of the animation (in ms)
        const incrementTime = Math.floor(duration / end); // Time between increments

        const counterInterval = setInterval(() => {
          start += 1;
          setCounter(start);
          if (start === end) {
            clearInterval(counterInterval);
          }
        }, incrementTime);

        setHasAnimated(true); // Prevent re-animation
      }
    }
  }, [animate, no, hasAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [componentRef.current]);

  return (
    <>
      <div className="mb-8 flex items-center justify-center p-0 lg:px-[5rem] xl:px-[15rem]">
        <p className="text-2xl leading-[4rem] md:text-3xl md:leading-[5rem] lg:text-4xl lg:leading-[5rem] xl:text-4xl xl:leading-[5rem] text-center font-bold text-transparent bg-clip-text bg-[url('https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-left font-cursive bg-fixed">
          {heading}
        </p>
      </div>
      <div className='flex flex-col xl:flex-row justify-center items-center gap-8 xl:mx-16 mb-16' ref={componentRef}>

        <div className='flex flex-col md:flex-row xl:flex-col gap-8 mx-2 md:mx-8 xl:mx-2'>
          {whuChooseUs.slice(0, 2).map((item) => (
            <div key={item.id} className='flex flex-col md:flex-row md:justify-start md:items-start justify-center items-center gap-4 md:gap-2 md:border-b-0 xl:border-b border-b border-b-[#df950d] pb-8 md:pb-0 xl:pb-8'>
              <img src={`/api/image/download/${item.photo[0]}`} alt={item.alt} title={item.imgTitle} className='w-16 h-16' />
              <div className=' flex flex-col justify-center items-center md:justify-start md:items-start gap-4 '>
                <p className='font-bold text-[25px]'>
                  {item.title}
                </p>
                <p><ReactQuill
                  readOnly={true}
                  value={item.description}
                  modules={{ toolbar: false }}
                  theme="bubble"
                  className="quill"
                /></p>
              </div>
            </div>
          ))}
        </div>

        <div className='relative w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] xl:w-[80%] xl:h-full border-[50px] md:border-[80px] xl:border-[100px] border-blue-950 rounded-full flex flex-col justify-center items-center'>
          <img src={`/api/logo/download/${photo}`} alt={alt} title={imgTitle} className='h-[95%] xl:h-full' />
          <div className='xl:block hidden'>
            <img src={Star} alt={title} title={title} className='absolute top-[20rem] -left-8 w-[15rem] h-[15rem]' />
            <div className='absolute z-10 text-white left-6 top-[23rem] text-center text-[18px]'>
              <p className='text-[60px] font-semibold'>{counter}{sign}</p>
              {title}
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row xl:flex-col gap-8 mx-2 md:mx-8 xl:mx-2'>
          {whuChooseUs.slice(2, 4).map((item) => (
            <div key={item.id} className='flex flex-col md:flex-row xl:flex-row-reverse md:justify-start md:items-start justify-center items-center gap-4 md:gap-2 md:border-b-0 border-b xl:border-b border-b-[#df950d] pb-8 md:pb-0 xl:pb-8'>
              <img src={`/api/image/download/${item.photo[0]}`} alt={item.alt} title={item.imgTitle} className='w-16 h-16' />
              <div className=' flex flex-col justify-center items-center md:justify-start md:items-start gap-4 '>
                <p className='font-bold text-[25px]'>
                  {item.title}
                </p>
                <p><ReactQuill
                  readOnly={true}
                  value={item.description}
                  modules={{ toolbar: false }}
                  theme="bubble"
                  className="quill"
                /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs2;
