import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from "axios"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from 'react-modal';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";


function Certificates() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [achievements, setAchievements] = useState([]);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/achievements`, { withCredentials: true });
            const achievementsWithIds = response.data.map((achievement, index) => ({
                ...achievement,
                id: index + 1,
            }));
            setAchievements(achievementsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=achievement', { withCredentials: true });
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

    // const products = [
    //     { img: img1, title: 'Fresh' },
    //     { img: img2, title: 'Agriculture' },
    //     { img: img3, title: 'Dairy'},
    //     { img: img1, title: 'Fresh' },
    //     { img: img2, title: 'Agriculture' },
    //     { img: img3, title: 'Dairy' },
    // ];

    return (
        <div className='p-4 py-10 mb-16'>
            <div className='flex items-center  justify-center py-5'>
                <p className='sm:text-5xl text-3xl font-cursive  font-bold bg-clip-text text-[#384b98]'>
                    {heading}
                </p>
            </div>
            <Slider {...settings}>
                {achievements.map((product, index) => (
                    <div key={index} className='px-1 pb-24 pt-10'>
                        <div className='relative flex justify-center  items-center text-center shadow-md '>
                            <img
                                className=' cursor-pointer hover:scale-105 duration-500 w-full object-fill h-[12cm]'
                                src={`/api/image/download/${product.photo[0]}`}
                                alt={product.alt}
                                title={product.imgTitle}
                            />
                            <div onClick={() => openModal(product.photo[0])} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 duration-500 '>
                                <button className='text-white text-lg'><HiOutlineViewfinderCircle size={40} /></button>
                            </div>
                            <div className='absolute -bottom-20 w-2/3 p-5 bg-white shadow-xl rounded-lg'>
                                <div className='flex items-center justify-center overflow-auto'>
                                    <span className='block w-1/4 h-px bg-[#df950d] mx-1'></span>
                                    <p className='text-lg font-medium text-[#fab700]'>{product.title}</p>
                                    <span className='block w-1/4 h-px bg-[#df950d] mx-1'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
                overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-75"
            >
                <div className=" flex justify-center items-center ">
                    <button onClick={closeModal} className="absolute top-2 right-32 bg-gray-800 rounded-xl justify-center py-1 px-2 text-white text-3xl font-bold">
                        &times;
                    </button>
                    <img src={`
/api/image/download/${selectedImage}`} alt="Selected" className="w-[65%] h-[65%] object-contain" />
                </div>
            </Modal>
        </div>
    );
}

export default Certificates;