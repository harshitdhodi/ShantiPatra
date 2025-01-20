import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const OurStrength = () => {
  const [strengths, setStrengths] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStrengthPoints = async () => {
      try {
        const response = await axios.get('/api/strengthPoint/getstrengthPoint');
        setStrengths(Array.isArray(response.data.data) ? response.data.data : []); // Access data array within response
      } catch (error) {
        console.error('Error fetching strength points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrengthPoints();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div className="w-full pb-12  p-8">
      <div className="max-w-[85rem] shadow-lg shadow-black/20 bg-gray-100 px-10 py-5 mx-auto border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
          <span className='border-b-2 border-blue-900'>OUR STRENGTH</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 ">
          {strengths.map((strength) => (
            <div key={strength._id} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-[#fab700] mt-1 flex-shrink-0" />
              <span className="text-gray-900">{strength.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStrength;
