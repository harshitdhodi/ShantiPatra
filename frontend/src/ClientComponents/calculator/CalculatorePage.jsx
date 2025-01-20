import React from "react";
import calc1 from "../../assets/wightCalc.jpg";
import calc2 from "../../assets/outerDiaCalc.jpg";
import { Link } from "react-router-dom";

const CalculatorPage = () => {
    return (
        <div className="bg-gray-100 py-12">
            {/* Sticky Title Section */}
            <div className=" bg-gray-100 py-4 z-30">
                <div className="text-center">
                    <h1 className="lg:text-4xl text-3xl xl:text-5xl text-[#384b98] font-bold mb-4">Calculator</h1>
                    <p className="text-lg text-gray-600">
                        Calculate the Outer Diameter and the Weight of the product through these calculators.
                        The value derived from it should be used for estimates and not for exact measurements.
                    </p>
                </div>
            </div>

            {/* Calculator Cards Section */}
            <div className="md:flex px-5 sm:px-0 justify-center mt-12 space-x-10">
                {/* Weight Calculator Card */}
                <Link to="/weight-calc" className="z-10">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm relative transition transform hover:scale-105 hover:shadow-lg duration-300 hover:z-20">
                        <img
                            src={calc1}
                            alt="Weight Calculator"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-center text-gray-800 group-hover:text-blue-500">
                            Weight Calculator
                        </h2>
                    </div>
                </Link>

                {/* Outer Diameter Calculator Card */}
                <Link to="/outer-dia-calc" className="z-10">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm relative transition transform hover:scale-105 hover:shadow-lg duration-300 hover:z-20">
                        <img
                            src={calc2}
                            alt="Outer Diameter Calculator"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-center text-gray-800 group-hover:text-blue-500">
                            Outer Dia Calculator
                        </h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CalculatorPage;
