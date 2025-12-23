import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="inline-block mb-8"
        >
          <Search className="w-32 h-32 text-slate-300" />
        </motion.div>

        <h1 className="text-9xl font-bold text-navy-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-navy-800 mb-4">Page Not Found</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button
          variant="primary"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 mx-auto text-lg px-8 py-4"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>
      </motion.div>
    </div>
  );
}
