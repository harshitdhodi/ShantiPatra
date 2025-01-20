import React, { useState, useEffect } from 'react'
// import Flexible from "../assets/process.png"
// import Safe from "../assets/leaf.png"
// import Customer from "../assets/coworking.png"
// import Economy from "../assets/economic.png"
// import Quality from "../assets/quality-service.png"
import axios from 'axios'

// const data = [
//     {
//         imgSrc: Flexible,
//         title: "Customization and flexibility",
//     },
//     {
//         imgSrc: Safe,
//         title: "Made From 100% Food Safe Material",
//     },
//     {
//         imgSrc: Customer,
//         title: "Customer-Centric Approach",
//     },
//     {
//         imgSrc: Economy,
//         title: "Economical",
//     },
//     {
//         imgSrc: Quality,
//         title: "Quality Excellence",
//     },
// ];

function WhyChooseUs() {

    const [whuChooseUs, setWhyChooseUs] = useState([])

    useEffect(() => {
        const fetchWhyChooseUs = async () => {
            try {
                const response = await axios.get("/api/whychooseus/getAllWhyChooseUs", { withCredentials: true });
                setWhyChooseUs(response.data);

            } catch (err) {
                console.error(err.message);

            }
        };
        fetchWhyChooseUs();
    }, []);

    return (
        <div className='flex flex-col '>
            <div className="flex items-center justify-center  p-0 lg:px-[5rem] xl:px-[15rem] ">
                <p className="text-2xl leading-[4rem] md:text-3xl md:leading-[5rem] lg:text-4xl lg:leading-[5rem] xl:text-4xl xl:leading-[5rem] text-center font-bold text-transparent bg-clip-text bg-[url('https://images.pexels.com/photos/5908654/pexels-photo-5908654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-left font-cursive bg-fixed">
                    Why Choose Us?
                </p>
            </div>
            <div className='p-8 flex flex-col justify-center items-center'>
                <div className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 xl:gap-14 md:px-2 mb-8'>
                    {whuChooseUs.map((item, index) => (
                        <div key={index} className={`flex flex-col justify-center items-center w-[5cm] h-[5cm] border-[3px] rounded-md  ${index % 2 === 0 ? " [border-image:linear-gradient(45deg,_white,_#1e3a8a)_1] " : " [border-image:linear-gradient(45deg,_#1e3a8a,_white)_1] "}`}>
                            <img src={`/api/image/download/${item.photo[0]}`} alt={item.alt} title={item.imgTitle} className='w-[3cm] h-[3cm] m-2' />
                            <p className='capitalize text-center text-black '>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default WhyChooseUs
