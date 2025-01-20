import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditCustomizationStep = () => {
  const { id: stepId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

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
    const fetchCustomizationStepData = async () => {
      try {
        const response = await axios.get(`
/api/customizationsteps/getCustomizationStepById?id=${stepId}`, { withCredentials: true });
        const { title, description, status } = response.data.data;
        setTitle(title);
        setDescription(description);
        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomizationStepData();
  }, [stepId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const stepData = {
        title,
        description,
        status
      };

      await axios.put(`
/api/customizationsteps/updateCustomizationStep?id=${stepId}`, stepData, { withCredentials: true });

      // Clear the form fields after submission
      setTitle("");
      setDescription("");
      setStatus("active");

      // Navigate to the customization steps page after successful submission
      navigate("/customizationsteps");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Customization Step</h1>
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
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">
          Description
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules} // Include modules for image handling
          className="quill"
        />
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
        Update Customization Step
      </button>
    </form>
  );
};

export default EditCustomizationStep;
