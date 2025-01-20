import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "../quill.css";
import axios from 'axios';

function Steps() {
    const location = useLocation();
    const showH2 = !location.pathname.includes('custom');
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [steps, setSteps] = useState([]);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=customizationsteps', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/customizationsteps/getActiveCustomizationSteps`, { withCredentials: true });
            const StepsWithIds = response.data.data.map((stepItem, index) => ({
                ...stepItem,
                id: index + 1,
            }));
            setSteps(StepsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-white mb-16 px-4 lg:px-0">
            {showH2 && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl lg:leading-[5rem] font-bold text-center mb-4 text-[#384b98] bg-left font-cursive">
                    {heading}
                </h2>
            )}
            <p className="text-center text-gray-700 max-w-4xl mb-8">
                {subheading}
            </p>

            {/* First Row of Steps */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col md:flex-row justify-center items-center relative w-full lg:w-10/12 xl:w-8/12 gap-8">
                    <div className="absolute hidden md:block border-t-2 border-[#df950d] w-full top-0 transform -translate-y-1/2"></div>
                    {steps.slice(0, 4).map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center px-4 text-center">
                            <div className="absolute -top-3 w-8 h-8 border-2 border-[#df950d] rounded-full flex justify-center items-center font-bold bg-[#fab700] text-white">
                                {index + 1}
                            </div>
                            <div className="mt-8">
                                <p className="text-lg text-black font-bold uppercase">{item.title}</p>
                                <div className="text-gray-700">
                                    <ReactQuill
                                        readOnly={true}
                                        value={item.description}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Row of Steps */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center mt-12">
                <div className="flex flex-col md:flex-row justify-center items-center relative w-full lg:w-8/12 xl:w-7/12 gap-8">
                    <div className="absolute hidden md:block border-t-2 border-[#df950d] w-full top-0 transform -translate-y-1/2"></div>
                    {steps.slice(4, 8).map((item, index) => (
                        <div key={index} className="relative flex flex-col items-center px-4 text-center">
                            <div className="absolute -top-3 w-8 h-8 border-2 border-[#df950d] rounded-full flex justify-center items-center font-bold bg-[#df950d] text-white">
                                {index + 5}
                            </div>
                            <div className="mt-8">
                                <p className="text-lg text-black font-bold uppercase">{item.title}</p>
                                <div className="text-gray-700">
                                    <ReactQuill
                                        readOnly={true}
                                        value={item.description}
                                        modules={{ toolbar: false }}
                                        theme="bubble"
                                        className="quill"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Steps;
