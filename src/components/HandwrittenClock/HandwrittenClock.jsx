import React, { useState, useEffect } from 'react';
import './CSS/HandwrittenClock.css';

const HandwrittenClock = ({
  folder,       // e.g. "letters/0"
  title,
  description,
  delay = 2000, // delay in milliseconds, default 2000ms (2 seconds)
  count = 9     // number of images in the folder
}) => {
  // Generate an array of image URLs (e.g. letters/0/1.svg ... letters/0/9.svg)
  const images = Array.from({ length: count }, (_, index) => `${folder}/${index + 1}.svg`);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, delay);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [delay, images.length]);

  return (
    <div className="circle-video-heading-container">
      <div className="circle-video">
        <img src={images[currentIndex]} alt={title} />
      </div>
      <div className="text-content">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HandwrittenClock;

