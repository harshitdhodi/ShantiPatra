import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductDetailForm = () => {
    const [productCode, setProductCode] = useState("");
    const [variants, setVariants] = useState("");
    const [pcs, setPcs] = useState("");
    const [moq, setMoq] = useState("");
    const [size, setSize] = useState("");
    const [productId, setProductId] = useState("");
    const [productTitle, setProductTitle] = useState("");
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
            const response = await axios.get(`/api/productDetail/getProductDetailById?id=${productId}`, { withCredentials: true });
            const productDetail = response.data[0]; // Access the first object in the array
    
            console.log("Product Details Fetched:", productDetail);
    
            // Set state with product details
            setProductCode(productDetail?.productCode || "");
            setVariants(productDetail?.variants || "");
            setPcs(productDetail?.pcs || "");
            setMoq(productDetail?.moq || "");
            setSize(productDetail?.size || "");
            setProductId(productDetail?.productId || "");
        } catch (error) {
            console.error("Error fetching product details:", error);
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
                productId,
            };

            const response = await axios.put(`/api/productDetail/updateProductDetail?id=${id}`, formData, {
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
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Product Details</h1>
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
                Code (Plain or Printed) / Film Thickness
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
                Width / Tape Thickness
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
                Adhesion Strength / Thickness 
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
                Break Point of Elongation / Average Net Weight
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
                Tensile Strength / Average Strength 
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
                    Update Details
                </button>
            </div>
        </form>
    );
};

export default EditProductDetailForm;
