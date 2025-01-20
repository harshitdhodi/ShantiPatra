import React, { useState, useEffect } from 'react';
import { Card } from "./Card";
import { Input } from "./Input";
import { Button } from "./Button";
import { Label } from "./Label";
import WhatsAppButton from '../Whatsapp';
import axios from "axios";

const WeightCalculator = () => {
    const [length, setLength] = useState();
    const [width, setWidth] = useState();
    const [filmThickness, setFilmThickness] = useState();
    const [adhesiveThickness, setAdhesiveThickness] = useState();
    const [coreThickness, setCoreThickness] = useState();
    const [coreID, setCoreID] = useState();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false); // Added state for loading
    const [results, setResults] = useState({
        coreWeight: { value: '0.00', margin: '0.00' },
        netWeight: { value: '0.00', margin: '0.00' },
        grossWeight: { value: '0.00', margin: '0.00' }
    });

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

   
  const calculateWeights = () => {
    // Core Weight calculation
    const coreWeight = 30 * (coreThickness / 3) * (width / 48) * (coreID / 76)
    
    // Net Weight calculation
    const netWeight = ((filmThickness * 0.905) + (adhesiveThickness * 1.05)) * width * length / 1000
    
    // Gross Weight calculation
    const grossWeight = coreWeight + netWeight

    setResults({
      coreWeight: {
        value: coreWeight.toFixed(2),
        margin: (coreWeight * 0.01).toFixed(2)
      },
      netWeight: {
        value: netWeight.toFixed(2),
        margin: (netWeight * 0.01).toFixed(2)
      },
      grossWeight: {
        value: grossWeight.toFixed(2),
        margin: (grossWeight * 0.01).toFixed(2)
      }
    })
  }

    return (
        <div className="relative w-full pb-10 bg-gray-50">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    zIndex: 1,
                }}
            ></div>

            {/* WhatsApp Button */}
            <WhatsAppButton />

            {/* Banner Images */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className="banner-background relative z-0"
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

            {/* Calculator Card */}
            <Card className="w-full max-w-4xl mx-auto p-6 relative z-20">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#384b98] mb-4">Weight Calculator</h1>
                    <p className="text-gray-600">
                        With the easy-to-use Weight Calculator quickly find the weight in grams of a roll by entering outside length,
                        width, film, adhesive and core thickness, and core ID.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="length">Length (mtr)</Label>
                        <Input
                            id="length"
                            type="number"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="width">Width (mm)</Label>
                        <Input
                            id="width"
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="filmThickness">Film Thickness (μm)</Label>
                        <Input
                            id="filmThickness"
                            type="number"
                            value={filmThickness}
                            onChange={(e) => setFilmThickness(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="adhesiveThickness">Adhesive Thickness (μm)</Label>
                        <Input
                            id="adhesiveThickness"
                            type="number"
                            value={adhesiveThickness}
                            onChange={(e) => setAdhesiveThickness(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coreThickness">Core Thickness (mm)</Label>
                        <Input
                            id="coreThickness"
                            type="number"
                            value={coreThickness}
                            onChange={(e) => setCoreThickness(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coreID">Core ID (mm)</Label>
                        <Input
                            id="coreID"
                            type="number"
                            value={coreID}
                            onChange={(e) => setCoreID(Number(e.target.value))}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button onClick={calculateWeights} className="bg-[#384b98ec] w-1/2 hover:bg-[#384b98]">
                        Calculate
                    </Button>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-6">Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Core Weight (gms)</Label>
                            <div className="flex gap-3">
                                <Input value={results.coreWeight.value} readOnly />
                                <div className="w-12 flex items-center justify-center border rounded-md bg-gray-50">±</div>
                                <Input className="w-20" value={results.coreWeight.margin} readOnly />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Net Weight (gms)</Label>
                            <div className="flex gap-3">
                                <Input value={results.netWeight.value} readOnly />
                                <div className="w-12 flex items-center justify-center border rounded-md bg-gray-50">±</div>
                                <Input className="w-20" value={results.netWeight.margin} readOnly />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Gross Weight (gms)</Label>
                            <div className="flex gap-3">
                                <Input value={results.grossWeight.value} readOnly />
                                <div className="w-12 flex items-center justify-center border rounded-md bg-gray-50">±</div>
                                <Input className="w-20" value={results.grossWeight.margin} readOnly />
                            </div>
                        </div>
                    </div>
                </div>

            </Card>
        </div>
    );
};

export default WeightCalculator;

