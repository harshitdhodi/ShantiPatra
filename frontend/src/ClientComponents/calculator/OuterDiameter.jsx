import React, { useState ,useEffect } from 'react';
import { Input } from "./Input";
import { Button } from "./Button";
import { Label } from "./Label";
import WhatsAppButton from '../Whatsapp';
import axios from "axios";

const OuterDiameter = () => {
  const [formData, setFormData] = useState({
    filmThickness: '',
    adhesiveThickness: '',
    coreDiameter: '',
    coreThickness: '',
    length: ''
  });
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    thickness: '',
    outerDiameter: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };


  const fetchData = async () => {
    setLoading(true);
    try {
        const response = await axios.get('/api/banner/getBannersBySectionCalculator', { withCredentials: true });
        setBanners(response.data.data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        setLoading(false);
    }
};

useEffect(() => {
    fetchData();
}, []);


  const calculateResults = () => {
    const { 
      filmThickness, 
      adhesiveThickness, 
      coreDiameter, 
      coreThickness, 
      length 
    } = formData;

    const film = parseFloat(filmThickness);
    const adhesive = parseFloat(adhesiveThickness);
    const coreDia = parseFloat(coreDiameter);
    const coreThick = parseFloat(coreThickness);
    const tapeLength = parseFloat(length);

    if (
      isNaN(film) || 
      isNaN(adhesive) || 
      isNaN(coreDia) || 
      isNaN(coreThick) || 
      isNaN(tapeLength)
    ) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const calculatedThickness = (film + adhesive) / 1000;
    const calculatedOD = 2 * Math.sqrt(
      ((film + adhesive) / 1000 * tapeLength * 1000) / 3.14 + 
      Math.pow(coreDia / 2 + coreThick, 2)
    );

    setResults({
      thickness: calculatedThickness.toFixed(3),
      outerDiameter: calculatedOD.toFixed(3)
    });
  };

  return (
    <div className="relative w-full bg-gray-50">
          {/* Background Pattern */}
    <div
        className="absolute inset-0 opacity-5"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            zIndex: 1, // Ensure the background is below other content
        }}
    ></div>

    {/* WhatsApp Button */}
    <WhatsAppButton />
    
    {/* Banner Images */}
    {banners.map((banner, index) => (
        <div
            key={index}
            className="banner-background relative z-0" // Lower z-index to stay below other content
            title={banner.imgTitle}
            aria-label={banner.imgTitle}
            role="img"
        >
            <style>
                {`
                    .banner-background {
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        position: relative;
                        background-image: url(/api/image/download/${banner.photo});
                    }
                `}
            </style>
            <div className="flex justify-center items-center h-[30vh] mb-10">
                <h1 className="font-bold text-white text-5xl z-10">{banner.title}</h1>
                <div className="absolute inset-0 bg-black opacity-40 z-1"></div>
            </div>
        </div>
    ))}
    <div className="max-w-6xl mx-auto p-8 relative z-20 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#384b98]">
        Tape Outer Diameter Calculator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-4">
          <div>
            <Label 
              htmlFor="filmThickness" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Film Thickness (μm)
            </Label>
            <Input
              id="filmThickness"
              type="number"
              value={formData.filmThickness}
              onChange={handleInputChange}
              placeholder="Enter film thickness"
              className="w-full py-2 px-3 border-1 border-gray-300 rounded-lg  focus:ring-2  transition-all"
            />
          </div>
          
          <div>
            <Label 
              htmlFor="adhesiveThickness" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Adhesive Thickness (μm)
            </Label>
            <Input
              id="adhesiveThickness"
              type="number"
              value={formData.adhesiveThickness}
              onChange={handleInputChange}
              placeholder="Enter adhesive thickness"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-lg focus:ring-2  transition-all"
            />
          </div>
        </div>
        
        {/* Second Column */}
        <div className="space-y-4">
          <div>
            <Label 
              htmlFor="coreDiameter" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Core Diameter (mm)
            </Label>
            <Input
              id="coreDiameter"
              type="number"
              value={formData.coreDiameter}
              onChange={handleInputChange}
              placeholder="Enter core diameter"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-lg focus:ring-2  transition-all"
            />
          </div>
          
          <div>
            <Label 
              htmlFor="coreThickness" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Core Thickness (mm)
            </Label>
            <Input
              id="coreThickness"
              type="number"
              value={formData.coreThickness}
              onChange={handleInputChange}
              placeholder="Enter core thickness"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-lg focus:ring-2  transition-all"
            />
          </div>
        </div>
        
        {/* Full Width Row */}
        <div className="md:col-span-2">
          <Label 
            htmlFor="length" 
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Length (m)
          </Label>
          <Input
            id="length"
            type="number"
            value={formData.length}
            onChange={handleInputChange}
            placeholder="Enter tape length"
            className="w-full py-2 px-3 border-2 border-gray-300 rounded-lg focus:ring-2  transition-all"
          />
        </div>
        
        {/* Calculate Button */}
        <div className="md:col-span-2 flex justify-center">
          <Button 
            onClick={calculateResults} 
            className="w-1/2 py-3 bg-[#3c509cea] text-white rounded-lg hover:bg-[#384b98] transition-colors"
          >
            Calculate
          </Button>
        </div>
        
        {/* Results Section */}
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Results</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-600">Thickness:</p>
              <p className="font-bold text-blue-600">{results.thickness} mm</p>
            </div>
            <div>
              <p className="text-gray-600">Outer Diameter:</p>
              <p className="font-bold text-blue-600">{results.outerDiameter} mm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OuterDiameter;