import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

import { BiSolidDashboard, BiCategory } from "react-icons/bi";
import { FaSitemap, FaHome, FaPhone, FaShoppingCart, FaDatabase, FaCode, FaGoogle, FaListOl, FaHandshake } from "react-icons/fa";
import { GiVerticalBanner, GiAchievement, GiThreeLeaves } from "react-icons/gi";
import { BsFillPersonLinesFill, BsBarChartSteps } from "react-icons/bs";
import { FaNewspaper, FaPager, FaPeopleGroup, FaOpencart } from "react-icons/fa6";
import { RiPagesFill, RiWhatsappFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { GoNumber, GoGoal } from "react-icons/go";
import { PiNewspaperClippingBold } from "react-icons/pi"
import { AiOutlineVerticalAlignBottom, AiOutlineVerticalAlignTop } from "react-icons/ai";
import { TbSeo } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";

import axios from 'axios';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';


export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [logo, setLogo] = useState(); // Default logo text
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get('/api/logo', { withCredentials: true });
        setLogo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogos();
  }, []);

  const sidebarData = [
    { title: "Dashboard", icon: <BiSolidDashboard size={20} />, path: "/dashboard" },

    {
      title: "Home", icon: <FaHome size={20} />, submenu: [
        { title: "Banner", icon: <GiVerticalBanner size={20} />, path: "/banner" },
        { title: "Testimonials", icon: <FaPager size={20} />, path: "/testimonials" },
        { title: "Counter", icon: <GoNumber size={20} />, path: "/counter" },
        { title: "Client", icon: <GoNumber size={20} />, path: "/client" },
      ]
    },
    {
      title: "About us", icon: <BsFillPersonLinesFill size={20} />, submenu: [
        { title: "About Us", icon: <RiPagesFill size={20} />, path: "/aboutus" },
        { title: "AboutUs Points", icon: <RiPagesFill size={20} />, path: "/aboutuspoint" },
        { title: "Mission & Vision", icon: <GoGoal size={20} />, path: "/missionandvision" },
        { title: "Certificates", icon: <GiAchievement size={20} />, path: "/certificates" },
        { title: "Our Team", icon: <FaPeopleGroup size={20} />, path: "/ourTeam" },
      ]
    },

    {
      title: "Products", icon: <FaShoppingCart size={20} />, submenu: [
        { title: "Categories", icon: <BiCategory size={20} />, path: "/ProductCategory" },
        { title: "Products", icon: <FaOpencart size={20} />, path: "/product" },
        { title: "product Inquiry", icon: <FaOpencart size={20} />, path: "/productinquiry" },
      ]
    },
    // { title: "Global Presence", icon: < FaEarthAsia size={20} />, path: "/globalpresence" },
    { title: "Why Choose Us", icon: < FaHandshake size={20} />, path: "/whychooseus" },
    { title: "Why Choose Paper Over Plastic", icon: < GiThreeLeaves size={20} />, path: "/whychoosepaper" },
    { title: "Manufacture Steps", icon: < BsBarChartSteps size={20} />, path: "/customizationsteps" },
    { title: "Custom Inquires", icon: < PiPhoneCallFill size={20} />, path: "/custominquires" },
    { title: "Gallery", icon: < PiPhoneCallFill size={20} />, path: "/gallery" },

    {
      title: "Blogs", icon: <FaNewspaper size={20} />, submenu: [
        { title: "Categories", icon: <BiCategory size={20} />, path: "/NewsCategory" },
        { title: "News/Blogs", icon: <PiNewspaperClippingBold size={20} />, path: "/news" },
      ]
    },

    { title: "Menu Listing", icon: <FaListOl size={20} />, path: "/menulisting" },
    { title: "global-presence", icon: <FaListOl size={20} />, path: "/global-presence" },
   
    { title: "Inquiries", icon: <FaPhone size={20} />, path: "/Inquiry" },
    {
      title: "SEO", icon: <TbSeo size={20} />, submenu: [
        { title: "Sitemap Generator", icon: <FaSitemap size={20} />, path: "/sitemap" },
        { title: "Meta Tags Settings", icon: <FaCode size={20} />, path: "/metadetails" },
        { title: "Google Tag Manager", icon: <FaGoogle size={20} />, path: "/googleSettings" },
      ]
    },
    {
      title: "Settings", icon: <IoSettings size={20} />, submenu: [
        { title: "Manage Theme", icon: <FaCode size={20} />, path: "/manageTheme" },

        { title: "Footer Settings", icon: <AiOutlineVerticalAlignBottom size={20} />, path: "/footer" },
        { title: "Header Settings", icon: <AiOutlineVerticalAlignTop size={20} />, path: "/header" },
        { title: "Manage Logo", icon: <FaPager size={20} />, path: "/manageLogo" },

        { title: "Database Management", icon: <FaDatabase size={20} />, path: "/DatabaseManagement" }
      ]
    }

  ];

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (e, index) => {
    e.stopPropagation();
    setIsSubMenuOpen(prevState => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return {
        ...newState,
        [index]: !prevState[index]
      };
    });
  };

  const toggleSubSubMenu = (e, index, subIndex) => {
    e.stopPropagation();
    setIsSubMenuOpen(prevState => ({
      ...prevState,
      [`${index}-${subIndex}`]: !prevState[`${index}-${subIndex}`]
    }));
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='h-full'>
        <aside
          ref={sidebarRef}
          className={`bg-black text-white fixed lg:relative z-10 h-full w-[14rem] md:w-[18rem] overflow-y-auto ${
            isMenuOpen ? "translate-x-0 transform transition-transform duration-500" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className='font-bold  text-white text-center pt-4 text-[20px] px-8'>
            {logo && logo.length > 0 && (
              <div >
                <img src={`/api/logo/download/${logo[logo.length - 1].photo}`} alt="Logo" className="w-full h-auto" />
              </div>
            )}
          </div>
          <div className='mt-4'>
            <ul>
              {sidebarData.map((item, i) => (
                <div key={i}>
                  <div>
                    <Link
                      to={item.path || "#"}
                      className={`flex items-center gap-2 hover:bg-slate-800 py-2 pl-4 pr-8 hover:cursor-pointer ${
                        location.pathname === item.path ? "bg-slate-800" : ""
                      }`}
                      onClick={item.submenu && item.submenu.length > 0 ? (e) => toggleSubMenu(e, i) : undefined}
                    >
                      <p className='text-white'>{item.icon}</p>
                      <p className='text-white font-semibold'>{item.title}</p>
                      {item.submenu && item.submenu.length > 0 && (
                        <span className='ml-auto'>
                          {isSubMenuOpen[i] ? (
                            <IoIosArrowDown className='text-white' />
                          ) : (
                            <IoIosArrowForward className='text-white' />
                          )}
                        </span>
                      )}
                    </Link>
                    {item.submenu && item.submenu.length > 0 && isSubMenuOpen[i] &&
                      <ul>
                        {item.submenu.map((subItem, j) => (
                          <div key={j}>
                            <Link
                              to={subItem.path || "#"}
                              className={`flex items-center gap-2 hover:bg-slate-800 py-2 pl-8 pr-4 hover:cursor-pointer ${location.pathname === subItem.path ? "bg-slate-800" : ""}`}
                              onClick={subItem.subsubmenu && subItem.subsubmenu.length > 0 ? (e) => toggleSubSubMenu(e, i, j) : undefined}
                            >
                              <p className='text-white'>{subItem.icon}</p>
                              <p className='text-gray-400 font-semibold'>{subItem.title}</p>
                              {subItem.subsubmenu && subItem.subsubmenu.length > 0 && (
                                <span className='ml-auto'>
                                  {isSubMenuOpen[`${i}-${j}`] ? (
                                    <IoIosArrowDown className='text-white' />
                                  ) : (
                                    <IoIosArrowForward className='text-white' />
                                  )}
                                </span>
                              )}
                            </Link>
                            {subItem.subsubmenu && subItem.subsubmenu.length > 0 && isSubMenuOpen[`${i}-${j}`] &&
                              <ul>
                                {subItem.subsubmenu.map((subSubItem, k) => (
                                  <Link
                                    key={k}
                                    to={subSubItem.path}
                                    className={`flex items-center gap-2 hover:bg-slate-800 py-2 pl-12 pr-16 hover:cursor-pointer ${location.pathname === subSubItem.path ? "bg-slate-800" : ""}`}
                                  >
                                    <p className='text-white'>{subSubItem.title}</p>
                                  </Link>
                                ))}
                              </ul>
                            }
                          </div>
                        ))}
                      </ul>
                    }
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 w-full z-10 bg-white shadow" toggleSidebar={toggleSidebar} />
        <Breadcrumbs sidebarData={sidebarData} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
