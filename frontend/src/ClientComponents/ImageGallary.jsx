import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/gallery/getAll');
        const imageData = response.data.map((item, index) => ({
          id: item._id,
          title: item.title,
          url: `/api/image/download/${item.photo[0]}`, // Update with correct image path
          alt: item.alt[0] || item.title,
          size: index === 4 ? "col-span-2 row-span-1" : "col-span-1 row-span-1" // Example of setting larger size for specific images
        }));
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-[80%] mb-10 mx-auto p-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 w-full h-1/2">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-lg ${image.size} transform transition-transform duration-300 hover:scale-105 group`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `/api/placeholder/400/400`;
              }}
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex justify-center items-center">
              <h3 className="text-white font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
