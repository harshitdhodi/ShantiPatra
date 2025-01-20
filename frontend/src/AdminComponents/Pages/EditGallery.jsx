import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditGalleryForm = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoAlt, setPhotoAlt] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/gallery/getgalleryById?id=${id}`)
        .then((response) => {
          const { title, photo, alt, imgTitle } = response.data.data;
          setTitle(title);
          setPhoto(photo && photo[0] ? photo[0] : null);
          setPhotoAlt(alt && alt[0] ? alt[0] : "");
          setPhotoTitle(imgTitle && imgTitle[0] ? imgTitle[0] : "");
        })
        .catch((error) => {
          console.error("Error fetching gallery data:", error);
          toast.error("Failed to load gallery data");
        });
    }
  }, [id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", photo);
    formData.append("alt", photoAlt);
    formData.append("imgTitle", photoTitle);

    try {
      if (id) {
        await axios.put(`/api/gallery/updategallery?id=${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Gallery updated successfully");
      } else {
        await axios.post("/api/gallery/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Gallery added successfully");
      }
      navigate("/gallery");
    } catch (error) {
      console.error("Error submitting gallery data:", error);
      toast.error("Failed to submit gallery data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">
        {id ? "Edit Gallery" : "Add Gallery"}
      </h1>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="photo" className="block font-semibold mb-2">
          Photo
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />
        {photo && (
          <div className="mt-4">
            <img
              src={
                typeof photo === "string"
                  ? `/api/image/download/${photo}`
                  : URL.createObjectURL(photo)
              }
              alt="Preview"
              className="h-32 w-56 object-cover"
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <label className="block font-semibold mb-2">Alternative Text:</label>
        <input
          type="text"
          value={photoAlt}
          onChange={(e) => setPhotoAlt(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <label className="block font-semibold mb-2">Image Title:</label>
        <input
          type="text"
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-8">
        {id ? "Update Gallery" : "Add Gallery"}
      </button>
    </form>
  );
};

export default EditGalleryForm;
