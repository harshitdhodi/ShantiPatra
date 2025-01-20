import { useEffect, useState } from 'react';

const SplashScreen = ({ onTransitionEnd }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false); // Start fading out

            // Set timeout to match the transition duration for hiding the component
            setTimeout(() => {
                setIsHidden(true); // Remove from DOM
                onTransitionEnd();
            }, 1000); // Match the CSS transition duration
        },500); // Duration before starting fade-out

        return () => clearTimeout(timer);
    }, [onTransitionEnd]);

    // If the component should be hidden, don't render it
    if (isHidden) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center`}
        >
            <div className="relative w-full h-full">
                <div className={`absolute left-0 top-0 h-full bg-white transition-all duration-1000 ease-out ${isVisible ? 'w-1/4' : 'w-0'}`}></div>
                <div className={`absolute left-[25%] top-0 h-full bg-white transition-all duration-1000 ease-out ${isVisible ? 'w-1/4' : 'w-0'}`}></div>
                <div className={`absolute left-[50%] top-0 h-full bg-white transition-all duration-1000 ease-out ${isVisible ? 'w-1/4' : 'w-0'}`}></div>
                <div className={`absolute left-[75%] top-0 h-full bg-white transition-all duration-1000 ease-out ${isVisible ? 'w-1/4' : 'w-0'}`}></div>
            </div>
        </div>
    );
};

export default SplashScreen;
