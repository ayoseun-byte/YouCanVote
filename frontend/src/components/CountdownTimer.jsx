import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ initialSeconds = 60, onComplete }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex items-center justify-center space-x-2 text-slate-600">
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg">
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </span>
    </div>
  );
}
