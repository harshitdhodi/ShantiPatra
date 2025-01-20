import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StrappingPointForm = () => {
    const [width, setWidth] = useState("");
    const [cartonNo, setCartonNo] = useState("");
    const [packing, setPacking] = useState("");
    const [length, setLength] = useState("");
    const [qty, setQty] = useState("");
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
                width,
                cartonNo,
                products,
                productId,
            };

            const response = await axios.post('/api/boppTable/createboppTable', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log(response.data); // Log response data if needed

            setWidth("");
            setCartonNo("");
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
                    required
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
                <label htmlFor="width" className="block font-semibold mb-2">
                    Width
                </label>
                <input
                    type="text"
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="cartonNo" className="block font-semibold mb-2">
                    Carton No
                </label>
                <input
                    type="text"
                    id="cartonNo"
                    value={cartonNo}
                    onChange={(e) => setCartonNo(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            {/* Include other fields like packing, length, qty, etc. here */}

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

export default StrappingPointForm;
