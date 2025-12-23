import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Vote, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function JoinElection() {
  const navigate = useNavigate();
  const [electionCode, setElectionCode] = useState('');
  const [organizationId, setOrganizationId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (electionCode || organizationId) {
      navigate('/verify');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
   

      <div className="max-w-md mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-br from-navy-600 to-teal-500 p-6 rounded-2xl shadow-2xl">
                <Vote className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">Join Election</h1>
            <p className="text-slate-600">Enter your election code or organization ID</p>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Election Code
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={electionCode}
                onChange={(e) => setElectionCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-4 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center text-2xl font-mono font-bold uppercase"
                placeholder="VOTE2025"
                maxLength={10}
              />
              <p className="text-xs text-slate-500 mt-2">
                Enter the code provided by your election administrator
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">OR</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Organization ID
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="w-full px-4 py-4 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="e.g., springfield-high-school"
              />
              <p className="text-xs text-slate-500 mt-2">
                Your organization's unique identifier
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={!electionCode && !organizationId}
              className="w-full flex items-center justify-center space-x-2 text-lg py-4"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-slate-600">
              Don't have a code?{' '}
              <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">
                Contact your administrator
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>


    </div>
  );
}
