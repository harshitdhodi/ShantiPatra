import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSecondTable = ({slug}) => {
  const [specifications, setSpecifications] = useState([]);

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        const response = await axios.get(`/api/boppTable/getboppTableBySlug?slug=${slug}`);
        // Map the API data to the format required for rendering
        const formattedData = response.data.map(item => ({
          width: `${item.width}m.m`,
          quantity: parseInt(item.cartonNo, 10),
        }));
        setSpecifications(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSpecifications();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-200 font-bold">
              WIDTH OF TAPE
            </th>
            {specifications.map((spec) => (
              <td key={spec.width} className="border border-gray-300 p-2 bg-gray-200">
                {spec.width}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2 bg-white font-bold">
              NOS. PER CARTON
            </td>
            {specifications.map((spec) => (
              <td key={spec.width} className="border border-gray-300 p-2 bg-white">
                {spec.quantity}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductSecondTable;
