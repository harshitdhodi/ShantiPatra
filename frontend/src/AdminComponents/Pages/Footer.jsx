import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFooter = () => {

  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    fetchFooter();
  }, []);

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const fetchFooter = async () => {
    try {
      const response = await axios.get('/api/footer/getFooter', { withCredentials: true });
      const footer = response.data;

      // Ensure  are initialized as empty string if data is not available

      setAddress(footer.address || "");
      setPhoneNo(footer.phoneNo || "");
      setEmail(footer.email || "");
      setLocation(footer.location || "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const footerData = {
        address,
        phoneNo,
        email,
        location
      };

      const response = await axios.put('/api/footer/updateFooter', footerData, { withCredentials: true });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Footer Settings</h1>
      <ToastContainer />
      <div className="mb-4">
        <label htmlFor="address" className="block font-semibold mb-2">
          Address
        </label>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNo" className="block font-semibold mb-2">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block font-semibold mb-2">
          Location
        </label>
        <textarea
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditFooter;
