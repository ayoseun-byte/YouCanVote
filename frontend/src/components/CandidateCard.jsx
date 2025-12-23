import { motion } from 'framer-motion';
import { User, CheckCircle } from 'lucide-react';

export default function CandidateCard({ candidate, onSelect, selected, votingMode = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={votingMode ? { scale: 0.98 } : {}}
      className={`card cursor-pointer relative transition-all ${
        selected ? 'ring-4 ring-teal-500 bg-teal-50' : 'hover:shadow-2xl'
      }`}
      onClick={() => votingMode && onSelect(candidate)}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4"
        >
          <CheckCircle className="w-8 h-8 text-teal-600" />
        </motion.div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-navy-100 p-4 rounded-full">
          <User className="w-8 h-8 text-navy-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy-800">{candidate.name}</h3>
          {candidate.party && (
            <p className="text-sm text-slate-600">{candidate.party}</p>
          )}
        </div>
      </div>

      {candidate.bio && (
        <p className="text-slate-600 text-sm">{candidate.bio}</p>
      )}
    </motion.div>
  );
}
