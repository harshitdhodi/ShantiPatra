import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const PopupFormButton = ({ 
  buttonText = "Catalogue", 
  inputLabel = "Upload File",
  submitText = "Submit",
  onSubmitSuccess = () => console.log("File uploaded successfully"),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('catalog', file); // 'catalog' matches the field expected by the backend

    try {
      await axios.post('/api/catalog/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSubmitSuccess();
      setFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#fab700] text-white rounded-md hover:bg-yellow-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>

      {/* Popup Form */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[9999]"
            onClick={() => setIsOpen(false)}
          />

          {/* Form Container */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-white rounded-lg shadow-xl p-6 w-full max-w-sm z-[10000]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{inputLabel}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md 
                         hover:bg-blue-700 transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2"
              >
                {submitText}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PopupFormButton;
