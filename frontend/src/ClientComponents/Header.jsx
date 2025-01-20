import React, { useState, useEffect } from 'react'
import { FaRegClock, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn   } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import axios from 'axios'

function Header() {

    const [phoneNo, setPhoneNo] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");

    useEffect(() => {
        fetchHeader();
    }, []);


    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getHeader', { withCredentials: true });
            const header = response.data;

            setPhoneNo(header.phoneNo || "");
            setOpeningHours(header.openingHours || "");
            setFacebooklink(header.facebooklink || "");
            setTwitterlink(header.twitterlink || "");
            setYoutubelink(header.youtubelink || "");
            setLinkedinlink(header.linkedinlink || "");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='hidden bg-[#384b98] md:flex justify-between  md:py-2 md:px-12 lg:pt-4 lg:py-4 lg:px-24 w-full'>
            <div className='flex lg:gap-8 gap-12'>
                <div className='flex -ml-3 gap-3  justify-center items-center md:border-r md:border-r-[#ffffff8c] md:pr-8 lg:border-none'>
                    <FaRegClock size={20} className='flex justify-center text-white' />
                    <p className='text-[#F8F9FA] md:leading-8 lg:leading-none'>Opening Hours : {openingHours}</p>
                </div>
                <div className='flex gap-3 justify-center items-center'>
                    <FiPhone size={20} className='flex justify-center text-white' />
                    <p className='text-[#F8F9FA]'>{phoneNo}</p>
                </div>
            </div>
            <div className='lg:flex gap-4 justify-center items-center hidden'>
                <a href={facebooklink}><FaFacebookF color='white' /></a>
                <a href={youtubelink}><RiInstagramFill  color='white' /></a>
               
                {/* <a href={twitterlink}> <FaTwitter color='white' /></a> */}
                {/* <a href={linkedinlink}><FaLinkedinIn color='white' /></a> */}
            </div>
        </div>
    )
}

export default Header
