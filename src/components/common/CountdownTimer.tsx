import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-2 mb-2 font-bold text-title-md text-brand-500 dark:text-brand-400 xl:text-title-lg">
        <div className="timer-box">
          <span>{formatTime(timeLeft.days)}</span>
        </div>
        :
        <div className="timer-box">
          <span>{formatTime(timeLeft.hours)}</span>
        </div>
        :
        <div className="timer-box">
          <span>{formatTime(timeLeft.minutes)}</span>
        </div>
        :
        <div className="timer-box">
          <span>{formatTime(timeLeft.seconds)}</span>
        </div>
      </div>

      <div className="text-base text-center text-gray-500 dark:text-gray-400">
        <span className="inline-block timer-box">
          <span className="inline-block">{timeLeft.days}</span>
        </span>
        {timeLeft.days === 1 ? " day" : " days"} left
      </div>
    </div>
  );
};

export default CountdownTimer;
