import React, { useEffect, useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { AiOutlinePhone } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Footer = () => {
    const [news, setNews] = useState([]);
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [whitelogo, setWhiteLogo] = useState([]);
    const [menuListings, setMenuListings] = useState([]);
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const navigate = useNavigate();

    const handleCalculatorClick = (e) => {
        e.preventDefault();

        const handleCalculatorNavigation = () => {
            if (location.pathname !== '/') {
                // Redirect to the "/" page
                navigate('/');

                // Scroll to the calculator after navigation completes
                setTimeout(() => {
                    const calculatorSection = document.getElementById('calculator');
                    if (calculatorSection) {
                        calculatorSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300); // Delay to ensure the page has loaded
            } else {
                // If already on the "/" page, scroll to the calculator
                const calculatorSection = document.getElementById('calculator');
                if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleCalculatorNavigation();
    };

    const menuPaths = {
        about: "/about-us",
        blog: "/blogs",
        contact: "/contact-us",
        calculator: "/",
        products: "/products",
        manufacturing: "/manufacturing",
        clients: "/our-clients",
        globalpresence: "/global-presence"
    };

    useEffect(() => {
        const fetchFooterColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/footerwhite');
                setWhiteLogo(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFooterColorLogo();
    }, []);

    useEffect(() => {
        const fetchMenuListings = async () => {
            try {
                const response = await axios.get('/api/menulisting/getMenulisting', { withCredentials: true });
                setMenuListings(response.data.menuListings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMenuListings();
    }, []);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
                const footer = response.data;
                setAddress(footer.address || "");
                setPhoneNo(footer.phoneNo || "");
                setEmail(footer.email || "");
            } catch (error) {
                console.error(error);
            }
        };

        fetchFooter();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/news/getLatestActiveNews`, { withCredentials: true });
                const newsWithIds = response.data.data.map((newsItem) => ({
                    ...newsItem,
                }));
                setNews(newsWithIds);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const recentPosts = news.slice(0, 2);

    const filteredMenuItems = menuListings
        .filter(item => {
            const pagenameLower = item.pagename.toLowerCase();
            return !pagenameLower.includes('home');
        })
        .sort((a, b) => a.priority - b.priority)
        .map((item) => {
            const pagenameLower = item.pagename.toLowerCase();
            let path = '/';

            if (pagenameLower.includes('about')) {
                path = menuPaths.about;
            } else if (pagenameLower.includes('blog')) {
                path = menuPaths.blog;
            } else if (pagenameLower.includes('contact')) {
                path = menuPaths.contact;
            } else if (pagenameLower.includes('calculator')) {
                path = menuPaths.calculator;
            } else if (pagenameLower.includes('products')) {
                path = menuPaths.products;
            } else if (pagenameLower.includes('manufacturing')) {
                path = menuPaths.manufacturing;
            } else if (pagenameLower.includes('clients')) {
                path = menuPaths.clients;
            } else if (pagenameLower.includes('global presence')) {
                path = menuPaths.globalpresence;
            }

            return {
                ...item,
                path
            };
        });

    return (
        <footer className="bg-[#fff2d0] text-black -mb-5 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
                <div className="space-y-4">
                    <Link to="/">
                        <img
                            src={`/api/logo/download/${whitelogo.photo}`}
                            alt={whitelogo.alt}
                            title={whitelogo.imgTitle}
                            className='w-[65%] object-cover'
                        />
                    </Link>
                    <p className='text-[#000000]'>
                        Happen active county. Winding morning ambition shyness evident to poor. Because elderly new to the point to main success.
                    </p>
                </div>

                <div className="cursor-pointer">
                    <h3 className="text-xl font-bold mb-4">Explore</h3>
                    <ul className="text-[14px] grid grid-cols-2 lg:grid-cols-1 gap-2 font-semibold text-[#000000]">
                        {filteredMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className="hover:underline"
                                    onClick={item.path === '/' ? handleCalculatorClick : undefined}
                                >
                                    {item.pagename}
                                </Link>


                                {item.subItems && item.subItems.length > 0 && (
                                    <ul className="ml-4">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link to={subItem.path} className="hover:underline">
                                                    <span className='text-[#df950d] hover:text-blue-600 transition-all'>
                                                        {subItem.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                    <ul className="space-y-4">
                        {recentPosts.map((post, index) => (
                            <li key={index} className="flex space-x-4 text-[#000000]">
                                <img src={`/api/image/download/${post.photo}`} alt={post.alt} title={post.imgTitle} className="h-16 w-16 rounded object-cover" />
                                <div>
                                    <p className="text-sm">{post.date || (index === 0 ? '12 SEP, 2023' : '18 JUL, 2023')}</p>
                                    <Link
                                        to={`/${post.slug}`}
                                        className="relative hover:text-[#384b98] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[#384b98] after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                    <ul className="space-y-4 text-[#000000]">
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1cm] p-2 border-[#df950d] border-dashed border-2 flex items-center rounded-full justify-center">
                                <IoHomeOutline size={20} className="text-[#be7d04]" title='Address' />
                            </div>
                            <div>
                                <p className="font-bold">ADDRESS:</p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#df950d] transition-colors duration-300"
                                >
                                    <p>{address}</p>
                                </a>
                            </div>
                        </li>
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1cm] border-[#df950d] border-dashed border-2 flex items-center rounded-full justify-center">
                                <CiMail size={20} className="text-[#be7d04]" title='email' />
                            </div>
                            <div>
                                <p className="font-bold">EMAIL:</p>
                                <a
                                    href={`mailto:${email}`}
                                    className="hover:text-[#df950d] transition-colors duration-300"
                                >
                                    <p>{email}</p>
                                </a>
                            </div>
                        </li>
                        <li className="flex space-x-2">
                            <div className="h-[1cm] w-[1cm] border-[#df950d] border-dashed border-2 flex items-center rounded-full justify-center">
                                <AiOutlinePhone size={20} className="text-[#be7d04]" title='phone' />
                            </div>
                            <div>
                                <p className="font-bold">PHONE:</p>
                                <a
                                    href={`tel:${phoneNo}`}
                                    className="hover:text-[#df950d] transition-colors duration-300"
                                >
                                    <p>{phoneNo}</p>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-10 block sm:flex justify-around -mb-5">
                <p>Copyright © {currentYear} ShantiPatra Powered by <a href="https://rndtechnosoft.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#df950d] text-blue-900">RND Technosoft</a></p>
                <div className='flex gap-4 justify-center'>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                    {/* <span>Site map</span> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
