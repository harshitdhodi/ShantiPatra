import React from 'react';

const Counter = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 p-10">
     
      <div className="max-w-lg mb-8 lg:mb-0">
        <h2 className="text-sm font-semibold text-gray-500 mb-2">The Finest Design Agency</h2>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          You convey the idea, and we deliver a refined interface.
        </h1>
        <p className="text-gray-600 mb-6">
          We’re one of the finest web design agencies that team up with startups, agencies, and founders to design digital products and websites.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          More Details
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-4xl font-bold text-gray-900">60</h2>
          <p className="text-gray-600">Finished Projects</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-4xl font-bold text-gray-900">16k+</h2>
          <p className="text-gray-600">Issues Solved</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-4xl font-bold text-gray-900">10k+</h2>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-4xl font-bold text-gray-900">78</h2>
          <p className="text-gray-600">Awwwards Winning</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
