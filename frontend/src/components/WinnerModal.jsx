import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from './Modal';

export default function WinnerModal({ isOpen, onClose, winner, position }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
      }));
      setConfetti(pieces);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Election Results">
      <div className="relative overflow-hidden">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ y: -20, x: piece.x, opacity: 1 }}
            animate={{ y: 400, opacity: 0 }}
            transition={{ duration: piece.duration, delay: piece.delay }}
            className="absolute"
            style={{ left: `${piece.x}%` }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-full">
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <h3 className="text-3xl font-bold text-navy-800 mb-2">Winner!</h3>
          <p className="text-slate-600 mb-6">{position}</p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-teal-50 to-navy-50 p-6 rounded-xl"
          >
            <p className="text-2xl font-bold text-navy-800 mb-2">{winner.name}</p>
            <p className="text-lg text-teal-600 font-semibold">{winner.votes} votes</p>
          </motion.div>
        </motion.div>
      </div>
    </Modal>
  );
}
