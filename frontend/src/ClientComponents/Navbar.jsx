import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { AiOutlineMenu } from "react-icons/ai";
import axios from 'axios';
import Footer from "./Footer";

function MainNavbar() {  
    const [menuListings, setMenuListings] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [colorlogo, setColorLogo] = useState([]);
    const [whitelogo, setWhiteLogo] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchHeaderColorLogo = async () => {
            try {
                const response = await axios.get('/api/logo/headercolor');
                setColorLogo(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };
        fetchHeaderColorLogo();
    }, []);

    useEffect(() => {
        const fetchHeaderWhiteLogo = async () => {
            try {
                const response = await axios.get('/api/logo/headerwhite');
                setWhiteLogo(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };
        fetchHeaderWhiteLogo();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/product/getCategoryAndPhoto');
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
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
        const handleScroll = () => {
            setIsSticky(window.scrollY > window.innerHeight / 2);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleCalculatorClick = (e) => {
        e.preventDefault();
      
    
        // Check if already on the "/" page
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

    const allMenuItems = [...menuListings]
        .filter(item => {
            const pagenameLower = item.pagename.toLowerCase();
            return !['blog', 'our', 'global'].some(excluded =>
                pagenameLower.includes(excluded)
            );
        })
        .sort((a, b) => a.priority - b.priority)
        .map(item => {
            // Convert pagename to path format: lowercase and replace spaces with hyphens
            const path = item.pagename.toLowerCase().replace(/\s+/g, '-');
            
            // Special case for home page
            const finalPath = path === 'home' ? '/' : `/${path}`;

            // Special case for calculator
            if (item.pagename.toLowerCase() === 'calculator') {
                return { ...item, path: '#calculator' };
            }

            // Handle products with categories
            if ((item.pagename === 'Product' || item.pagename === 'Products') && categories.length > 0) {
                return {
                    ...item,
                    path: '/products', // Keep this consistent for products
                    subItems: categories.map(category => ({
                        title: category.category,
                        path: `/${category.slug}`,
                    })),
                };
            }

            return { ...item, path: finalPath };
        });

    const renderMenuItem = (item, index) => {
        // Special case for Product
        if (item.pagename.toLowerCase() === 'products') {
            return (
                <a
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/products');
                    }}
                    className={`xl:text-[16px] text-[14px] font-bold ${
                        location.pathname === '/products' ? 'text-yellow-500' : 'text-black'
                    } hover:text-[#df950d] transition-all`}
                >
                    {item.pagename}
                </a>
            );
        }

        // Special case for Calculator
        if (item.pagename.toLowerCase() === 'calculator') {
            return (
                <a
                    href="#calculator"
                    onClick={handleCalculatorClick}
                    className={`xl:text-[16px] text-[14px] font-bold ${
                        location.pathname === item.path ? 'text-yellow-500' : 'text-black'
                    } hover:text-[#df950d] transition-all`}
                >
                    {item.pagename}
                </a>
            );
        }

        // Default case for all other menu items
        return (
            <Link
                to={item.subItems ? '#' : item.path}
                className={`xl:text-[16px] text-[14px] font-bold ${
                    location.pathname === item.path ? 'text-yellow-500' : 'text-black'
                } hover:text-[#df950d] transition-all`}
            >
                {item.pagename}
            </Link>
        );
    };

    const handleCatalogueClick = () => {
        window.open('/catalogue.pdf', '_blank');
    };

    return (
        <>
            <Header />
            <div className={`${isSticky ? 'fixed top-0 z-50 bg-white shadow-lg' : ''} w-full`}>
                {/* Mobile Menu */}
                <div className='flex items-center justify-between px-6 md:px-8 lg:px-6 lg:py-4 w-full lg:hidden'>
                    <div onClick={toggleMenu}>
                        <AiOutlineMenu size={25} className={`${isMenuOpen ? 'hidden' : 'block'}`} />
                    </div>
                    <div className='mt-1'>
                        <img 
                            src={`/api/logo/download/${colorlogo.photo}`} 
                            alt={colorlogo.alt} 
                            title={colorlogo.imgTitle} 
                            className='w-[3.5cm] h-[1cm] object-contain' 
                        />
                    </div>

                    {isMenuOpen && (
                        <div className='fixed top-0 left-0 lg:w-1/2 xl:w-2/5 w-full md:w-1/2 h-full bg-[#fff9ebfd] z-50 flex flex-col overflow-y-auto'>
                            <div className='absolute inset-0 z-0 opacity-5'
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                                    backgroundSize: '100px 100px'
                                }}
                            ></div>
                            <div className='flex ml-5 justify-between p-4 z-10'>
                                <img 
                                    src={`/api/logo/download/${whitelogo.photo}`} 
                                    alt={whitelogo.alt} 
                                    title={whitelogo.imgTitle} 
                                    className='w-[6cm] h-[3cm] object-contain' 
                                />
                                <IoClose size={32} style={{ color: 'black' }} onClick={toggleMenu} />
                            </div>
                            <ul className='flex flex-col  w-full z-10'>
                                {allMenuItems.map((item, index) => (
                                    <li key={index} className='flex flex-col items-center border-b border-gray-700 w-full p-2'>
                                        <div className='flex justify-center items-center text-black w-full uppercase' onClick={() => toggleDropdown(index)}>
                                            {item.subItems ? (
                                                <span>{item.pagename}</span>
                                            ) : (
                                                renderMenuItem(item, index)
                                            )}
                                            {item.subItems && (openDropdown === index ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                                        </div>
                                        {item.subItems && openDropdown === index && (
                                            <ul className='flex flex-col text-black items-center  space-y-2 w-full'>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className='border-b border-gray-700 w-full py-2 px-5'>
                                                        <Link to={subItem.path}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className='flex flex-col items-center justify-center  w-full p-2'>
                                    <button
                                        className="w-1/2 px-8 text-white py-2 mt-5 bg-[#fab700] font-semibold rounded-full hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                        onClick={handleCatalogueClick}
                                    >
                                        Catalogue
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className='hidden lg:block'>
                    <div className='flex items-center mt-3 justify-between xl:px-16 px-10 w-full pt-4 bg-white font-normal'>
                        <img
                            src={`/api/logo/download/${colorlogo.photo}`}
                            alt={colorlogo.alt}
                            title={colorlogo.imgTitle}
                            className='w-[15%] object-cover mb-5 ml-7 -mt-2 hidden cursor-pointer lg:block'
                            onClick={() => navigate('/')}
                        />
                        <div className='flex gap-2 items-center space-x-3 pr-5 lg:space-x-4'>
                            {allMenuItems.map((item, index) => (
                                <div key={index} className='relative -mt-8 cursor-pointer flex items-center font-montserrat group'>
                                    {renderMenuItem(item, index)}
                                    {item.subItems && (
                                        <>
                                            <span className='ml-1'>
                                                <IoIosArrowDown />
                                            </span>
                                            <ul className='absolute top-4 mt-2 left-0 bg-white shadow-md rounded w-48 group-hover:z-50 border-b-4 border-b-blue-950 hidden group-hover:block group-hover:translate-y-0 transform translate-y-8 transition duration-200 ease-in-out'>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className='px-4 py-3 hover:bg-gray-200 hover:text-blue-950'>
                                                        <Link to={subItem.path}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            ))}
                            <div className='-mt-8 py-3 text-center'>
                                <button
                                    className="w-full px-8 text-white py-2 bg-[#fab700] font-semibold rounded-full hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                    onClick={() => window.open('/catalogue.pdf', '_blank')}
                                >
                                    Catalogue
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <Outlet />
            <Footer />
        </>
    );
}

export default MainNavbar;