import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes, FaEye, FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

Modal.setAppElement('#root');

const TestimonialsTable = () => {
  // State declarations
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [testimonials, setTestimonials] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const pageSize = 5;
  const navigate = useNavigate();

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [testimonials, searchTerm]);

  const notify = () => toast.success("Updated Successfully!");

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => navigate(`/testimonials/editTestimonials/${row.original._id}`)}
          >
            {row.original.name}
          </span>
        ),
      },
      {
        Header: "Rating",
        accessor: "rating",
        Cell: ({ value }) => value || 'N/A', // Add fallback value
      },
      {
        Header: "Designation",
        accessor: "designation",
        Cell: ({ value }) => value || 'N/A', // Add fallback value
      },
      {
        Header: "Photo",
        accessor: "photo",
        Cell: ({ value }) => {
          const firstImage = Array.isArray(value) && value.length > 0 ? value[0] : null;
          return firstImage ? (
            <img 
              src={`/api/image/download/${firstImage}`} 
              alt="Testimonial" 
              className="w-32 h-20 object-cover" 
            />
          ) : null;
        },
        disableSortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => value === "active" ? 
          <FaCheck className="text-[#df950d]" /> : 
          <FaTimes className="text-red-500" />,
      },
      {
        Header: "Options",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <button 
              className="text-gray-600 hover:text-gray-800 transition" 
              onClick={() => handleView(row.original)}
            >
              <FaEye />
            </button>
            <Link 
              to={`/testimonials/editTestimonials/${row.original._id}`}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <FaEdit />
            </Link>
            <button 
              className="text-red-500 hover:text-red-700 transition" 
              onClick={() => deleteTestimonial(row.original._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ),
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
      data: filteredTestimonials,
    },
    useSortBy
  );

  const handleView = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  const fetchData = async (pageIndex) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/testimonial/getTestimonial?page=${pageIndex + 1}`,
        { withCredentials: true }
      );
      const testimonialsWithIds = response.data.data.map((testimonial, index) => ({
        ...testimonial,
        id: pageIndex * pageSize + index + 1,
      }));
      setTestimonials(testimonialsWithIds);
      setPageCount(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`/api/testimonial/deleteTestimonial?id=${id}`, {
        withCredentials: true
      });
      toast.success('Testimonial deleted successfully!');
      fetchData(pageIndex);
    } catch (error) {
      toast.error('Failed to delete testimonial.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(pageIndex);
  }, [pageIndex]);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('/api/pageHeading/heading?pageType=testimonial', {
        withCredentials: true
      });
      const { heading, subheading } = response.data;
      setHeading(heading || '');
      setSubheading(subheading || '');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch headings');
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  const saveHeadings = async () => {
    try {
      await axios.put('/api/pageHeading/updateHeading?pageType=testimonial', {
        pagetype: 'testimonial',
        heading,
        subheading,
      }, { withCredentials: true });
      notify();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save headings');
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer />
      
      {/* Headings Section */}
      <div className="mb-8 border border-gray-200 shadow-lg p-4 rounded">
        <div className="grid md:grid-cols-2 md:gap-2 grid-cols-1">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 font-serif uppercase">
              Sub heading
            </label>
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

      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold font-serif text-gray-700 uppercase">
          Testimonials
        </h1>
        <Link 
          to="/testimonials/createTestimonials"
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif"
        >
          <FaPlus size={15} />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
        />
      </div>

      {/* Table */}
      {loadings ? (
        <div className="flex justify-center">
          <UseAnimations animation={loading} size={56} />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex justify-center items-center">
          <iframe 
            className="w-96 h-96" 
            src="https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"
          />
        </div>
      ) : (
        <table className="w-full mt-4 border-collapse overflow-x-auto" {...getTableProps()}>
          <thead className="bg-slate-700 hover:bg-slate-800 text-white">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif"
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.render("Header")}</span>
                      {column.canSort && (
                        <span className="ml-1">
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <FaArrowDown />
                              : <FaArrowUp />
                            : <FaArrowDown className="text-gray-400" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b border-gray-300 hover:bg-gray-100 transition duration-150"
                >
                  {row.cells.map(cell => (
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
          className="mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          {"<"}
        </button>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex + 1 >= pageCount}
          className="mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={pageIndex + 1 >= pageCount}
          className="mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          {">>"}
        </button>
        <span>
          Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
        </span>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Testimonial Details"
        className="bg-white w-3/4 p-4 rounded-md shadow-lg max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Testimonial Details</h2>
        {selectedTestimonial && (
          <div>
            <p><strong>Name:</strong> {selectedTestimonial.name}</p>
            <p><strong>Rating:</strong> {selectedTestimonial.rating || 'N/A'}</p>
            <p><strong>Designation:</strong> {selectedTestimonial.designation || 'N/A'}</p>
            {selectedTestimonial.photo?.[0] && (
              <img
                src={`/api/image/download/${selectedTestimonial.photo[0]}`}
                alt="Testimonial"
                className="w-48 h-32 object-cover mt-2"
              />
            )}
          </div>
        )}
        <button 
          onClick={closeModal} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default TestimonialsTable;