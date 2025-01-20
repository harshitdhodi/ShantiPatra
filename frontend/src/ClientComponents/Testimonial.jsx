import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import quotes from '../assets/quotes.png';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Testimonial = () => {
    const [current, setCurrent] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/testimonial/getActiveTestimonials`, { withCredentials: true });
            const testimonialsWithIds = response.data.data.map((testimonial) => ({
                ...testimonial,
            }));
            setTestimonials(testimonialsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
        fetchData();
    }, []);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=testimonial', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevCurrent) => (prevCurrent + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (testimonials.length === 0) {
        return <div>Loading...</div>;
    }

    const { photo, alt, imgTitle, name, designation, testimony, rating } = testimonials[current];

    return (
        <>
            {/* Mobile and Tablet Version (up to 1023px) */}
            <div className="bg-white  rounded-lg  md:max-w-4xl shadow-md max-w-xs mx-auto block xl:hidden">
                <h2 className="text-3xl mt-4 font-bold mb-8 text-center text-[#384b98] md:text-5xl   bg-clip-text bg-left font-cursive bg-fixed">
                    {heading}
                </h2>
                
                <div className="flex justify-center">
                    <img
                        src={`/api/image/download/${photo[0]}`}
                        alt={alt[0]}
                        title={imgTitle[0]}
                        className="w-[9rem] h-[9rem] rounded-full object-cover"
                    />
                </div>
                <div className="text-center mt-4">
                    <div className="text-lg font-medium text-gray-800">
                        <ReactQuill
                            readOnly={true}
                            value={testimony}
                            modules={{ toolbar: false }}
                            theme="bubble"
                            className="quill text-justify p-5"
                        />
                    </div>
                    <hr className="my-4 border-t border-gray-500" />
                    <p className="text-xl font-semibold text-gray-900">{name}</p>
                    <p className="text-green-600 font-medium">{designation}</p>
                    <div className="flex justify-center items-center mt-2">
                        {[...Array(Math.floor(rating))].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                        ))}
                        {rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                    </div>
                </div>
            </div>

            {/* Desktop Version (1024px and above) */}
            <div className="bg-gray-100 relative hidden xl:flex flex-col justify-center items-center mt-16 p-16 lg:p-32 rounded shadow-lg z-10">
                <h2 className="text-5xl  font-bold mb-8 text-center lg:w-[50%] text-[#384b98] bg-clip-text bg-left font-cursive bg-fixed">
                    {heading}
                </h2>
                <div className="flex flex-col justify-center items-center">
                    <div className="ml-[2rem] lg:ml-[4rem] bg-white pl-[14rem] lg:pl-[18rem] pr-[2rem] lg:pr-[4rem] text-gray-500 pt-[3rem] lg:pt-[4rem] pb-[3rem] lg:pb-[4rem] h-[28rem] lg:h-[30rem] overflow-hidden">
                        <div>
                            <img src={quotes} alt={name} title={name} className="opacity-[0.4] h-[4rem] lg:h-[5rem] min-w-6" />
                        </div>
                        <blockquote className="text-[24px] lg:text-[30px] italic mb-4 border-b border-b-gray-700 pb-[2rem] ml-[2rem] lg:ml-[4rem]">
                            <ReactQuill
                                readOnly={true}
                                value={testimony}
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill text-justify p-3"
                            />
                        </blockquote>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold text-lg mb-2 text-black">{name}</p>
                                <p className="text-green-600 mb-4 uppercase">{designation}</p>
                            </div>
                            <div className="flex items-center">
                                {[...Array(Math.floor(rating))].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                                {rating % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 md:absolute lg:left-[6rem] lg:top-20">
                        <img
                            src={`/api/image/download/${photo[0]}`}
                            alt={alt[0]}
                            title={imgTitle[0]}
                            className="h-[8cm] lg:h-[10cm] w-[7cm] lg:w-[9cm] object-cover shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;