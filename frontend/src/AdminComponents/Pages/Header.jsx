import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditHeader = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [facebooklink, setFacebooklink] = useState("");
  const [twitterlink, setTwitterlink] = useState("");
  const [youtubelink, setYoutubelink] = useState("");
  const [linkedinlink, setLinkedinlink] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchHeader();
  }, []);

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const fetchHeader = async () => {
    try {
      const response = await axios.get('/api/header/getHeader', { withCredentials: true });
      const header = response.data;

      setPhoneNo(header.phoneNo || "");
      setOpeningHours(header.openingHours || "");
      setFacebooklink(header.facebooklink || "");
      setTwitterlink(header.twitterlink || "");
      setYoutubelink(header.youtubelink || "");
      setLinkedinlink(header.linkedinlink || "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headerData = {
        phoneNo,
        openingHours,
        facebooklink,
        twitterlink,
        youtubelink,
        linkedinlink
      };

      const response = await axios.put('/api/header/updateHeader', headerData, {
        withCredentials: true
      });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Header Settings</h1>
      <ToastContainer />
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
        <label htmlFor="openingHours" className="block font-semibold mb-2">
          Opening Hours
        </label>
        <input
          type="text"
          id="openingHours"
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="facebookLink" className="block font-semibold mb-2">
          Facebook Link
        </label>
        <input
          type="url"
          id="facebookLink"
          value={facebooklink}
          onChange={(e) => setFacebooklink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="twitterLink" className="block font-semibold mb-2">
          Twitter Link
        </label>
        <input
          type="url"
          id="twitterLink"
          value={twitterlink}
          onChange={(e) => setTwitterlink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="youtubeLink" className="block font-semibold mb-2">
          YouTube Link
        </label>
        <input
          type="url"
          id="youtubeLink"
          value={youtubelink}
          onChange={(e) => setYoutubelink(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="linkedinLink" className="block font-semibold mb-2">
          LinkedIn Link
        </label>
        <input
          type="url"
          id="linkedinLink"
          value={linkedinlink}
          onChange={(e) => setLinkedinlink(e.target.value)}
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

export default EditHeader;
