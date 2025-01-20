import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = () => {
    const [phoneNo, setPhoneNo] = useState("");

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
                const footer = response.data;
                setPhoneNo(footer.phoneNo || "");
            } catch (error) {
                console.error(error);
            }
        };

        fetchFooter();
    }, []);

    const formattedPhoneNo = phoneNo.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    const message = encodeURIComponent("Hello Team, I want to inquire about tapes. Link: https://www.shantiptra.com");

    return (
        <a
            href={`https://wa.me/${formattedPhoneNo}?text=${message}`}
            className="fixed bottom-[15%] right-4 w-16 h-16 bg-[#25d366] text-white rounded-full flex items-center justify-center text-2xl shadow-lg z-40 hover:bg-green-600 transition-transform transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaWhatsapp className="text-4xl" />
        </a>
    );
};
    
export default Whatsapp;