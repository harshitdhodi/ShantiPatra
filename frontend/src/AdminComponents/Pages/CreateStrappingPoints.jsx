import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StrappingPointForm = () => {
    const [paperCore, setpaperCore] = useState("");
    const [color, setcolor] = useState("");
    const [packing, setpacking] = useState("");
    const [length, setlength] = useState("");
    const [qty, setqty] = useState("");
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
                paperCore,
                color,
                packing,
                length,
                qty,
                products,
                productId,
            };

            const response = await axios.post('/api/strappingPoint/createstrappingPoint', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log(response.data); // Log response data if needed

            setpaperCore("");
            setcolor("");
            setpacking("");
            setlength("");
            setqty("");
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
                <label htmlFor="paperCore" className="block font-semibold mb-2">
                    Product Code
                </label>
                <input
                    type="text"
                    id="paperCore"
                    value={paperCore}
                    onChange={(e) => setpaperCore(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="color" className="block font-semibold mb-2">
                    color
                </label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setcolor(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="packing" className="block font-semibold mb-2">
                    Pieces
                </label>
                <input
                    type="text"
                    id="packing"
                    value={packing}
                    onChange={(e) => setpacking(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="length" className="block font-semibold mb-2">
                    length (Minimum Order Quantity)
                </label>
                <input
                    type="text"
                    id="length"
                    value={length}
                    onChange={(e) => setlength(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    
                />
            </div>
            <div className="mb-4">
                <label htmlFor="qty" className="block font-semibold mb-2">
                    qty
                </label>
                <input
                    type="text"
                    id="qty"
                    value={qty}
                    onChange={(e) => setqty(e.target.value)}
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

export default StrappingPointForm;
