import React, { useState, useEffect } from 'react';
import './CSS/HandwrittenClock.css';

const HandwrittenClock = ({ folder = "letters", delay = 200, count = 9 }) => {
  const [time, setTime] = useState(new Date());
  const [frameIndex, setFrameIndex] = useState(0); // Controls animation cycle

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cycle through images every "delay" milliseconds (e.g., 200ms per frame)
    const frameInterval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % count);
    }, delay);

    return () => {
      clearInterval(timeInterval);
      clearInterval(frameInterval);
    };
  }, [delay, count]);

  // Convert time to "HH:MM:SS AM/PM" format
  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'P' : 'A';

    hours = hours % 12 || 12; // Convert 0 -> 12-hour format

    return [
      hours.toString().padStart(2, '0')[0], // First digit of hours
      hours.toString().padStart(2, '0')[1], // Second digit of hours
      ":",                                  // Separator
      minutes.toString().padStart(2, '0')[0], // First digit of minutes
      minutes.toString().padStart(2, '0')[1], // Second digit of minutes
      ":",                                  // Separator for seconds
      seconds.toString().padStart(2, '0')[0], // First digit of seconds
      seconds.toString().padStart(2, '0')[1], // Second digit of seconds
      ampm,                                 // AM/PM
      "M"
    ];
  };

  const timeDigits = formatTime();

  return (
    <div className="circle-video-heading-container">
      {timeDigits.map((char, index) => (
        <div key={index} className="circle-video">
          <img 
            src={`${folder}/${char}/${frameIndex + 1}.svg`} 
            alt={char} 
          />
        </div>
      ))}
    </div>
  );
};

export default HandwrittenClock;
