import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import WhatsAppButton from '../Whatsapp';
import SplashScreen from './Splashscreen';
import img1 from "../../assets/strapping.png";
import img2 from "../../assets/bopp.png";
import axios from 'axios';

const ProductMainPage = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    const { slugs } = useParams(); // Get 'slugs' from URL
    console.log(slugs);

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/product/getall', { withCredentials: true });
            setProducts(response.data); // The response is already an array of products based on your provided format
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Check if slugs exists before calling split
    const formattedCategory = slugs
        ? slugs
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : ''; // Default to empty string if slugs is undefined or null

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionProducts', { withCredentials: true });
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

    return (
        <>
            <SplashScreen
                onTransitionEnd={handleSplashEnd}
                isVisible={isSplashVisible}
            />

            <WhatsAppButton />

            {/* Render banners */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className='relative bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className='flex justify-center items-center h-[30vh] mb-10'>
                        <h1 className='font-bold text-white text-5xl text-center z-10'>{banner.title}</h1>
                        <div className='absolute inset-0 bg-black opacity-40 z-1'></div>
                    </div>
                </div>
            ))}

            {/* Render product cards */}
            <div className="bg-gray-100 -mt-10 py-10 p-5">
                <div className="flex justify-center gap-5">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <Link to={`/${product.slug}`} key={product._id}>
                                <div className="bg-white p-5 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                                    {/* Display product photo */}
                                    <img
                                        src={`/api/logo/download/${product.photo}`}
                                        alt={product.alt}
                                        className="w-full h-[30vh] object-cover rounded-xl"
                                    />
                                    <div className="py-3 text-center">
                                        <p className="text-2xl font-semibold">{product.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

        </>
    );
};

export default ProductMainPage;
