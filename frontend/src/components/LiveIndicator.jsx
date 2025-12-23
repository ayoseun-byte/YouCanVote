import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function LiveIndicator({ viewers }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border-2 border-green-200"
    >
      <span className="flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <Activity className="w-5 h-5 text-green-600" />
      <span className="font-semibold text-green-700">LIVE</span>
      {viewers !== undefined && (
        <span className="text-green-600 text-sm">{viewers} watching</span>
      )}
    </motion.div>
  );
}
