import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import LiveIndicator from '../components/LiveIndicator';
import VoteBar from '../components/VoteBar';
import Button from '../components/Button';

export default function LiveResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState({
    President: [
      { name: 'Sarah Johnson', votes: 245 },
      { name: 'Michael Chen', votes: 198 },
      { name: 'Emma Davis', votes: 100 },
    ],
    'Vice President': [
      { name: 'James Wilson', votes: 312 },
      { name: 'Olivia Martinez', votes: 231 },
    ],
    Secretary: [
      { name: 'David Lee', votes: 156 },
      { name: 'Sophia Anderson', votes: 204 },
      { name: 'Ryan Thompson', votes: 183 },
    ],
  });

  const [activeVoters, setActiveVoters] = useState(45);
  const [totalVotes, setTotalVotes] = useState(543);

  useEffect(() => {
    const interval = setInterval(() => {
      setResults((prev) => {
        const newResults = { ...prev };
        Object.keys(newResults).forEach((position) => {
          const randomIndex = Math.floor(Math.random() * newResults[position].length);
          if (Math.random() > 0.5) {
            newResults[position][randomIndex].votes += 1;
          }
        });
        return newResults;
      });

      setActiveVoters((prev) => Math.max(20, prev + Math.floor(Math.random() * 10 - 5)));
      setTotalVotes((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50">
   

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(`/admin/election/${id}`)}
          className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Management</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-navy-900 mb-2">Live Results</h1>
              <p className="text-slate-600">Real-time vote counting in progress</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <LiveIndicator viewers={activeVoters} />
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card bg-gradient-to-r from-teal-50 to-navy-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-4 rounded-full">
                  <Users className="w-8 h-8 text-navy-600" />
                </div>
                <div>
                  <motion.p
                    key={totalVotes}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-navy-800"
                  >
                    {totalVotes}
                  </motion.p>
                  <p className="text-slate-600">Total Votes Cast</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-600">{activeVoters}</p>
                <p className="text-sm text-slate-600">Active Voters</p>
              </div>
            </div>
          </motion.div>

          {Object.entries(results).map(([position, candidates], index) => {
            const totalPositionVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-navy-800 mb-6">{position}</h2>
                <div className="space-y-4">
                  {candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate) => (
                      <VoteBar
                        key={candidate.name}
                        candidate={candidate.name}
                        votes={candidate.votes}
                        totalVotes={totalPositionVotes}
                        isLive={true}
                      />
                    ))}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-navy-50 border border-navy-200 rounded-lg p-4 text-center"
          >
            <p className="text-sm text-navy-800">
              Results are updating in real-time. Final results will be available after the election closes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
