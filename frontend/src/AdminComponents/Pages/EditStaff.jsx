import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


const EditStaff = () => {
  const [S_id, setS_id] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [photo, setPhoto] = useState([]);
  const [status, setStatus] = useState("active");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const { id } = useParams();
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
  const [imgTitle, setImgTitle] = useState([]);
  const [initialImgTitle, setInitialImgTitle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

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

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`/api/staff/getStaffById?id=${id}`, { withCredentials: true });
      const staff = response.data.data;

      setS_id(staff.S_id);
      setName(staff.name);
      setJobTitle(staff.jobTitle);
      setInitialPhotos(staff.photo);
      setInitialImgTitle(staff.imgTitle);
      setStatus(staff.status);
      setInitialPhotoAlts(staff.alt);
      setFacebook(staff.facebook);
      setTwitter(staff.twitter);
      setLinkedin(staff.linkedin);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('S_id', S_id);
      formData.append('name', name);
      formData.append('jobTitle', jobTitle);
      formData.append('status', status);
      formData.append('facebook', facebook);
      formData.append('twitter', twitter);
      formData.append('linkedin', linkedin);

      // Combine initial and new photo alts into a single array
      const combinedAlts = [...initialphotoAlts, ...photoAlts];
      const combinedImgTitles = [...initialImgTitle, ...imgTitle];

      // Append photos and their respective alts to FormData
      photo.forEach((p) => {
        formData.append(`photo`, p);
      });

      combinedAlts.forEach((a) => {
        formData.append(`alt`, a);
      });

      combinedImgTitles.forEach((title) => {
        formData.append('imgTitle', title);
      });

      const response = await axios.put(`/api/staff/updateStaff?id=${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      navigate('/ourTeam');
    } catch (error) {
      console.error(error);
    }
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

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhoto([...photo, ...newPhotos]);
  };

  const handleDeleteInitialPhoto = (e, photoFilename, index) => {
    e.preventDefault();
    axios.delete(`/api/staff/${id}/image/${photoFilename}/${index}`, { withCredentials: true })
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
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Team Member</h1>
      <div className="mb-4">
        <label htmlFor="S_id" className="block font-semibold mb-2">
          Employee ID
        </label>
        <input
          type="text"
          id="S_id"
          value={S_id}
          onChange={(e) => setS_id(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="jobTitle" className="block font-semibold mb-2">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="facebook" className="block font-semibold mb-2">
          Facebook Link
        </label>
        <input
          type="text"
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="twitter" className="block font-semibold mb-2">
          Twitter Link
        </label>
        <input
          type="text"
          id="twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="linkedin" className="block font-semibold mb-2">
          LinkedIn Link
        </label>
        <input
          type="text"
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
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
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Update
      </button>
    </form>
  );
};

export default EditStaff;
