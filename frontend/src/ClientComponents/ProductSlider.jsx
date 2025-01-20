import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from "../images/blog1.jpg";
import img2 from "../images/blog2.jpg";

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const tapes = [
    {
      image: img1,
      name: "Clear BOPP Tape",
      color: "Transparent",
      width: "48mm",
      length: "50m",
      thickness: "45 micron",
      pcsPerCarton: "72 rolls",
      type: "BOPP Tape",
      adhesion: "High Tack"
    },
    {
      image: img2,
      name: "Masking Tape",
      color: "Beige",
      width: "24mm",
      length: "25m",
      thickness: "32 micron",
      pcsPerCarton: "144 rolls",
      type: "Paper Tape",
      adhesion: "Medium Tack"
    },
  ];

  // Slide to next item
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % tapes.length);
  }, [tapes.length]);

  // Slide to previous item
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + tapes.length) % tapes.length);
  }, [tapes.length]);

  const handleManualNavigation = useCallback((direction) => {
    setIsPaused(true);
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    setTimeout(() => setIsPaused(false), 5000);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    let intervalId;
    if (!isPaused && tapes.length > 2) { // Auto slide only if more than 2 items
      intervalId = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, nextSlide, tapes.length]);

  return (
    <div className='bg-gray-50 flex justify-center'>
      <div className='max-w-8xl w-full px-4 py-8'>
        <h2 className='font-bold text-[#df950d] text-5xl text-center mb-8'>Our Products</h2>
        <div className="relative flex items-center justify-center">
          {/* Conditionally render arrows if more than 2 items */}
          {tapes.length > 2 && (
            <button
              onClick={() => handleManualNavigation('prev')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute left-0 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Displaying cards */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex justify-center gap-6 transition-transform duration-500 ease-linear"
              style={{ transform: `translateX(-${(currentSlide % tapes.length) * 25}%)` }}
            >
              {tapes.map((tape, index) => (
                <div key={index} className="flex-shrink-0 w-[25%] md:w-[40%] lg:w-[20%]">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    {/* Product Image */}
                    <div className="relative h-48 mb-6 bg-gradient-to-b from-gray-50 to-white rounded-lg overflow-hidden">
                      <img src={tape.image} alt={tape.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 text-center">
                      <h3 className="text-xl font-semibold text-gray-800">{tape.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditionally render arrows if more than 2 items */}
          {tapes.length > 2 && (
            <button
              onClick={() => handleManualNavigation('next')}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors absolute right-0 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Conditionally render indicators if more than 2 items */}
        {tapes.length > 2 && (
          <div className="flex justify-center gap-2 mt-6">
            {tapes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
