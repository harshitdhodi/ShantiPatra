import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLock } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from 'axios';

const Navbar = ({ toggleSidebar }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [admin, setAdmin] = useState(null);
    const menuRef = useRef();

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch admin profile
    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await axios.get('/api/admin/adminprofile', {
                    withCredentials: true,
                });
                setAdmin(response.data.admin);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };

        fetchAdminProfile();
    }, []);

    // Handle outside clicks
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        Cookies.remove("jwt");
        window.location.href = "/";
    };

    return (
        <div className="relative">
            <nav className="flex justify-between items-center h-16 px-4 md:px-10 shadow-md bg-white">
                <div className="flex items-center gap-4">
                    <GiHamburgerMenu 
                        onClick={toggleSidebar} 
                        className="text-2xl cursor-pointer block lg:hidden hover:text-gray-600 transition-colors" 
                    />
                </div>

                {admin && (
                    <div className="flex items-center gap-2 relative" ref={menuRef}>
                        <span className="hidden md:block text-sm md:text-base">
                            {admin.firstname} {admin.lastname}
                        </span>
                        <div className="relative">
                            <img
                                src={`/api/logo/download/${admin.photo}`}
                                alt="Profile"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer object-cover border-2 border-gray-200 hover:border-gray-300 transition-all"
                                onClick={toggleMenu}
                            />
                            
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transform origin-top-right transition-all">
                                    <ul className="py-1">
                                        <li className="group">
                                            <Link to="/manageProfile" 
                                                className="px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                                <FaUserCircle className="text-gray-500 group-hover:text-gray-700" size={20} />
                                                <span>Manage Profile</span>
                                            </Link>
                                        </li>
                                        <li className="group">
                                            <Link to="/managePassword" 
                                                className="px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                                <IoIosLock className="text-gray-500 group-hover:text-gray-700" size={20} />
                                                <span>Manage Password</span>
                                            </Link>
                                        </li>
                                        <li className="group">
                                            <button onClick={handleLogout}
                                                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                                <IoLogOut className="text-gray-500 group-hover:text-gray-700" size={20} />
                                                <span>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;