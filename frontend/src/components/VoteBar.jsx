import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function VoteBar({ candidate, votes, totalVotes, isLive = false }) {
  const [displayVotes, setDisplayVotes] = useState(0);
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  useEffect(() => {
    let start = displayVotes;
    let end = votes;
    let duration = 500;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      setDisplayVotes(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [votes]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-navy-800">{candidate}</span>
        <div className="flex items-center space-x-2">
          <motion.span
            key={displayVotes}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-bold text-teal-600"
          >
            {displayVotes}
          </motion.span>
          <span className="text-slate-600 text-sm">({percentage.toFixed(1)}%)</span>
          {isLive && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full"
        />
      </div>
    </div>
  );
}
