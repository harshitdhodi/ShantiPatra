import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

// Set the app element for the modal
Modal.setAppElement('#root');

function InquiryForm({ productName, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clientIp, setClientIp] = useState('');
    const [utmParams, setUtmParams] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Function to toggle scroll lock
    const toggleScrollLock = (lock) => {
        const html = document.documentElement;
        const body = document.body;
        
        if (lock) {
            // Store current scroll position
            const scrollY = window.scrollY;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
        } else {
            // Restore scroll position
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    };

    useEffect(() => {
        // Fetch the client's IP address
        const fetchClientIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setClientIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address', error);
            }
        };

        fetchClientIp();

        // Get UTM parameters from the URL
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

        // Toggle scroll lock when the form mounts
        toggleScrollLock(true);

        // Cleanup function to remove scroll lock when component unmounts
        return () => {
            toggleScrollLock(false);
        };
    }, []);

    // Update scroll lock when success modal changes
    useEffect(() => {
        if (modalIsOpen) {
            toggleScrollLock(true);
        }
    }, [modalIsOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaValue) {
            setErrorMessage('Please complete the reCAPTCHA.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/productinquiry/createproductinquiries', {
                name,
                email,
                phone,
                subject,
                message,
                productName,
                ipaddress: clientIp,
                ...utmParams,
            });

            setModalIsOpen(true);
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');

            if (response.data.success) {
                onClose();
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        toggleScrollLock(false);
        onClose();
    };

    const handleSuccessModalClose = () => {
        setModalIsOpen(false);
        toggleScrollLock(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[70vh] overflow-auto">
                <h2 className="text-2xl font-bold text-center  mb-10">
                    <span className='border-b-2 pb-2 border-blue-900 text-blue-900'>
                    Inquiry for {productName}
                    </span>
                    </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Phone No</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_SITE_KEY}
                            onChange={(value) => setCaptchaValue(value)}
                        />
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 w-[20%] text-white py-2 px-4 rounded-lg mr-2"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 w-[20%] text-white py-2 px-4 rounded-lg"
                            disabled={!captchaValue || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleSuccessModalClose}
                contentLabel="Submission Successful"
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-[#f5faf7ed] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Thank You!</h2>
                    <p className="mb-4">Your message has been successfully sent.</p>
                    <p className="mb-4">We will get back to you soon.</p>
                    <button
                        onClick={handleSuccessModalClose}
                        className="text-black px-4 py-2 absolute top-2 right-2"
                    >
                        <FaTimes size={25} />
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default InquiryForm;