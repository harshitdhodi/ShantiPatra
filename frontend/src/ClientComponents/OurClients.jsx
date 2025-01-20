import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios'; // Import axios for API requests

function OurClients() {
    // State to hold the dynamic client data
    const [clients, setClients] = useState([]);

    // Fetch clients data from the API
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/client/getAll', { withCredentials: true });
                const fetchedClients = response.data || []; // Adjust if necessary based on your response
                setClients(fetchedClients); // Update state with fetched client data
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClients(); // Call the function to fetch data
    }, []);

    const settings = {
        dots: true, // Enable dots
        infinite: true,
        speed: 4000,
        slidesToShow: 1, // Default for mobile screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, // Tablet screens
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1, // Mobile screens
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, // Mobile screens
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 2566,
                settings: {
                    slidesToShow: 5, // Large screens
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="px-8 flex justify-center items-center pt-4">
            <div className="relative overflow-hidden">
                <div className="flex justify-center items-center">
                    <p className="sm:text-5xl text-3xl font-bold mb-3 bg-none text-[#384b98] drop-shadow-lg">
                        Our Clients
                    </p>
                </div>
                <Slider {...settings}>
                    {clients.map((client) => (
                        <div key={client._id} className=''> {/* Adjust key based on your client data structure */}
                            <div className='flex flex-col items-center text-center '>
                                <div className='relative'>
                                    <img
                                        src={`/api/image/download/${client.photo[0]}`} // Access first item of 'photo' array
                                        alt={client.alt[0] || "Client Image"} // Access first item of 'alt' array or use default
                                        title={client.imgTitle[0] || client.title} // Use title if imgTitle is empty
                                        className='h-44 w-44 object-contain'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default OurClients;
