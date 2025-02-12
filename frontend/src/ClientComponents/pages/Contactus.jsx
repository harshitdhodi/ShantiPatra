import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import axios from 'axios';
import Modal from 'react-modal';
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';
import { ImSpinner2 } from "react-icons/im"; // Import spinner icon
// Set the app element for the modal (optional)
Modal.setAppElement('#root');

function Contactus() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [emailid, setEmailid] = useState("");
    const [location, setLocation] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };



    const fetchFooter = async () => {
        try {
            const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
            const footer = response.data;

            setAddress(footer.address || "");
            setPhoneNo(footer.phoneNo || "");
            setEmailid(footer.email || "");
            setLocation(footer.location || "");
            console.log(footer.location);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFooter();
    }, []);

    useEffect(() => {
        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setClientIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address', error);
            }
        };

        fetchClientIp();

        const params = new URLSearchParams(window.location.search);
        setUtmParams({
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            gcid_source: params.get('gcid_source') || '',
            utm_content: params.get('utm_content') || '',
            utm_term: params.get('utm_term') || '',
        });
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionContactus', { withCredentials: true });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        // alert("Form submitted successfully!");
      }, 2000);

        try {
            await axios.post('/api/inquiries/createInquiry', {
                name,
                email,
                phone,
                message,
                ipaddress: clientIp,
                ...utmParams,
            });

            // Open modal on successful submission
            setModalIsOpen(true);
            // Clear form fields
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />
            <WhatsAppButton />
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='relative bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className='flex justify-center items-center h-[30vh] mb-10'>
                        <h1 className='font-bold text-white text-5xl z-10'>{banner.title}</h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}
            <div className='lg:flex gap-5 lg:px-10 bg-[#faf2e3] py-16'>
                <div className='flex justify-center items-center text-center pb-10  w-full font-nunito'>
                    <div className="p-4 w-3/4 lg:w-full bg-white shadow-lg rounded-lg">
                        <form className='md:p-10' onSubmit={handleSubmit}>
                            <div className='text-start py-5'>
                                <p className='text-[#384b98] font-medium text-2xl'>Have Questions</p>
                                <p className='text-gray-800 font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Send us a message</p>
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name"></label>
                                <input
                                    className="bg-gray-100 appearance-none focus:outline-black border rounded w-full py-3 lg:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='md:flex gap-8'>
                                <div className="mb-4 md:w-1/2 ">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"></label>
                                    <input
                                        className="bg-gray-100 focus:outline-black appearance-none border rounded w-full py-3 px-3 lg:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone"></label>
                                    <input
                                        className="bg-gray-100 focus:outline-black appearance-none border rounded w-full py-3 px-3 lg:py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message"></label>
                                <textarea
                                    className="bg-gray-100 focus:outline-black appearance-none border rounded w-full py-3 pb-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="message"
                                    name="message"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-start">
                                <button
                                    className="bg-[#384b98] hover:bg-[#3b53b3] w-full flex text-center justify-center gap-2 items-center text-white hover:text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? (
                                        <>
                                            <ImSpinner2 className="animate-spin" /> {/* Loading spinner */}
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Get in Touch
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='space-y-4 px-10 py-5 lg:w-1/2  '>
                    <div className='space-y-5'>
                        <p className='text-4xl font-bold pr-[15rem]'>Contact Information</p>
                        <p className='text-gray-600 font-semibold'>Plan upon yet way get cold its week. Almost do am or limits hearts. Resolve parties but why she shewing.</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Hotline</p>
                        <p className='text-gray-600 font-semibold'>{phoneNo}</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Our Location</p>
                        <p className='text-gray-600 font-semibold'>{address}</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Our Email</p>
                        <p className='text-gray-600 font-semibold'>{emailid}</p>
                    </div>
                </div>


            </div>

            <iframe src={location} height="450" className='border-0 w-full' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            {/* Modal for successful submission */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Submission Successful"
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-[#f5faf7ed] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h2>
                    <p className="mb-4">Your message has been successfully sent.</p>
                    <p className='mb-4'> We will get back to you soon.</p>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className=" text-black px-4 py-2  absolute top-2 right-2"
                    >
                        <FaTimes size={25} />
                    </button>
                </div>
            </Modal>
        </ >
    );
}

export default Contactus;
