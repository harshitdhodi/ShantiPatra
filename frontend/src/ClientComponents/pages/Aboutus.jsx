import React, { useState, useEffect } from 'react'
import MissionAndVision from '../MissionVision'
import OurTeam from '../OurTeam'
import Certificates from '../Certificates'
import AboutUs from '../Aboutus'
import axios from "axios"
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen'
// import Counter from '../Counter'
import Counter2 from '../Counter2'
import OurClients from '../OurClients'


function Aboutus() {

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionAboutus', { withCredentials: true });
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
            <WhatsAppButton />
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='banner-background'
                    title={banner.imgTitle}
                    aria-label={banner.imgTitle}
                    role="img"
                >
                    <style>
                        {`
                    .banner-background {
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        position: relative;
                        background-image: url(/api/image/download/${banner.photo})
                `}
                    </style>
                    <div className='flex justify-center items-center h-[30vh] mb-10'>
                        <h1 className='font-bold text-white text-5xl z-10'>{banner.title}</h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}
            <AboutUs />
            <div className='mb-16'>
                <Counter2 />
            </div>
            <MissionAndVision />
            {/* <Certificates /> */}
            <OurClients />
            {/* <OurTeam /> */}
        </div>
    )
}

export default Aboutus
