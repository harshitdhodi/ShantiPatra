import React, { useState, useEffect } from 'react';
import Plantimg from "../assets/plantimg.png";
import { FiArrowUpRight } from "react-icons/fi";
import axios from 'axios';
import ReactQuill from 'react-quill';
import SVG from "../assets/circle.svg";
import { Link } from 'react-router-dom';

function Homecarousel() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionHome', { withCredentials: true });
            setBanners(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); // Change image every 3 seconds (default sliding from left to right)
        }, 3000);

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [currentSlide, currentImageIndex]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        if (currentImageIndex < banners[currentSlide].photo.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0);
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
        }
    };

    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(banners[currentSlide].photo.length - 1);
            setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
        }
    };

    return (
        <div className="relative lg:h-[70vh]   h-[30vh] group w-full mb-10">
            <div className="relative h-full">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    banners.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`absolute w-full lg:h-[70vh] md:h-[55vh] md:mb-10 h-[40vh] duration-500 ${slideIndex === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={`/api/image/download/${slide.photo[0]}`}
                                />
                                <img
                                    src={`/api/image/download/${slide.photo[1] || slide.photo[0]}`}
                                    alt={`${slide.alt[currentImageIndex] || ''}`}
                                    title={`${slide.imgTitle[currentImageIndex] || ''}`}
                                    className="h-full w-full object-cover filter brightness-100 contrast-110"
                                />
                            </picture>

                            {/* Modified content container with left alignment */}
                            <div className="absolute inset-0 bg-black/10  lg:w-full` gap-6 sm:gap-0  lg:gap-5 flex flex-col  justify-center items-start pl-[6rem]">
                                <h1
                                    className="lg:text-5xl md:text-3xl text-lg text-[#394c99] lg:w-full sm:right-0 right-[25%] relative top-[10%] sm:top-0  font-cursive text-left md:w-[25rem] pl-7 sm:pl-0 font-bold animate-slideUpFadeIn max-w-3xl"
                                    dangerouslySetInnerHTML={{ __html: slide.title }}
                                ></h1>

                                <h3 className="text-[#052852] pl-7 sm:pl-0 opacity-80 lg:max-w-[40rem] md:max-w-[20rem] sm:right-0 right-[25%] md:text-xl relative text-sm max-w-[600px] text-left py-4  font-medium animate-slideUpFadeIn" dangerouslySetInnerHTML={{ __html: slide.details }}>
                                  
                                </h3> 

                                <Link
                                    to="/aboutus"
                                    className="animate-slideUpFadeIn bottom-8 -left-[1rem] mt-2 sm:left-0 relative sm:bottom-0 sm:mt-0 rounded-full sm:text-xl md:text-lg md:px-8 md:py-2 md:text-lg shadow-xl bg-[#fab700] hover:bg-yellow-600 text-white text-left px-5 py-2 sm:px-8 text-sm cursor-pointer"
                                >
                                    Discover More
                                </Link>
                            </div>
                        </div>
                    ))
                )}

                {/* Default show arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute  sm:block md:mt-[5rem] sm:left-4 left-2 top-[60%] xl:top-[35%] lg:top-[52%] sm:top-[58%] transform -translate-y-[60%] lg:-translate-y-1/2 bg-transparent text-[#052852]  sm:p-2  rounded-full sm:h-10 sm:w-10 w-8 h-8 border border-[#052852] z-10"
                >
                    &#10094;
                </button>   
                <button
                    onClick={handleNext}
                    className="absolute sm:right-4  sm:block md:mt-[5rem] md:block md:top-[54%] right-2 top-[60%]  lg:top-[40%] sm:top-1/2 transform -translate-y-[60%] lg:-translate-y-1/2 bg-transparent text-[#052852] sm:p-2 rounded-full sm:h-10 sm:w-10 w-8 h-8 border border-[#052852] z-10"
                >
                    &#10095;
                </button>
            </div>
        </div>

    );
}

export default Homecarousel;
