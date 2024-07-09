'use client';
import { useState, useEffect } from 'react';
// import Countdown from 'react-countdown-now';

function CountdownComponent() {
  // Calculate the target time (2 days from now at 9 PM)
  const targetTime = new Date();
  targetTime.setDate(targetTime.getDate() + 2);
  targetTime.setHours(21, 0, 0, 0);

  // Calculate the time difference
  const timeDifference = targetTime - new Date();

  // State to store the remaining time
  const [remainingTime, setRemainingTime] = useState(timeDifference);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(targetTime - new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // Function to format the remaining time
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div className="countdown-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',


    }} >
      <h1>Countdown Timer</h1>
      <div className="countdown">
        {remainingTime > 0 ? (
          <div className="countdown-timer">
            <span>{formatTime(remainingTime)}</span>
          </div>
        ) : (
          <div className="countdown-finished">Countdown has ended!</div>
        )}
      </div>
    </div>
  );
}

export default CountdownComponent;
