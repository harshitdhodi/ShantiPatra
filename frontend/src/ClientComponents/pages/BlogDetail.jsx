import React, { useEffect, useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import axios from 'axios';
import Slider from 'react-slick';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "../../quill.css";
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';

function BlogDetail() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [postedBy, setPostedBy] = useState("");
    const [date, setDate] = useState("");

    const { slugs } = useParams();
    const [Photos, setPhotos] = useState([]);
    const [photoAlts, setPhotoAlts] = useState([]);
    const [news, setNews] = useState([]);
    const [facebooklink, setFacebooklink] = useState("");
    const [twitterlink, setTwitterlink] = useState("");
    const [youtubelink, setYoutubelink] = useState("");
    const [linkedinlink, setLinkedinlink] = useState("");

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const fetchData = async (pageIndex) => {
        try {
            const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
            const newsWithIds = response.data.data.map((newsItem, index) => ({
                ...newsItem,
            }));
            setNews(newsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHeader = async () => {
        try {
            const response = await axios.get('/api/header/getHeader', { withCredentials: true });
            const header = response.data;
            setFacebooklink(header.facebooklink || "");
            setTwitterlink(header.twitterlink || "");
            setYoutubelink(header.youtubelink || "");
            setLinkedinlink(header.linkedinlink || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get(`/api/news/getNewsById?slugs=${slugs}`, { withCredentials: true });
            const news = response.data.data;
            setTitle(news.title);
            setDetails(news.details);  // Fetching details directly
            setPhotos(news.photo);
            setDate(news.date);
            setPhotoAlts(news.alt);
            setPostedBy(news.postedBy);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNews();
        fetchData();
        fetchHeader();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false
    };

    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            <div className='relative flex justify-center items-center bg-fixed h-[70vh] mb-10 bg-no-repeat bg-cover'
                style={{
                    backgroundImage: `url(/api/image/download/${Photos[0]})`,
                }}
            >
                <h1 className='flex justify-center items-center font-bold text-white z-10 text-5xl w-[90%] lg:w-[55%] text-center'>{title}</h1>
                <div className='bg-[#0b0b0b] content-[""] h-full left-[0] opacity-40 absolute top-[0] w-full z-1 [transition:all_0.35s_ease-in-out]'></div>
            </div>

            <div className='sm:p-5 md:px-14 lg:flex lg:gap-10  2xl:px-[10%]'>
                <div className='lg:w-2/3'>
                    <div className='relative'>
                        <div className='overflow-hidden'>
                            <img className='hover:scale-110 duration-500 w-full object-cover' src={`/api/image/download/${Photos[0]}`} alt={photoAlts[0]} />
                        </div>
                        <div className='absolute -bottom-10'>
                            <p className='bg-[#fab700] justify-center items-center text-center font-bold text-4xl p-2 text-white'>{new Date(date).getDate()}</p>
                            <p className='bg-blue-950 text-white p-2'>{new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className='pt-16'>
                        <div className='flex items-center ml-3 sm:ml-0 gap-2'>
                            <FaRegCircleUser className='text-[#df950d]' />
                            <p className='text-gray-600 font-medium'>{postedBy}</p>
                        </div>
                        <div className='sm:py-5 space-y-5 font-medium text-black '>
                            {/* Displaying the full details with line gaps */}
                            <ReactQuill
                                readOnly={true}
                                value={details}  // Display the full details here
                                modules={{ toolbar: false }}
                                theme="bubble"
                                className="quill ul line-spacing"  // Add a custom class for styling
                            />
                        </div>

                    </div>
                </div> 

                {/* RHS */}
                <div className='lg:w-1/3 space-y-12'>
                    {/* Recent post */}
                    <div className='bg-gray-100 rounded'>
                        <div className='p-5 py-10'>
                            <p className="text-2xl font-semibold mb-6 ">Recent Post</p>
                            <hr className='border rounded w-[40%] border-[#df950d] my-4' />
                            <Slider {...settings}>
                                {news.map((post) => (
                                    <div key={post.id} className='p-4 w-full'>
                                        <div className='relative'>
                                            <img src={`/api/image/download/${post.photo[0]}`} alt={post.alt[0]} className='rounded w-full object-cover h-[20rem]' />
                                        </div>
                                        <div className='pt-5 space-y-3'>
                                            <p className='text-gray-500 font-nunito'>{post.date}</p>
                                            <p onClick={() => window.location.href = `/${post.slug}`} className="font-bold text-2xl hover:text-[#fab700] transition-all duration-500  inline bg-[linear-gradient(to_right,_#384b98,_#384b98_100%)] bg-[0_100%] bg-no-repeat [background-size:0_2px] [transition:all_.3s,_background-size_.8s] outline-[none] hover:no-underline hover:opacity-100 hover:[background-size:100%_2px]">
                                                {post.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className='bg-gray-100 p-5'>
                        <p className="text-2xl font-semibold mb-2 ">Follow Us</p>
                        <hr className='border rounded w-[30%] border-[#df950d] my-4' />
                        <div className='grid grid-cols-4'>
                            <Link to={facebooklink} className="rounded-full bg-[#fab700] p-3 w-10 h-10 flex items-center justify-center">
                                <FaFacebookF className='text-white text-xl hover:scale-110' />
                            </Link>
                            <Link to={twitterlink} className="rounded-full bg-[#fab700] p-3 w-10 h-10 flex items-center justify-center">
                                <FaTwitter className='text-white text-xl hover:scale-110' />
                            </Link>
                            <Link to={youtubelink} className="rounded-full bg-[#fab700] p-3 w-10 h-10 flex items-center justify-center">
                                <FaYoutube className='text-white text-xl hover:scale-110' />
                            </Link>
                            <Link to={linkedinlink} className="rounded-full bg-[#fab700] p-3 w-10 h-10 flex items-center justify-center">
                                <FaLinkedinIn className='text-white text-xl hover:scale-110' />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetail;
