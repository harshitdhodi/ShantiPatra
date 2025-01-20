import React, { useEffect, useState } from 'react';
import img1 from "../images/banner1.jpg"; // Example fallback image
import img2 from "../images/banner4.jpg"; // Example fallback image

const ProductHome = () => {
  const [products, setProducts] = useState([]);

  // Fetch the latest products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/getLatestProducts');
        const data = await response.json();

        // Transform data to match the structure you need for display
        const formattedProducts = data.data.map((product) => ({
          id: product._id,
          image: product.photo.length > 0 ? `/api/image/download/${product.photo[0]}` : img1, // Use the first image from the array or a fallback
          title: product.title,
          slug: `/${product.slug}`,
          homeDetail: product.homeDetail // Store the product homeDetail
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative w-full min-h-[50vh] overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <h2 className='text-[#384b98] text-3xl lg:text-5xl md:text-4xl mb-5 text-center font-bold py-5'>Our Products</h2>
          
        {/* New grid layout */}
        <div className="grid px-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} onClick={() => window.location.href = product.slug}>
              <div className="relative bg-white shadow-xl overflow-hidden cursor-pointer h-[300px]">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] bg-gray-100 bg-opacity-50 text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className='text-2xl font-bold text-[#000000] text-center w-[75%]'>{product.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHome;
