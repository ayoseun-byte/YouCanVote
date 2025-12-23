import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function PositionCard({ position, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card cursor-pointer hover:shadow-xl"
      onClick={() => onSelect(position)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-teal-100 p-2 rounded-lg">
          <Briefcase className="w-5 h-5 text-teal-600" />
        </div>
        <h3 className="text-lg font-bold text-navy-800">{position.title}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-3">{position.description}</p>
      <div className="text-xs text-slate-500">
        {position.candidates?.length || 0} candidate(s)
      </div>
    </motion.div>
  );
}
