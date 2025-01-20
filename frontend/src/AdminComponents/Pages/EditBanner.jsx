import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const sections = [
//   { value: "Home", label: "Home" },
//   { value: "About", label: "About" },
//   { value: "Services", label: "Services" },
//   { value: "Contact", label: "Contact" },
//   { value: "Products", label: "Products" },
// ];

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


const EditBanner = () => {
  const { id: bannerId } = useParams();
  const [menuListings, setMenuListings] = useState([]);
  const navigate = useNavigate();
  const [section, setSection] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState([]);
  const [status, setStatus] = useState("active");
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [initialphotoAlts, setInitialPhotoAlts] = useState([])
  const [imgTitle, setImgTitle] = useState([]);
  const [initialImgTitle, setInitialImgTitle] = useState([]);
  const [priority, setPriority] = useState(); // State to store selected priority
  const [priorityOptions, setPriorityOptions] = useState([]);

  const fetchPriorityOptions = async (section) => {
    try {
      const response = await axios.get(`/api/banner/getCountBySection?section=${section}`, { withCredentials: true });
      const count = response.data;
      if (count > 0) {
        const options = Array.from({ length: count }, (_, i) => i + 1);
        setPriorityOptions(options);
      } else {
        setPriorityOptions([1]);
      }
    } catch (error) {
      console.error(error);
      setPriorityOptions([1]);
    }
  };

  useEffect(() => {
    fetchPriorityOptions(section);
  }, [section]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`/api/banner/getBannerById?id=${bannerId}`, { withCredentials: true });
        const bannerData = response.data.data;
        setSection(bannerData.section);
        setTitle(bannerData.title);
        setDetails(bannerData.details);
        setInitialPhotos(bannerData.photo);
        setInitialPhotoAlts(bannerData.alt);
        setInitialImgTitle(bannerData.imgTitle);
        setStatus(bannerData.status);
        setPriority(bannerData.priority);
      } catch (error) {
        console.error('Error fetching banner:', error);
        // Handle error (e.g., redirect to an error page or show a message)
      }
    };

    fetchBannerData();
  }, [bannerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('section', section);
      formData.append('title', title);
      formData.append('details', details);
      formData.append('status', status);
      formData.append('priority', priority);

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

      // Construct the endpoint URL with section as a query parameter
      const endpoint = `/api/banner/updateBanner?id=${bannerId}`;

      // Make the PUT request
      const response = await axios.put(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      // Navigate to the banner listing page on successful update
      navigate('/banner');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error updating banner:', error);
      }
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
    axios.delete(`/api/banner/${bannerId}/image/${photoFilename}/${index}`, { withCredentials: true })
      .then(response => {
        const updatedPhotos = initialPhotos.filter(photo => photo !== photoFilename);
        setInitialPhotos(updatedPhotos);
        const updatedPhotoAlts = [...initialphotoAlts];
        const updatedimgTitle=[...initialImgTitle]
        updatedimgTitle.splice(index,1);
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
    const updatedimgTitle=[...imgTitle];
    updatedPhotoAlts.splice(index, 1);
    updatedimgTitle.splice(index,1)
    setPhotoAlts(updatedPhotoAlts);
    setImgTitle(updatedimgTitle);
  };

  useEffect(() => {
    const fetchMenuListings = async () => {
      try {
        const response = await axios.get('/api/menulisting/getMenulisting', { withCredentials: true });
        setMenuListings(response.data.menuListings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuListings();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Banner</h1>
      <div className="mb-4">
        <label htmlFor="section" className="block font-semibold mb-2">
          Section
        </label>
        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          {menuListings.map((sectionOption, index) => (
            <option key={index} value={sectionOption.pagename}>{sectionOption.pagename}</option>
          ))}
        </select>  
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          
        />
      </div>
      <div className="mb-8">
        <label htmlFor="details" className="block font-semibold mb-2">
          Description
        </label>
        <ReactQuill
          value={details}
          onChange={setDetails}
          modules={modules} // Include modules for image handling
          className="quill"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Current Photos</label>
        <div className="flex flex-warp gap-4">
          {initialPhotos.map((photo, index) => (
            <div key={index} className="w-56 relative">
              <div className="relative">
                <img
                  src={`/api/image/download/${photo}`}
                  alt={`Photo ${index + 1}`}
                  className="w-56 h-32 object-cover"
                />
                <label htmlFor={`alt-${index}`} className="block mt-2">
                  Alternative Text :
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
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Add New Photos</label>
        <input
          type="file"
          onChange={handleFileChange}
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

              <label htmlFor={`alt-new-${index}`} className="block mt-2">
                Alternative Text :
                <input
                  type="text"
                  id={`alt-new-${index}`}
                  value={photoAlts[index] || ""}
                  onChange={(e) => handleNewAltTextChange(e, index)}
                  className="w-full  p-2 border rounded focus:outline-none"
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
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex
                justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block font-semibold mb-2">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          {priorityOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
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
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Banner
      </button>
    </form>
  );
};

export default EditBanner;
