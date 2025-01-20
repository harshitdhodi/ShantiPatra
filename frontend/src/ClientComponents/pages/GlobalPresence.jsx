import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import SplashScreen from './Splashscreen';

const GlobalPresenceClient = () => {
    const mapRef = useRef(); // Reference for the MapContainer
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [countries, setCountries] = useState([]);
    const [logos, setLogos] = useState([]);
    const [banners, setBanners] = useState([]);
    const position = [40.7128, -74.006];
    const [loading, setLoading] = useState(true);

    const createCustomIcon = (icon) => {
        return L.divIcon({
            html: ReactDOMServer.renderToString(icon),
            iconSize: [32, 32],
            className: "",
        });
    };

    const handleSplashEnd = () => {
        setIsSplashVisible(false);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("/api/globalpresence/countries");
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        const fetchLogos = async () => {
            try {
                const response = await axios.get("/api/globalpresence/globalPresenceEntries");
                setLogos(response.data);
            } catch (error) {
                console.error("Error fetching logos:", error);
            }
        };

        fetchCountries();
        fetchLogos();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/banner/getBannersBySectionGlobal', { withCredentials: true });
            setBanners(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Resize map on load
    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            setTimeout(() => {
                map.invalidateSize(); // Ensures the map resizes correctly
            }, 100); // Delay to allow the map to load
        }
    }, [isSplashVisible]);

    const MapEvents = () => {
        const map = useMap();
        mapRef.current = map; // Set map reference
        return null;
    };
    const indiaPosition = [20.5937, 78.9629]; 
    return (
        <div className="bg-gray-50 min-h-screen -mb-8">
            {/* Splash Screen */}
            <SplashScreen onTransitionEnd={handleSplashEnd} isVisible={isSplashVisible} />

            {/* Banner Section */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className="relative bg-cover bg-center bg-no-repeat h-[30vh] flex items-center justify-center"
                    style={{
                        backgroundImage: `url(/api/image/download/${banner.photo})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <h1
                        className="relative font-bold text-white text-5xl z-10 text-center px-4"
                        dangerouslySetInnerHTML={{ __html: banner.details }}
                    ></h1>
                </div>
            ))}

            {/* Map Section */}
            <div className="w-full mx-auto p-8">
            <MapContainer
    style={{ height: "500px", width: "100%" }}
    center={indiaPosition}  // Set default center to India
    scrollWheelZoom={false}
    zoom={5}  // Adjust zoom level to show India's coverage
    className="mb-5 shadow-lg border border-gray-300"
>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
    />

    {logos.map((logo) => {
        const country = countries.find((c) => c.name === logo.country);
        return (
            country && (
                <Marker
                    key={logo._id}
                    position={country.latlng}
                    icon={createCustomIcon(
                        <FaMapMarkerAlt size={32} color="red" />
                    )}
                >
                    <Popup minWidth={150} className="text-sm">
                        <img
                            src={`/api/logo/download/${logo.photo}`}
                            alt={logo.alt}
                            className="w-24 h-18 mt-4 object-contain mx-auto"
                        />
                        <p className="font-semibold font-serif text-center mt-2">
                            {logo.country}
                        </p>
                        <p className="text-center">{logo.description}</p>
                    </Popup>
                    <MapEvents />
                </Marker>
            )
        );
    })}
</MapContainer>
            </div>
        </div>
    );
};

export default GlobalPresenceClient;
