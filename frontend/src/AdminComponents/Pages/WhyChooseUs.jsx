import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FaEdit, FaTrashAlt, FaEye, FaTimes, FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditWhyChooseUsCounterForm from "./WhyChooseUsCounter";

Modal.setAppElement('#root');

const WhyChooseUsTable = () => {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [description, setDescription] = useState(""); // New state for description
    const [items, setItems] = useState([]); // Renamed from achievements
    const [loadings, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [selectedWhyChooseUs, setSelectedWhyChooseUs] = useState(null); // State for the selected banner
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const filteredItems = useMemo(() => {
        return items.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const notify = () => {
        toast.success("Updated Successfully!");
    };

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({ row }) => (
                    <span
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate(`/whychooseus/editwhychooseus/${row.original._id}`)}
                    >
                        {row.original.title}
                    </span>
                ),
            },

            {
                Header: "Photo",
                accessor: "photo",
                Cell: ({ value }) => {
                    const firstImage = Array.isArray(value) && value.length > 0 ? value[0] : null;
                    return firstImage ? <img src={`/api/image/download/${firstImage}`} alt="Item" className="w-32 h-20 object-cover" /> : null;
                },
                disableSortBy: true,
            },
            {
                Header: "Options",
                Cell: ({ row }) => (
                    <div className="flex gap-4">
                        <button className="text-gray-700 hover:text-gray-900 transition" onClick={() => handleView(row.original)}>
                            <FaEye />
                        </button>
                        <button className="text-blue-500 hover:text-blue-700 transition">
                            <Link to={`/whychooseus/editwhychooseus/${row.original._id}`}><FaEdit /></Link>
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition" onClick={() => deleteItem(row.original._id)}>
                            <FaTrashAlt />
                        </button>
                    </div>
                ),
                disableSortBy: true,
            },
        ],
        []
    );

    const handleView = (whyChooseus) => {
        setSelectedWhyChooseUs(whyChooseus);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWhyChooseUs(null);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data: filteredItems,
        },
        useSortBy
    );

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/whyChooseUs/getAllWhyChooseUs`, { withCredentials: true });
            const itemsWithIds = response.data.map((item, index) => ({
                ...item,
                id: index + 1,
            }));
            setItems(itemsWithIds);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`/api/WhyChooseUs/deleteWhyChooseUs?id=${id}`, { withCredentials: true });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchHeadings = async () => {
        try {
            const response = await axios.get('/api/pageHeading/heading?pageType=whychooseus', { withCredentials: true });
            const { heading, subheading } = response.data;
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
        }
    };

    const saveHeadings = async () => {
        try {
            await axios.put('/api/pageHeading/updateHeading?pageType=whychooseus', {
                pagetype: 'whychooseus',
                heading,
                subheading,
            }, { withCredentials: true });
            notify();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHeadings();
    }, []);

    return (
        <div className="p-4 overflow-x-auto">
            <ToastContainer />
            <div className="mb-8 border border-gray-200 shadow-lg p-4 rounded">
                <div className="grid grid-cols-2 gap-2">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Heading</label>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 font-serif uppercase">Sub heading</label>
                        <input
                            type="text"
                            value={subheading}
                            onChange={(e) => setSubheading(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                </div>
                <button
                    onClick={saveHeadings}
                    className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif"
                >
                    Save
                </button>
            </div>
            <EditWhyChooseUsCounterForm />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-700 font-serif uppercase">Why Choose Us</h1>
                <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif">
                    <Link to="/whychooseus/createwhychooseus"><FaPlus size={15} /></Link>
                </button>
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
            <h2 className="text-md font-semibold mb-4">Manage your items</h2>
            {loadings ? (
                <div className="flex justify-center"><UseAnimations animation={loading} size={56} /></div>
            ) : (
                <>
                    {items.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <iframe className="w-96 h-96" src="https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"></iframe>
                        </div>
                    ) : (
                        <table className="w-full mt-4 border-collapse overflow-x-auto" {...getTableProps()}>
                            <thead className="bg-slate-700 hover:bg-slate-800 text-white">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {column.render('Header')}
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? <FaArrowDown /> : <FaArrowUp />
                                                    ) : null}
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
                                        <tr {...row.getRowProps()} className="border-b border-gray-300">
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} className="py-2 px-4 text-gray-700">
                                                    {cell.render('Cell')}
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
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Banner Details"
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 "
            >
                <div className="bg-white p-8 rounded shadow-lg min-w-54 m-4 relative">
                    <button onClick={closeModal} className="absolute top-5 right-5 text-gray-500 hover:text-gray-700">
                        <FaTimes size={20} />
                    </button>
                    <h2 className="text-xl font-bold font-serif mb-4">Banner</h2>

                    {selectedWhyChooseUs && (
                        <div className="">
                            <div className="flex mt-2">
                                <p className="mr-2 font-semibold font-serif">Title :</p>
                                <p>{selectedWhyChooseUs.title}</p>
                            </div>
                            <div className=" mt-2">
                                <p className="mr-2 font-semibold font-serif">Description :</p>
                                <ReactQuill
                                    readOnly={true}
                                    value={selectedWhyChooseUs.description}
                                    modules={{ toolbar: false }}
                                    theme="bubble"
                                    className="quill"
                                />
                            </div>
                        </div>
                    )}

                </div>
            </Modal>
        </div>
    );
};

export default WhyChooseUsTable;
