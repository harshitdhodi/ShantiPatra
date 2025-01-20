import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Steps from '../Steps';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';

const OurClientsPage = () => {
    const [banners, setBanners] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [heading, setHeading] = useState(''); // State for heading
    const [subheading, setSubheading] = useState(''); // State for subheading

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionClients', { withCredentials: true });
            console.log(response.data.data);
            setBanners(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClientImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/client/getAll', { withCredentials: true });
            const clientData = response.data.map((client) => ({
                id: client._id,
                title: client.title,
                url: `/api/image/download/${client.photo[0]}`, // Use the first photo
                alt: client.alt[0] || '', // Fallback to an empty string if alt is not available
            }));
            setImages(clientData);
        } catch (error) {
            console.error('Error fetching client images:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch heading and subheading
    const fetchHeadingAndSubheading = async () => {
        console.log("Fetching heading and subheading...");
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=client', { withCredentials: true });
            console.log(response.data);
            setHeading(response.data.heading); // Set heading
            setSubheading(response.data.subheading); // Set subheading
        } catch (error) {
            console.error('Error fetching heading and subheading:', error);
        }
    };

    useEffect(() => {
        fetchBanners();
        fetchClientImages();
        fetchHeadingAndSubheading(); // Call the function to fetch heading and subheading
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state can be improved with a spinner or splash screen
    }

    return (
        <div>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />

            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='relative bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className='flex justify-center items-center h-[30vh] mb-10'>
                        <h1
                            className="font-bold text-white text-5xl z-10"
                            dangerouslySetInnerHTML={{ __html: banner.details }}
                        ></h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}

            <div className='flex flex-col justify-center items-center mb-6'>
                {/* <h2 className='text-3xl font-bold'>{heading}</h2>  */}
                {/* Render the fetched heading here */}
                <p className='w-[80%] text-justify'>
                    {subheading} {/* Render the fetched subheading here */}
                </p>
            </div>

            <div className="w-[80%] mb-10 mx-auto p-2">
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-full h-1/2">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={`relative flex justify-center items-center overflow-hidden rounded-lg ${image.size} transform transition-transform duration-300 hover:scale-105 group`}
                        >
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-[60%] h-full object-cover p-3"
                                onError={(e) => {
                                    e.target.src = `/api/placeholder/400/400`; // Placeholder image
                                }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center">
                                <h3 className="text-white font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {image.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurClientsPage;
