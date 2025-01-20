import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewStaffForm = () => {
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [photoTitles, setPhotoTitles] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [details, setDetails] = useState(""); // New state for details
  const [facebook, setFacebook] = useState(""); // New state for Facebook URL
  const [twitter, setTwitter] = useState(""); // New state for Twitter URL
  const [linkedin, setLinkedin] = useState(""); // New state for LinkedIn URL
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    // Limit the number of photos to 5
    if (photos.length + files.length > 5) {
      alert("You can only upload up to 5 photos");
      return;
    }
    setPhotos([...photos, ...files]);
    // Initialize alt text for each new photo
    const newPhotoAlts = Array.from({ length: files.length }, () => "");
    const newPhotoTitles = Array.from({ length: files.length }, () => "");
    setPhotoAlts([...photoAlts, ...newPhotoAlts]);
    setPhotoTitles([...photoTitles, ...newPhotoTitles]);
  };

  const handleDeleteImage = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setPhotoAlts((prevPhotoAlts) => prevPhotoAlts.filter((_, i) => i !== index));
    setPhotoTitles((prevPhotoTitles) => prevPhotoTitles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('S_id', staffId);
      formData.append('name', name);
      formData.append('jobTitle', jobTitle);
      formData.append('status', status);
      formData.append('details', details); // Append details to formData
      formData.append('facebook', facebook); // Append Facebook URL to formData
      formData.append('twitter', twitter); // Append Twitter URL to formData
      formData.append('linkedin', linkedin); // Append LinkedIn URL to formData
      photos.forEach((photo, index) => {
        formData.append(`photo`, photo);
        formData.append(`alt`, photoAlts[index]);
        formData.append(`imgTitle`, photoTitles[index]);
      });

      const response = await axios.post('/api/staff/insertStaff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      setStaffId("");
      setName("");
      setJobTitle("");
      setPhotos([]);
      setStatus("active");
      setPhotoAlts([]);
      setPhotoTitles([]);
      setDetails(""); // Clear details after submission
      setFacebook(""); // Clear Facebook URL after submission
      setTwitter(""); // Clear Twitter URL after submission
      setLinkedin(""); // Clear LinkedIn URL after submission
      navigate('/ourTeam');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Team member</h1>
      <div className="mb-4">
        <label htmlFor="staffId" className="block font-semibold mb-2">
          Employee ID
        </label>
        <input
          type="text"
          id="staffId"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
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
        <label htmlFor="details" className="block font-semibold mb-2"> {/* New details input */}
          Details
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="facebook" className="block font-semibold mb-2"> {/* New Facebook URL input */}
          Facebook Link
        </label>
        <input
          type="url"
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="twitter" className="block font-semibold mb-2"> {/* New Twitter URL input */}
          Twitter Link
        </label>
        <input
          type="url"
          id="twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="linkedin" className="block font-semibold mb-2"> {/* New LinkedIn URL input */}
          LinkedIn Link
        </label>
        <input
          type="url"
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mt-12">
        <label htmlFor="photo" className="block font-semibold mb-2">
          Photos
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          multiple
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />
        {photos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group flex flex-col items-center">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Service ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                  >
                    X
                  </button>
                </div>
                <label className="block mt-2">
                  Alt Text:
                  <input
                    type="text"
                    value={photoAlts[index]}
                    onChange={(e) => {
                      const newPhotoAlts = [...photoAlts];
                      newPhotoAlts[index] = e.target.value;
                      setPhotoAlts(newPhotoAlts);
                    }}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </label>
                <label className="block mt-2">
                  Image Title:
                  <input
                    type="text"
                    value={photoTitles[index]}
                    onChange={(e) => {
                      const newPhotoTitles = [...photoTitles];
                      newPhotoTitles[index] = e.target.value;
                      setPhotoTitles(newPhotoTitles);
                    }}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-2">
          Status
        </label>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Team Member
      </button>
    </form>
  );
};

export default NewStaffForm;
