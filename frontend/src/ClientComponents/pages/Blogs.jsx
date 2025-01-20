import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';

function Blogs() {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/news/getActiveNews`, { withCredentials: true });
            const newsWithIds = response.data.data.map((newsItem) => ({
                ...newsItem,
            }));
            setNews(newsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredBlogs = news.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchBannerData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionBlog', { withCredentials: true });
            setBanners(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBannerData();
    }, []);

    return (
        <div className='relative w-full bg-gray-50'>
            {/* Background Overlay */}
            <div
                className="absolute inset-0 opacity-5 "
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                }}
            ></div>

            {/* Splash Screen */}
            {isSplashVisible && (
                <div className="z-50 relative">
                    <SplashScreen onTransitionEnd={handleSplashEnd} isVisible={isSplashVisible} />
                </div>
            )}

            {/* WhatsApp Button */}
            <WhatsAppButton />

            {/* Banner Section */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='relative bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className='flex justify-center items-center h-[30vh] mb-10 relative z-10'>
                        <div className='absolute inset-0 bg-black opacity-40 z-0'></div>
                        <h1 className='font-bold text-white text-5xl z-10'>{banner.title}</h1>
                       
                    </div>
                </div>
            ))}

            {/* Main Content */}
            <div className=' px-4 md:px-20 lg:p-16 relative z-20'>
                <div className="mb-8 flex items-center">
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M10 16a6 6 0 100-12 6 6 0 000 12z"
                            />
                        </svg>
                    </div>
                </div>
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, index) => (
                            <div key={index} className='p-4'>
                                <div className='relative'>
                                    <div className='overflow-hidden'>
                                        <img className='hover:scale-110 duration-500 h-[6cm] w-[80%] object-fill' src={`/api/image/download/${blog.photo[0]}`} alt={blog.alt[0]} />
                                    </div>
                                    <div className='absolute -bottom-10'>
                                        <p className='bg-yellow-600 justify-center items-center text-center font-bold text-4xl p-2 text-white'>{new Date(blog.date).getDate()}</p>
                                        <p className='bg-blue-950 text-white p-2'>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-16">
                                    <p className="font-medium text-gray-600">
                                        {blog.postedBy} <span>.</span> <span>{blog.date}</span>
                                    </p>
                                    <div className="relative">
                                        <Link to={`/${blog.slug}`} className="font-bold text-2xl hover:text-yellow-600 transition-all duration-500 inline bg-[linear-gradient(to_right,_#384b98,_#384b98_100%)] bg-[0_100%] bg-no-repeat [background-size:0_2px] [transition:all_.3s,_background-size_.8s] outline-[none] hover:no-underline hover:opacity-100 hover:[background-size:100%_2px]">
                                            {blog.title}
                                        </Link>


                                        <span className="block h-0.5 bg-yellow-600 absolute bottom-0 left-0 w-0 hover:w-full transition-all duration-500"></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full flex justify-center items-center'>
                            <p className=""><iframe src="https://lottie.host/embed/2c1c1331-4d68-4d87-b1f3-61595b0f9051/Nh1e3wVB8C.json" className='h-[10cm]'></iframe></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
