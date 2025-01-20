import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBOPPTableForm = () => {
    const [width, setWidth] = useState("");
    const [cartonNo, setCartonNo] = useState("");
    const [productId, setProductId] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchAllProducts();
        if (id) {
            fetchStrappingPointDetails(id);
        }
    }, [id]);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/product/getAllProductTitles', { withCredentials: true });
            setAllProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch product titles.");
        }
    };

    const fetchStrappingPointDetails = async (strappingPointId) => {
        try {
            const response = await axios.get(`/api/boppTable/getboppTableById?id=${strappingPointId}`, { withCredentials: true });
            console.log("Fetched details:", response.data); // Log to inspect the data structure
    
            const details = response.data[0]; // Access the first item in the array
    
            // Check if details are valid
            if (details) {
                setWidth(details.width || "");
                setCartonNo(details.cartonNo || "");
                setProductId(details.productId || "");
            } else {
                toast.error("No details found for the specified ID.");
            }
        } catch (error) {
            console.error("Error fetching strapping point details:", error);
            toast.error("Failed to fetch strapping point details.");
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { width, cartonNo, productId };

            await axios.put(`/api/boppTable/updateboppTable?id=${id}`, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            toast.success("Strapping point details updated successfully!");
            navigate('/strapping-point');
        } catch (error) {
            console.error("Failed to update strapping point details:", error);
            toast.error("Failed to update details.");
        }
    };

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit BOPP Points</h1>
            <ToastContainer />

            <div className="mb-4">
                <label htmlFor="productId" className="block font-semibold mb-2">Product</label>
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
                            {product.title} ({product._id}) {/* Display product ID in the dropdown */}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="width" className="block font-semibold mb-2">Width</label>
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
                <label htmlFor="cartonNo" className="block font-semibold mb-2">Carton No</label>
                <input
                    type="text"
                    id="cartonNo"
                    value={cartonNo}
                    onChange={(e) => setCartonNo(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
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

export default EditBOPPTableForm;
