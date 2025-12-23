import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Download, Share2, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import VoteBar from '../components/VoteBar';
import WinnerModal from '../components/WinnerModal';
import Button from '../components/Button';

export default function FinalResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const finalResults = {
    President: [
      { name: 'Sarah Johnson', votes: 456, winner: true },
      { name: 'Michael Chen', votes: 398 },
      { name: 'Emma Davis', votes: 289 },
    ],
    'Vice President': [
      { name: 'James Wilson', votes: 612, winner: true },
      { name: 'Olivia Martinez', votes: 531 },
    ],
    Secretary: [
      { name: 'Sophia Anderson', votes: 423, winner: true },
      { name: 'Ryan Thompson', votes: 389 },
      { name: 'David Lee', votes: 331 },
    ],
  };

  const totalVotes = 1143;
  const totalVoters = 1250;
  const turnout = ((totalVotes / totalVoters) * 100).toFixed(1);

  const handleWinnerClick = (position, winner) => {
    setSelectedWinner({ position, winner });
    setShowWinnerModal(true);
  };

  const handleDownload = () => {
    alert('Results PDF downloaded successfully!');
  };

  const handleShare = () => {
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-50">
   

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-block mb-4"
            >
              <div className="bg-linear-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl shadow-2xl">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold text-navy-900 mb-2">Final Results</h1>
            <p className="text-xl text-slate-600">Student Council Elections 2025</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="card text-center"
            >
              <p className="text-4xl font-bold text-navy-800 mb-2">{totalVotes}</p>
              <p className="text-slate-600">Total Votes</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="card text-center"
            >
              <p className="text-4xl font-bold text-teal-600 mb-2">{turnout}%</p>
              <p className="text-slate-600">Voter Turnout</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="card text-center"
            >
              <p className="text-4xl font-bold text-green-600 mb-2">
                {Object.keys(finalResults).length}
              </p>
              <p className="text-slate-600">Positions Filled</p>
            </motion.div>
          </div>

          {Object.entries(finalResults).map(([position, candidates], index) => {
            const totalPositionVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
            const winner = candidates.find((c) => c.winner);

            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="card"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-navy-800">{position}</h2>
                  {winner && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWinnerClick(position, winner)}
                      className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold"
                    >
                      <Trophy className="w-5 h-5" />
                      <span>View Winner</span>
                    </motion.button>
                  )}
                </div>
                <div className="space-y-4">
                  {candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate) => (
                      <div key={candidate.name} className="relative">
                        <VoteBar
                          candidate={candidate.name}
                          votes={candidate.votes}
                          totalVotes={totalPositionVotes}
                        />
                        {candidate.winner && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute right-0 top-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                          >
                            <Trophy className="w-3 h-3" />
                            <span>WINNER</span>
                          </motion.div>
                        )}
                      </div>
                    ))}
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Results</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Results</span>
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <p className="text-green-800 font-medium">
              Election completed successfully! Thank you to all voters for participating in this democratic process.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {selectedWinner && (
        <WinnerModal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          winner={selectedWinner.winner}
          position={selectedWinner.position}
        />
      )}
    </div>
  );
}
