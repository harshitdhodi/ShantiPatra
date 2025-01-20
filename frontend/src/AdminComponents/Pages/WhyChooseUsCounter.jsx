import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditWhyChooseUsCounterForm = () => {
  const [title, setTitle] = useState("");
  const [no, setNo] = useState("");
  const [sign, setSign] = useState("");
  const [status, setStatus] = useState("active");
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [altText, setAltText] = useState("");
  const [imgTitle, setImgTitle] = useState(""); // New state for imgTitle
  const navigate = useNavigate();
  const { id } = useParams();

  const notify = () => {
    toast.success("Updated Successfully!");
  };

  useEffect(() => {
    const fetchWhyChooseUsCounter = async () => {
      try {
        const response = await axios.get(`/api/whyChooseUsCounter/getWhyChooseUsCounters`, { withCredentials: true });
        const counter = response.data;
        setTitle(counter.title);
        setNo(counter.no);
        setSign(counter.sign);
        setStatus(counter.status);
        setCurrentPhoto(counter.photo);
        setAltText(counter.alt);
        setImgTitle(counter.imgTitle); // Set imgTitle from the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchWhyChooseUsCounter();
  }, []);

  useEffect(() => {
    // Clean up the object URL when the component unmounts or photo changes
    return () => {
      if (photo) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setCurrentPhoto(URL.createObjectURL(file)); // Create a temporary URL for the new photo
    }
    setAltText("");
    setImgTitle(""); // Reset imgTitle when a new photo is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("no", no);
    formData.append("sign", sign);
    formData.append("status", status);
    formData.append("alt", altText);
    formData.append("imgTitle", imgTitle); // Append imgTitle to the form data
    if (photo) {
      formData.append("photo", photo);
    } else if (currentPhoto) {
      formData.append("photo", currentPhoto);
    }

    try {
      await axios.put(`/api/whyChooseUsCounter/updateWhyChooseUsCounter`, formData, { withCredentials: true });
      notify();
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Why Choose Us Counter</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="no" className="block font-semibold mb-2">Number</label>
        <input
          type="number"
          id="no"
          value={no}
          onChange={(e) => setNo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sign" className="block font-semibold mb-2">Sign</label>
        <select
          id="sign"
          value={sign}
          onChange={(e) => setSign(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          <option value="" disabled>Select Sign</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
          <option value="%">%</option>
          <option value="₹">₹</option>
          <option value="k">k</option>
          <option value="units">units</option>
          <option value="km">km</option>
          <option value="m">m</option>
          <option value="L">L</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="s">s</option>
          <option value="min">min</option>
          <option value="h">h</option>
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="years">years</option>
        </select>
      </div>
      <div className="mb-8">
        <label htmlFor="photo" className="block font-semibold mb-2">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />

        {(photo || currentPhoto) && (
          <div className="mt-2 w-56 relative group">
            <img
              src={photo ? URL.createObjectURL(photo) : `/api/logo/download/${currentPhoto}`}
              alt={altText}
              className="h-32 w-56 object-cover"
            />
            <div className="mb-4">
              <label htmlFor="alt" className="block font-semibold mb-2">Alternative Text</label>
              <input
                type="text"
                id="alt"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-56 p-2 border rounded focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imgTitle" className="block font-semibold mb-2">Image Title</label>
              <input
                type="text"
                id="imgTitle"
                value={imgTitle}
                onChange={(e) => setImgTitle(e.target.value)}
                className="w-56 p-2 border rounded focus:outline-none"
                required
              />
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-2">Status</label>
        <div className="flex items-center">
          <label className="mr-4 text-[#df950d]">
            <input
              type="radio"
              value="active"
              checked={status === "active"}
              onChange={() => setStatus("active")}
              className="mr-2"
            />
            Active
          </label>
          <label className="text-red-500">
            <input
              type="radio"
              value="inactive"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
              className="mr-2"
            />
            Inactive
          </label>
        </div>
      </div>
      <button type="submit" className="bg-slate-900 text-white py-2 px-4 rounded">Update Counter</button>
    </form>
  );
};

export default EditWhyChooseUsCounterForm;
