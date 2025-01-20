import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailForm = () => {
    const [productCode, setProductCode] = useState("");
    const [variants, setVariants] = useState("");
    const [pcs, setPcs] = useState("");
    const [moq, setMoq] = useState("");
    const [size, setSize] = useState("");
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
                productCode,
                variants,
                pcs,
                moq,
                size,
                products,
                productId,
            };

            const response = await axios.post('/api/productDetail/CreateProductDetail', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log(response.data); // Log response data if needed

            setProductCode("");
            setVariants("");
            setPcs("");
            setMoq("");
            setSize("");
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
                <label htmlFor="productCode" className="block font-semibold mb-2">
                    Product Code
                </label>
                <input
                    type="text"
                    id="productCode"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="variants" className="block font-semibold mb-2">
                    Variants
                </label>
                <input
                    type="text"
                    id="variants"
                    value={variants}
                    onChange={(e) => setVariants(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pcs" className="block font-semibold mb-2">
                    Pieces
                </label>
                <input
                    type="number"
                    id="pcs"
                    value={pcs}
                    onChange={(e) => setPcs(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="moq" className="block font-semibold mb-2">
                    MOQ (Minimum Order Quantity)
                </label>
                <input
                    type="number"
                    id="moq"
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="size" className="block font-semibold mb-2">
                    Size
                </label>
                <input
                    type="text"
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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

export default ProductDetailForm;
