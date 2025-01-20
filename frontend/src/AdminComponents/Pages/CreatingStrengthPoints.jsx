import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StrengthPointForm = () => {
    const [points, setpoints] = useState("");
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/product/getAllProductTitles', { withCredentials: true });
            setAllProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                points,
               
                products,
                productId,
            };

            const response = await axios.post('/api/strengthPoint/createstrengthPoint', formData, {
                headers: {
                    'Content-Type': 'application/json', 
                },
                withCredentials: true
            });

            console.log(response.data); // Log response data if needed

            setpoints("");
          
            setProducts([]);
            setProductId("");
            navigate('/product');
        } catch (error) {
            console.error(error);
        }
    };

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Product Details</h1>
            <ToastContainer />
            <div className="mb-4">
                <label htmlFor="productId" className="block font-semibold mb-2">
                    Product
                </label>
                <select
                    id="productId"
                    value={productId}
                    onChange={handleProductChange}
                    className="w-full p-2 border rounded focus:outline-none"
                    
                >
                    <option value="">Select Product</option>
                    {allProducts.map(product => (
                        <option key={product._id} value={product.slug}>
                            {product.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="points" className="block font-semibold mb-2">
                   Points
                </label>
                <input
                    type="text"
                    id="points"
                    value={points}
                    onChange={(e) => setpoints(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"  
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                    Save Details
                </button>
            </div>
        </form>
    );
};

export default StrengthPointForm;
