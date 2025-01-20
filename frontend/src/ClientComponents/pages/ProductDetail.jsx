import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import InquiryForm from "./InquiryForm";
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';
import ProductSecondProduct from '../ProductSecondProduct';
import OurStrength from '../OurStrength';

function ProductDetail() {
    const { slugs } = useParams();
    const [productData, setProductData] = useState(null);
    const [productDetailData, setProductDetailData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sliderRef, setSliderRef] = useState(null);
    const [description, setDescription] = useState(true);
    const [information, setInformation] = useState(false);
    const [review, setReview] = useState(false);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/product/getDataBySlug?slugs=${slugs}`);
                const { productData, productDetailData } = response.data;
                setProductData(productData);
                setProductDetailData(productDetailData || []);
                setSelectedImage(productData?.photo[0]);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, [slugs]);

    const handleThumbnailClick = (img) => {
        setSelectedImage(img);
        const index = productData?.photo.indexOf(img);
        if (sliderRef) {
            sliderRef.slickGoTo(index);
        }
    };

    const hasBopp = window.location.href.includes('bopp');
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        beforeChange: (current, next) => {
            if (sliderRef) {
                setSelectedImage(productData?.photo[next]);
            }
        },
        nextArrow: <IoIosArrowForward size={25} />,
        prevArrow: <IoIosArrowBack size={25} />,
    };

    const formattedProduct = slugs
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className='relative min-h-screen w-full bg-gray-50'>
            <div
                className="fixed inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    zIndex: '-1'
                }}
            ></div>

            <div className="relative z-10">
                <SplashScreen
                    onTransitionEnd={() => setIsSplashVisible(false)}
                    isVisible={isSplashVisible}
                    className="z-20"
                />

                {showInquiryForm && (
                    <InquiryForm
                        productName={formattedProduct}
                        onClose={() => setShowInquiryForm(false)}
                    />
                )}
                <div
                    className='relative flex justify-center items-center bg-cover bg-fixed h-[30vh] mb-10'
                    style={{
                        backgroundImage: `url(/api/image/download/${selectedImage})`,
                        objectFit: "cover",
                    }}
                >
                    <h1 className='font-bold text-white z-20 sm:text-5xl text-center text-3xl'>{formattedProduct}</h1>
                    <div className='bg-[#0b0b0b] absolute inset-0 opacity-40'></div>
                </div>

                <div className='flex flex-col lg:flex-row gap-10 pt-5 items-center justify-center w-full'>
                    <div className='w-full lg:w-1/2'>
                        <Slider {...settings} ref={setSliderRef} className='mb-4'>
                            {productData?.photo.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={`/api/image/download/${img}`}
                                        alt={`Product Image ${index + 1}`}
                                        className='w-full h-[14.5cm] object-cover'
                                    />
                                </div>
                            ))}
                        </Slider>
                        <div className='flex gap-4'>
                            {productData?.photo.map((img, index) => (
                                <div
                                    key={index}
                                    className={`border-2 cursor-pointer ${selectedImage === img ? 'border-blue-500' : 'border-gray-400'}`}
                                    onClick={() => handleThumbnailClick(img)}
                                >
                                    <img
                                        src={`/api/image/download/${img}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className='w-[4cm] h-[3cm] object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/3 text-center px-2 lg:text-left'>
                        <h1 className='text-3xl font-bold text-[#384b98] lg:-mt-6 mb-4'>{productData?.title}</h1>
                        <div
                            className="prose custom-bullets text-justify pl-3 pr-2  prose-li:m-1 max-w-none"
                            dangerouslySetInnerHTML={{ __html: productData?.details || "" }}
                        />
                        <button
                            onClick={() => setShowInquiryForm(true)}
                            className='border-2  hover:border-none bg-[#fab700] text-white ml-4  rounded-full text-xl py-2 px-5 my-5 '
                        >
                            Inquiry Now
                        </button>
                    </div>
                </div>

                <div className='mt-5'>
                    <div className=''>
                        <ProductSecondProduct />
                    </div>
                    <div
                        className={`cursor-pointer pb-8 px-4 text-center font-bold `}
                        onClick={() => { setInformation(true); setReview(false); setDescription(false); }}
                    >
                        <span className='border-b-2 border-blue-900 pb-2 text-2xl text-blue-900'>
                            Additional Information
                        </span>
                    </div>
                    <div className="overflow-x-auto flex justify-center  px-8 py-3">
                        <table className="table-auto w-full border max-w-[85rem] border-gray-300 ">
                            <thead>
                                <tr className="bg-gray-200">
                                    {hasBopp ? (
                                        <>
                                            <th className="border border-gray-300 p-2">Film Thickness (mm)</th>
                                            <th className="border border-gray-300 p-2">Tape Thickness (mm)</th>
                                            <th className="border border-gray-300 p-2">Adhesion Strength (gms/inch)</th>
                                            <th className="border border-gray-300 p-2">Break Point of Elongation</th>
                                            <th className="border border-gray-300 p-2">Tensile Strength (kg/inch)</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="border border-gray-300 p-2">Code Plain/Printed</th>
                                            <th className="border border-gray-300 p-2">Width (mm)</th>
                                            <th className="border border-gray-300 p-2">Thickness (mm)</th>
                                            <th className="border border-gray-300 p-2">Average Net Weight (kg)</th>
                                            <th className="border border-gray-300 p-2">Average Strength (kg)</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {productDetailData.map((detail) => (
                                    <tr key={detail._id}>
                                        <td className="border border-gray-300 p-2">{detail.productCode} micron</td>
                                        <td className="border border-gray-300 p-2">{detail.variants}</td>
                                        <td className="border border-gray-300 p-2">{detail.size} (Min.)</td>
                                        <td className="border border-gray-300 p-2">{detail.pcs}</td>
                                        <td className="border border-gray-300 p-2">{detail.moq} (Min.)</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <OurStrength />
            </div>
        </div>
    );
}

export default ProductDetail;

