'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TimerIcon } from 'lucide-react';

interface TrialCountdownTimerProps {
  trialEndDate: string;
}

const TrialCountdownTimer: React.FC<TrialCountdownTimerProps> = ({
  trialEndDate,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(trialEndDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if ((value as number) < 0) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-2xl font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase">{interval}</span>
      </div>
    );
  });

  if (!timerComponents.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-orange-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
    >
      <TimerIcon className="w-8 h-8" />
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Trial Period Ends In:</h3>
        <div className="flex space-x-2">{timerComponents}</div>
      </div>
    </motion.div>
  );
};

export default TrialCountdownTimer;
