import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import "../quill.css";

function AboutUs() {
    const [pageContent, setPageContent] = useState({
        heading: '',
        shortDescription: '',
        longDescription: '',
        photo: [],
        sign: '',
        counterno: 0,
        countername: '',
    });
    const [counter, setCounter] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const componentRef = useRef(null);

    const isHomePage = window.location.href.includes("about-us");
    const isAboutPath = window.location.pathname === '/about-us';

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/aboutus/getActiveAboutus`, { withCredentials: true });
            setPageContent(response.data || {});
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startCounterAnimation();
                }
            },
            { threshold: 0.5 }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, [pageContent.counterno, hasAnimated]);

    const startCounterAnimation = () => {
        const end = parseInt(pageContent.counterno, 10);
        if (end > 0) {
            let start = 0;
            const duration = 3000;
            const incrementTime = Math.floor(duration / end);

            const counterInterval = setInterval(() => {
                start += 1;
                setCounter(start);
                if (start === end) {
                    clearInterval(counterInterval);
                }
            }, incrementTime);
        }
    };

    return (
        <div ref={componentRef} className="relative xl:-mt-12 px-3 lg:-mt-16 md:mt-[10rem] sm:py-5 w-full">
            <div className=" w-full mx-auto px-4 xl:px-8 flex flex-col md:flex-row items-center">
                <div className="sm:pr-8 xl:pr-0  mt-[4rem] lg:mt-[1rem] text-center md:text-left">
                    <div ref={componentRef} className="relative w-full">
                        <h2 className="text-2xl md:text-4xl text-center lg:hidden block font-bold mb-2">
                            <span className="text-[#384b98]">ABOUT</span>
                            <span className="text-[#df950d]"> US</span>
                        </h2>
                        <div className={` xl:ml-5 ${isHomePage ? 'w-full' : 'max-w-[90rem] xl:mt-20'}`}>
                            <div className="flex flex-col lg:flex-row mt-8 justify-center  gap-8 items-center">
                                {!isAboutPath && (
                                    <div className="w-full lg:w-1/2 xl:w-full md:ml-9 lg:-mb-2  xl:mb-10 xl:ml-12  relative">
                                        <div className="absolute top-[-20px] left-[-20px] w-[80%] lg:w-[100%] h-[80%] bg-[#fab700] z-0"></div>
                                        <img
                                            src={`/api/image/download/${pageContent.photo}`}
                                            alt={pageContent.alt}
                                            title={pageContent.imgTitle}
                                            className="w-full h-auto lg:h-[30vh] xl:h-[55vh] object-fill  xl:w-[70wh] relative z-10 shadow-lg  shadow-black"
                                        />
                                        <div className="absolute bottom-[-20px] right-[-20px] w-[60%] h-[60%] bg-[#384b98] z-0"></div>
                                    </div>
                                )}

                                {isAboutPath && (
                                    <div className="w-full lg:w-1/2  xl:w-full lg:-mb-2  xl:mb-10 xl:ml-12  relative">
                                        <div className="absolute top-[-20px] left-[-20px] w-[80%] lg:w-[100%] h-[80%] bg-[#fab700] z-0"></div>
                                        <img
                                            src={`/api/image/download/${pageContent.photo}`}
                                            alt={pageContent.alt}
                                            title={pageContent.imgTitle}
                                            className="w-full h-auto lg:h-[30vh] xl:h-[55vh] object-fill  xl:w-[70wh] relative z-10 shadow-lg  shadow-black"
                                        />
                                        <div className="absolute bottom-[-20px] right-[-20px] w-[60%] h-[60%] bg-[#384b98] z-0"></div>
                                    </div>
                                )}

                                {/* Right Content Section */}
                                {!isAboutPath &&

                                    <div className="w-full lg:w-[80%] xl:w-full xl:-mt-12 lg:pl-5">
                                        <div className="mb-6">
                                            {!isAboutPath &&
                                                <h2 className="text-2xl lg:block lg:ml-5 hidden md:text-4xl xl:ml-4 font-bold mb-2">
                                                    <span className="text-[#384b98]">ABOUT</span>
                                                    <span className="text-[#fab700]"> US</span>
                                                </h2>}

                                        </div>

                                        <ReactQuill
                                            readOnly={true}
                                            value={pageContent.shortDescription}
                                            modules={{ toolbar: false }}
                                            theme="bubble"
                                            className="quill font-medium"
                                            style={{ padding: 0 }}
                                        />


                                        {/* Read More Button */}
                                        {!isAboutPath ? (
                                            <Link
                                                to="/about-us"
                                                className="inline-block  bg-[#fab700] text-white md:ml-3  text-lg px-3 py-1 sm:px-8 sm:py-2 rounded-full hover:bg-[#fab700] transition-colors duration-300"
                                            >
                                                Read More
                                            </Link>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                }

                                {/* Right Content Section */}
                                {isAboutPath &&

                                    <div className="w-full lg:w-[80%] xl:w-full xl:-mt-12 lg:pl-5">
                                        <div className="mb-6">
                                            {!isAboutPath &&
                                                <h2 className="text-2xl lg:block lg:ml-5 hidden md:text-4xl xl:ml-4 font-bold mb-2">
                                                    <span className="text-[#384b98]">ABOUT</span>
                                                    <span className="text-[#fab700]"> US</span>
                                                </h2>}

                                        </div>
                                        <p className='text-black mb-16 pr-16 w-full md:-mt-8 '>
                                            <ReactQuill
                                                readOnly={true}
                                                value={pageContent.shortDescription}
                                                modules={{ toolbar: false }}
                                                theme="bubble"
                                                className="quill font-medium"
                                                style={{ padding: 0 }}
                                            />
                                        </p>


                                        {/* Read More Button */}
                                        {!isAboutPath ? (
                                            <Link
                                                to="/about-us"
                                                className="inline-block  bg-[#fab700] text-white md:ml-3  text-lg px-3 py-1 sm:px-8 sm:py-2 rounded-full hover:bg-[#fab700] transition-colors duration-300"
                                            >
                                                Read More
                                            </Link>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full z-[-1] opacity-10">
                            <div className="w-full h-full bg-gradient-to-r from-blue-50 to-blue-100"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(90deg, #4169e1 0px, #4169e1 2px, transparent 2px, transparent 20px)`
                                }}>
                            </div>
                        </div>
                    </div>

                    {isHomePage && pageContent.longDescription && (
                        <p className="text-black mb-16 px-10 w-full md:-mt-8 ">
                            <ReactQuill
                                readOnly={true}
                                value={pageContent.longDescription}
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill font-medium mt-12  xl:mt-16 "
                            />
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
