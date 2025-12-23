import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Vote } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export default function Choose() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What would you like to do?
          </h1>
          <p className="text-gray-600 text-lg">
            Create your own election or join an existing one
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -6 }}
            onClick={() => navigate('/admin')}
            className="card hover:shadow-xl transition-all cursor-pointer group border"
          >
            <div className="flex flex-col h-full">
              {/* <Plus className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" /> */}
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-left">
                Create Election
              </h2>
              <p className="text-gray-600 text-left flex-1 mb-4">
                Set up a new election, add positions and candidates, and manage the voting process.
              </p>
              <div className="text-emerald-600 font-semibold text-left">
                Get Started →
              </div>
            </div>
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileHover={{ y: -6 }}
            onClick={() => navigate('/join')}
            className="card hover:shadow-xl transition-all cursor-pointer group border"
          >
            <div className="flex flex-col h-full">
              {/* <Vote className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" /> */}
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-left">
                Join Election
              </h2>
              <p className="text-gray-600 text-left flex-1 mb-4">
                Participate in an election using a public code or your organization credentials.
              </p>
              <div className="text-emerald-600 font-semibold text-left">
                Join Now →
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
