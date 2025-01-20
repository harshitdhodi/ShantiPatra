import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Counter2 = () => {
  const [counts, setCounts] = useState([]); // Original count data
  const [animatedCounts, setAnimatedCounts] = useState([]); // State for animated values
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Helper function to parse numbers with "K" suffix
  const parseNumber = (value) => {
    if (typeof value === 'string' && value.endsWith('K')) {
      return parseFloat(value) * 1000;
    }
    return parseFloat(value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axios.get('/api/counter/getCounters');
        setCounts(response.data);
        setAnimatedCounts(response.data.map(count => ({ ...count, animatedValue: 0 }))); // Initialize animated values
      } catch (error) {
        console.error('Error fetching counter data:', error);
      }
    };

    fetchCounters();
  }, []);

  useEffect(() => {
    if (!isVisible || counts.length === 0) return;

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    // Pre-calculate increment values using parsed numbers
    const incrementValues = counts.map(count => (parseNumber(count.no) / steps));
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedCounts(prevCounts =>
          prevCounts.map((count, index) => {
            const newValue = Math.min(Math.round(incrementValues[index] * (currentStep + 1)), parseNumber(count.no));
            return { ...count, animatedValue: newValue };
          })
        );
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, counts]);

  // Helper to format the animated value without showing .0
  const formatValue = (value) => {
    if (value >= 1000) {
      const formatted = (value / 1000).toFixed(1);
      return formatted.endsWith('.0') ? `${parseInt(formatted)}K` : `${formatted}K`;
    }
    return value;
  };

  return (
    <div ref={counterRef} className="w-full max-w-[87rem] mx-auto p-6 px-10 xl:px-0 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {animatedCounts.map((stat) => (
          <div
            key={stat._id}
            className="bg-white rounded-lg p-6 text-center transform transition-transform duration-500 hover:scale-105"
            style={{
              boxShadow: '0 4px 8px rgba(231, 201, 126, 0.5), 0 3px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex justify-center mb-4">
              <img src={`/api/logo/download/${stat.photo}`} alt={stat.alt} className="h-12 w-12" />
            </div>
            <div className="text-4xl font-bold text-black mb-2">
              {formatValue(stat.animatedValue)}{stat.sign}
            </div>
            <div className="text-gray-500 text-lg font-medium">
              {stat.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter2;
