import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Steps from '../Steps';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';
import ImageGallery from '../ImageGallary';


// Set the app element for the modal (optional)
Modal.setAppElement('#root');

function Manufacture() {

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    ;


    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionCustomPackaging', { withCredentials: true });
            console.log(response.data.data)
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



    return (
        <div className='relative w-full bg-gray-50'>

<div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
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
                        ></h1> <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}
            <Steps />

            <ImageGallery />
            <WhatsAppButton />
        </div>
    );
}

export default Manufacture;
