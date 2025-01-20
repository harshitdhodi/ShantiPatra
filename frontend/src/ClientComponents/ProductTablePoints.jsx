import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";

const Points = ({ slug }) => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchStrappingPoint = async () => {
            try {
                const response = await fetch(`/api/strappingPoint/getStrappingPointBySlug?slug=${slug}`);
                const result = await response.json();
                setData(result[0]); 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStrappingPoint();
    }, [slug]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    const colors = data.color ? data.color.split('/').map(color => color.trim()) : [];
    const lengthInfo = data.length || "Length information not available";

    const InfoItem = ({ title, content }) => (
        <div className="mb-4 ">
            <div className="flex items-center gap-2">
               <div className='flex gap-3'>
               <div className="border bg-yellow-500 h-fit  text-white rounded-full p-1">
                    <TiTick />
                </div>
               <h3 className="text-lg font-semibold">{title}:</h3>
               <p className=" mt-1">{content}</p>
               </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl  mx-auto pt-9 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:-ml-10">
                {/* Left Section */}
                <div className="flex flex-col">
                    {data.paperCore && <InfoItem title="Paper Core" content={data.paperCore} />}
                    {colors.length > 0 && <InfoItem title="Color" content={colors.join(", ")} />}
                    {data.qty && <InfoItem title="Quantity" content={data.qty} />}
                </div>

                {/* Right Section */}
                <div className="flex flex-col">
                    {data.packing && <InfoItem title="Packing" content={data.packing} />}
                    {data.length && <InfoItem title="Length" content={lengthInfo} />}
                </div>
            </div>
        </div>
    );
};

export default Points;

