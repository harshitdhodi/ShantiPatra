import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPageContent = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [photo, setPhoto] = useState([]);
  const [status, setStatus] = useState("active");
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
  const [imgTitle, setImgTitle] = useState([]);
  const [initialImgTitle, setInitialImgTitle] = useState([]);

  // New state variables
  const [countername, setCounterName] = useState("");
  const [counterno, setCounterNo] = useState("");
  const [sign, setSign] = useState("");


  const notify = () => {
    toast.success("Updated Successfully!");
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      const response = await axios.get(`
/api/aboutus/getAboutus`, { withCredentials: true });
      const aboutus = response.data;
      setHeading(aboutus.heading);
      setShortDescription(aboutus.shortDescription);
      setLongDescription(aboutus.longDescription);
      setInitialPhotos(aboutus.photo);
      setStatus(aboutus.status);
      setInitialPhotoAlts(aboutus.alt);
      setInitialImgTitle(aboutus.imgTitle);
      // Set new fields
      setCounterName(aboutus.countername || "");
      setCounterNo(aboutus.counterno || "");
      setSign(aboutus.sign || "");

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('shortDescription', shortDescription);
      formData.append('longDescription', longDescription);
      formData.append('status', status);
      formData.append('countername', countername);
      formData.append('counterno', counterno);
      formData.append('sign', sign);

      // Combine initial and new photo alts into a single array
      const combinedAlts = [...initialphotoAlts, ...photoAlts];
      const combinedImgTitles = [...initialImgTitle, ...imgTitle];

      // Append photos and their respective alts to FormData
      photo.forEach((p) => {
        formData.append('photo', p);
      });

      combinedAlts.forEach((a) => {
        formData.append('alt', a);
      });

      combinedImgTitles.forEach((title) => {
        formData.append('imgTitle', title);
      });

      const response = await axios.put(`/api/aboutus/updateAboutus`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhoto([...photo, ...newPhotos]);
  };

  const handleInitialAltTextChange = (e, index) => {
    const newPhotoAlts = [...initialphotoAlts];
    newPhotoAlts[index] = e.target.value;

    setInitialPhotoAlts(newPhotoAlts);
  };

  const handleNewAltTextChange = (e, index) => {
    const newPhotoAlts = [...photoAlts];
    newPhotoAlts[index] = e.target.value;

    setPhotoAlts(newPhotoAlts);
  };

  const handleInitialImgTitleChange = (e, index) => {
    const newImgTitles = [...initialImgTitle];
    newImgTitles[index] = e.target.value;
    setInitialImgTitle(newImgTitles);
  };

  const handleNewImgTitleChange = (e, index) => {
    const newImgTitles = [...imgTitle];
    newImgTitles[index] = e.target.value;
    setImgTitle(newImgTitles);
  };

  const handleDeleteInitialPhoto = (e, photoFilename, index) => {
    e.preventDefault();
    axios.delete(`/api/aboutus/image/${photoFilename}/${index}`, { withCredentials: true })
      .then(response => {
        const updatedPhotos = initialPhotos.filter(photo => photo !== photoFilename);
        setInitialPhotos(updatedPhotos);
        const updatedPhotoAlts = [...initialphotoAlts];
        const updatedimgTitle = [...initialImgTitle]
        updatedimgTitle.splice(index, 1);
        updatedPhotoAlts.splice(index, 1);
        setInitialPhotoAlts(updatedPhotoAlts);
        setInitialImgTitle(updatedimgTitle);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteNewPhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = [...photo];
    updatedPhotos.splice(index, 1);
    setPhoto(updatedPhotos);
    const updatedPhotoAlts = [...photoAlts];
    const updatedimgTitle = [...imgTitle];
    updatedPhotoAlts.splice(index, 1);
    updatedimgTitle.splice(index, 1)
    setPhotoAlts(updatedPhotoAlts);
    setImgTitle(updatedimgTitle);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit About Us</h1>
      <div className="mb-4">
        <label htmlFor="heading" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="shortDescription" className="block font-semibold mb-2">
          Short Description
        </label>
        <ReactQuill
          value={shortDescription}
          onChange={setShortDescription}
          modules={modules}
          className="quill"
        />
      </div>
      <div className="mb-8">
        <label htmlFor="longDescription" className="block font-semibold mb-2">
          Long Description
        </label>
        <ReactQuill
          value={longDescription}
          onChange={setLongDescription}
          modules={modules}
          className="quill"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Current Photos</label>
        <div className="flex flex-wrap gap-4">
          {initialPhotos.map((photo, index) => (
            <div key={index} className="relative w-56">
              <img
                src={`/api/image/download/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
              <label htmlFor={`alt-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`alt-${index}`}
                  value={initialphotoAlts[index]}
                  onChange={(e) => handleInitialAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <label htmlFor={`imgTitle-${index}`} className="block mt-2">
                Image Title:
                <input
                  type="text"
                  id={`imgTitle-${index}`}
                  value={initialImgTitle[index]}
                  onChange={(e) => handleInitialImgTitleChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteInitialPhoto(e, photo, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Add New Photos</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="p-2 border rounded"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {photo.map((file, index) => (
            <div key={index} className="relative w-56">
              <img
                src={URL.createObjectURL(file)}
                alt={`New Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
              <label htmlFor={`new-alt-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`new-alt-${index}`}
                  value={photoAlts[index] || ''}
                  onChange={(e) => handleNewAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <label htmlFor={`imgTitle-new-${index}`} className="block mt-2">
                Image Title:
                <input
                  type="text"
                  id={`imgTitle-new-${index}`}
                  value={imgTitle[index] || ""}
                  onChange={(e) => handleNewImgTitleChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteNewPhoto(e, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="counterName" className="block font-semibold mb-2">
          Counter Title
        </label>
        <input
          type="text"
          id="counterName"
          value={countername}
          onChange={(e) => setCounterName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="counterNo" className="block font-semibold mb-2">
          Counter Number
        </label>
        <input
          type="text"
          id="counterNo"
          value={counterno}
          onChange={(e) => setCounterNo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sign" className="block font-semibold mb-2">
          Sign
        </label>
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
          <option value="Days">days</option>
          <option value="Weeks">weeks</option>
          <option value="Months">months</option>
          <option value="Years">years</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>



      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Update
      </button>
      <ToastContainer />
    </form>
  );
};

export default EditPageContent;
