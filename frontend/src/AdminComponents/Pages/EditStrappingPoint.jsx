import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStrappingForm = () => {
    const [paperCore, setPaperCore] = useState("");
    const [color, setColor] = useState("");
    const [packing, setPacking] = useState("");
    const [length, setLength] = useState("");
    const [qty, setQty] = useState("");
    const [products, setProducts] = useState("");
    const [productId, setProductId] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchAllProducts();
        if (id) {
            fetchProductDetails(id);
        }
    }, [id]);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/product/getAllProductTitles', { withCredentials: true });
            setAllProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`/api/strappingPoint/getstrappingPointById?id=${productId}`, { withCredentials: true });
            const productDetail = response.data[0]; // Access the first item in the array
            console.log("Product Details Fetched:", response.data);
    
            setPaperCore(productDetail.paperCore);
            setColor(productDetail.color);
            setPacking(productDetail.packing);
            setLength(productDetail.length);
            setQty(productDetail.qty);
            setProducts(productDetail.products); // Adjust this as necessary
            setProductId(productDetail.productId);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {};

            // Only include fields that have been changed
            if (paperCore) formData.paperCore = paperCore;
            if (color) formData.color = color;
            if (packing) formData.packing = packing;
            if (length) formData.length = length;
            if (qty) formData.qty = qty;
            if (products) formData.products = products;
            if (productId) formData.productId = productId;

            const response = await axios.put(`/api/strappingPoint/updatestrappingPoint?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            toast.success("Product details updated successfully!");
            navigate('/product');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product details.");
        }
    };

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Strapping Points</h1>
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
                    Paper Core
                </label>
                <input
                    type="text"
                    id="paperCore"
                    value={paperCore}
                    onChange={(e) => setPaperCore(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="color" className="block font-semibold mb-2">
                    Color
                </label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="packing" className="block font-semibold mb-2">
                    Packing
                </label>
                <input
                    type="text"
                    id="packing"
                    value={packing}
                    onChange={(e) => setPacking(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="length" className="block font-semibold mb-2">
                    Length
                </label>
                <input
                    type="text"
                    id="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="qty" className="block font-semibold mb-2">
                    Quantity
                </label>
                <input
                    type="text"
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                />
            </div>
         

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                    Update Details
                </button>
            </div>
        </form>
    );
};

export default EditStrappingForm;
