import React, { useEffect, useState } from 'react';
import './CSS/Clock.css';

const Clock = () => {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="clock">
        <h1>{currentTime}</h1>
      </div>
    </div>
  );
};

export default Clock;
