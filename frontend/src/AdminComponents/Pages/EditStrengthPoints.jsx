import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductPointsForm = () => {
    const [productId, setProductId] = useState("");
    const [points, setPoints] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchAllProducts();
        if (id) {
            fetchProductPoints(id);
        }
    }, [id]);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/product/getAllProductTitles', { withCredentials: true });
            console.log("Fetched products:", response.data.products); // Debugging
            setAllProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching all products:", error);
        }
    };

    const fetchProductPoints = async (productId) => {
        try {
            const response = await axios.get(`/api/strengthPoint/getstrengthPointById?id=${id}`, { withCredentials: true });
            const productPoints = response.data[0];
            console.log("Fetched details:", response.data); // Log to inspect the data structure
    
            setProductId(productPoints.productId);
            setPoints(productPoints.points);
        } catch (error) {
            console.error("Error fetching product points:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                productId,
                points,
            };

            const response = await axios.put(`/api/strengthPoint/updatestrengthPoint?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            toast.success("Product points updated successfully!");
            navigate('/product');
        } catch (error) {
            console.error("Error updating product points:", error);
            toast.error("Failed to update product points.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Strength Points</h1>
            <ToastContainer />
            <div className="mb-4">
                <label htmlFor="productId" className="block font-semibold mb-2">
                    Product
                </label>
                <select
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                >
                    <option value="">Select Product</option>
                    {allProducts.length > 0 ? (
                        allProducts.map(product => (
                            <option key={product._id} value={product.slug}>
                                {product.title}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading products...</option>
                    )}
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
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                    Update Points
                </button>
            </div>
        </form>
    );
};

export default EditProductPointsForm;
