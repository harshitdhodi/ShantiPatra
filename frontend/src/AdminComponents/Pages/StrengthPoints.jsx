import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

Modal.setAppElement('#root');

const StrengthPoints = () => {
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [metaFilter, setMetaFilter] = useState("All");
    const navigate = useNavigate();

    const notify = () => {
        toast.success("Updated Successfully!");
    };

    const filteredProducts = useMemo(() => {
        return productDetails.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [productDetails, searchTerm]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: (_, rowIndex) => rowIndex + 1,
            },
            {
                Header: "Product Name",
                accessor: "productName",
                Cell: ({ row }) => (
                    <span
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate(`/product/editProduct/${row.original._id}`)}
                    >
                        {row.original.productName}
                    </span>
                ),
            },
            {
                Header: "Points",
                accessor: "points",
            },
            {
                Header: "Options",
                Cell: ({ row }) => (
                    <div className="flex gap-4">
                        <button className="text-blue-500 hover:text-blue-700 transition">
                            <Link to={`/product/edit-strength-point/${row.original._id}`}>
                                <FaEdit />
                            </Link>
                        </button>
                        <button
                            className="text-red-500 hover:text-red-700 transition"
                            onClick={() => deleteProductDetail(row.original._id)}
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                ),
                disableSortBy: true,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: filteredProducts,
        },
        useSortBy
    );

    const fetchProductDetail = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/strengthPoint/getstrengthPoint`, { withCredentials: true });
            setProductDetails(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProductDetail = async (id) => {
        try {
            await axios.delete(`/api/strengthPoint/deletestrengthPoint?id=${id}`, { withCredentials: true });
            fetchProductDetail();
            notify();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, []);

    return (
        <div className="p-4 overflow-x-auto">
            <ToastContainer />
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-4">
                <h1 className="text-xl font-bold text-gray-700 font-serif uppercase">Strangth Points</h1>
                <div className="flex gap-2 md:flex-row flex-col md:mt-0 mt-4">
                    <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300" title="Add">
                        <Link to="/product/create-strength-points"><FaPlus size={15} /></Link>
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                />
            </div>
            <h2 className="text-md font-semibold mb-4">Manage your Product Detail</h2>
            {loading ? (
                <div className="flex justify-center"><UseAnimations animation={loading} size={56} /></div>
            ) : (
                <>
                    {productDetails.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <iframe className="w-96 h-96" src="https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"></iframe>
                        </div>
                    ) : (
                        <table className="w-full mt-4 border-collapse" {...getTableProps()}>
                            <thead className="bg-slate-700 hover:bg-slate-800 text-white">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>{column.render("Header")}</span>
                                                    {column.canSort && (
                                                        <span className="ml-1">
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <FaArrowDown />
                                                                ) : (
                                                                    <FaArrowUp />
                                                                )
                                                            ) : (
                                                                <FaArrowDown className="text-gray-400" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="border-b border-gray-300 hover:bg-gray-100 transition duration-150"
                                        >
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} className="py-2 px-4">
                                                    {cell.render("Cell")}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default StrengthPoints;
