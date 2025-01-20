import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import "../quill.css";
import axios from 'axios';
import Image from "../images/s11.jpg";

import { LeafIcon } from 'lucide-react';

function OrganicProductForm() {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [missiontitle, setMissionTitle] = useState('');
    const [missiondescription, setMissionDescription] = useState('');
    const [missionphoto, setMissionPhoto] = useState([]);
    const [missionphotoAlts, setMissionPhotoAlts] = useState([]);
    const [missionImgTitle, setMissionImgTitle] = useState([]);
    const [visiontitle, setVisionTitle] = useState('');
    const [visiondescription, setVisionDescription] = useState('');
    const [visionphoto, setVisionPhoto] = useState([]);
    const [visionphotoAlts, setVisionPhotoAlts] = useState([]);
    const [visionImgTitle, setVisionImgTitle] = useState([]);

    useEffect(() => {
        fetchMission();
        fetchVisionData();
        fetchHeadings();
    }, []);

    const fetchMission = async () => {
        try {
            const response = await axios.get('/api/mission/getAllActiveMissions', { withCredentials: true });
            const mission = response.data.data || {};
            setMissionTitle(mission.title || '');
            setMissionDescription(mission.description || '');
            setMissionPhoto(mission.photo || []);
            setMissionPhotoAlts(mission.alt || []);
            setMissionImgTitle(mission.imgTitle || []);
        } catch (error) {
            console.error('Error fetching mission data:', error);
        }
    };

    const fetchVisionData = () => {
        axios.get('/api/vision/getAllActiveVisions', { withCredentials: true })
            .then(response => {
                const vision = response.data.data || {};
                setVisionTitle(vision.title || '');
                setVisionDescription(vision.description || '');
                setVisionPhoto(vision.photo || []);
                setVisionPhotoAlts(vision.alt || []);
                setVisionImgTitle(vision.imgTitle || []);
            })
            .catch(error => {
                console.error('Error fetching mission data:', error);
            });
    };

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=missionvision', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <><h1 className="text-2xl md:text-3xl  text-center lg:hidden block -mt-12 mb-6 lg:text-5xl font-bold text-[#384b98] font-cursive">
            {heading}
        </h1>
        <div className="relative w-full pb-10 mb-6">


                <div className="container mx-auto px-4 xl:px-16">
                    {/* Main content grid */}
                    <div className="flex flex-col lg:flex-row lg:px-2  items-center sm:mb-5 gap-8 lg:gap-20">
                        {/* Image section - Takes 100% width on small screens and 35% on large screens */}
                        <div className="w-full md:w-[75%] lg:w-[50%] flex justify-center  md:justify-start">
                            <img
                                src={Image}
                                alt="mission & Vision"
                                className="w-full h-[40vh] md:h-[55vh] lg:h-[88vh] xl:h-[90vh] object-cover rounded-lg shadow-lg" />
                        </div>

                        {/* Text content section - Takes 100% width on small screens and 65% on large screens */}
                        <div className="w-full md:w-[95%] text-center lg:w-[65%] mt-[-35px] space-y-6 ">
                            <h1 className="text-2xl md:text-3xl lg:block hidden lg:text-5xl font-bold text-[#384b98] font-cursive">
                                {heading}
                            </h1>
                            <p className="text-gray-700 text-base md:text-lg -mb-10 text-justify pl-2">
                                {subheading}
                            </p>
                            <div className="flex items-center space-x-4 md:space-x-6 py-4">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-yellow-500 pr-4 md:pr-6 border-r border-gray-300">
                                    1.2M
                                </div>
                                <p className="text-xs md:text-sm lg:text-base font-bold text-blue-950">
                                    Kg of Plastic Waste Reduced
                                </p>
                            </div>

                            {/* Mission & Vision cards */}
                            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mt-8">
                                {/* Mission card */}
                                <div className="bg-[#a7cad8] rounded-xl shadow-xl p-6 md:p-4 space-y-4">
                                    {/* <img
                                        src={`/api/image/download/${missionphoto}`}
                                        alt={missionphotoAlts}
                                        title={missionImgTitle}
                                        className="h-12 md:h-12 w-auto" /> */}
                                    <h2 className="text-xl md:text-2xl font-bold text-black">
                                        {missiontitle}
                                    </h2>
                                    <div className="text-black">
                                        <ReactQuill
                                            readOnly={true}
                                            value={missiondescription}
                                            modules={{ toolbar: false }}
                                            theme="bubble"
                                            className="quill" />
                                    </div>
                                </div>

                                {/* Vision card */}
                                <div className="bg-[#f3c086] rounded-xl shadow-xl p-6 md:px-8 space-y-4">
                                    {/* <img
                                        src={`/api/image/download/${visionphoto}`}
                                        alt={visionphotoAlts}
                                        title={visionImgTitle}
                                        className="h-12 md:h-16 w-auto" /> */}
                                    <h2 className="text-xl md:text-2xl font-bold text-black">
                                        {visiontitle}
                                    </h2>
                                    <div className="text-black">
                                        <ReactQuill
                                            readOnly={true}
                                            value={visiondescription}
                                            modules={{ toolbar: false }}
                                            theme="bubble"
                                            className="quill" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default OrganicProductForm;
