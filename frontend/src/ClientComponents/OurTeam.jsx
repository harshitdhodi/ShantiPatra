import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaShareAlt } from "react-icons/fa";
// import img1 from '../assets/member1.jpg';
// import img2 from '../assets/member2.jpg';
// import img3 from '../assets/member3.jpg';
// import img4 from '../assets/member4.jpg';
// import img5 from '../assets/member5.jpg';
import axios from "axios"

// const teamData = [
//     { img: img1, title: 'Farmer of Potato', name: 'Sarah Albert' },
//     { img: img2, title: 'Farmer of Tomato', name: 'John Doe' },
//     { img: img3, title: 'Farmer of Carrot', name: 'Jane Smith' },
//     { img: img4, title: 'Farmer of Lettuce', name: 'Michael Johnson' },
//     { img: img5, title: 'Farmer of Cabbage', name: 'Emily Davis' },
// ];

function OurTeam() {

    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [staff, setStaff] = useState([]);

    const fetchData = async () => {

        try {
            const response = await axios.get(`/api/staff/getActiveStaff`, { withCredentials: true });
            const staffWithIds = response.data.data.map((staffMember, index) => ({
                ...staffMember,
            }));
            setStaff(staffWithIds);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=ourStaff', { withCredentials: true });
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
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className='md:mx-16 flex flex-col md:flex-row '>
            <div className='flex flex-col  mb-8 w-full md:w-1/3'>
                <p className='text-5xl mb-8 mt-8text-5xl font-bold bg-clip-text text-transparent bg-center bg-cover bg-fixed bg-[#df950d] font-cursive text-center md:text-left' >{heading}</p>
                <p className='text-4xl leading-[3rem] text-gray-600 font-semibold text-center md:text-left'>{subheading}</p>
            </div>
            <div className='md:w-2/3 w-full mb-8 md:mx-8'>
                <Slider {...settings}>
                    {staff.map((member, index) => (
                        <div key={index} className='px-4'>
                            <div className='relative flex flex-col '>
                                <img src={`/api/image/download/${member.photo[0]}`} alt={member.alt} title={member.imgTitle} className='h-full w-full object-cover' />
                                <div className='flex flex-col absolute bottom-0 group overflow-hidden'>
                                    <div className=' transition-all duration-500 flex flex-col group-hover:h-full  group-hover:opacity-100 h-0 opacity-0'>
                                        <a href={member.facebook} className='bg-blue-600 h-8 w-8 flex justify-center items-center'>
                                            <FaFacebookF size={20} color='white' />
                                        </a>
                                        <a href={member.twitter} className='bg-blue-800 h-8 w-8 flex justify-center items-center'>
                                            <FaTwitter size={20} color='white' />
                                        </a>
                                        <a href={member.linkedin} className='bg-blue-600 h-8 w-8 flex justify-center items-center'>
                                            <FaLinkedinIn size={20} color='white' />
                                        </a>
                                    </div>
                                    <div className='bg-yellow-400 h-8 w-8 flex justify-center items-center'>
                                        <FaShareAlt size={20} className=" text-black" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-end items-end mt-4'>
                                <p className='text-lg font-medium'>{member.name}</p>
                                <p className='text-xl font-semibold'>{member.jobTitle}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default OurTeam;
