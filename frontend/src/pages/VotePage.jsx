import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import PositionCard from '../components/PositionCard';
import CandidateCard from '../components/CandidateCard';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [votes, setVotes] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const election = {
    id: id,
    title: 'Student Council Elections 2025',
    positions: [
      {
        id: 1,
        title: 'President',
        description: 'Lead the student council and represent students',
        candidates: [
          { id: 1, name: 'Sarah Johnson', party: 'Progressive Alliance', bio: 'Senior class president with 3 years experience' },
          { id: 2, name: 'Michael Chen', party: 'Student Voice', bio: 'Debate team captain and honor student' },
          { id: 3, name: 'Emma Davis', party: 'Independent', bio: 'Volunteer coordinator and community leader' },
        ],
      },
      {
        id: 2,
        title: 'Vice President',
        description: 'Support the president and manage committees',
        candidates: [
          { id: 4, name: 'James Wilson', party: 'Progressive Alliance', bio: 'Class treasurer and math club president' },
          { id: 5, name: 'Olivia Martinez', party: 'Student Voice', bio: 'Drama club president and arts advocate' },
        ],
      },
      {
        id: 3,
        title: 'Secretary',
        description: 'Maintain records and communications',
        candidates: [
          { id: 6, name: 'David Lee', party: 'Independent', bio: 'Yearbook editor and writing award winner' },
          { id: 7, name: 'Sophia Anderson', party: 'Progressive Alliance', bio: 'Journalism club head and school newspaper editor' },
          { id: 8, name: 'Ryan Thompson', party: 'Student Voice', bio: 'Technology coordinator and coding club founder' },
        ],
      },
    ],
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const handleCandidateSelect = (candidate) => {
    setVotes({
      ...votes,
      [selectedPosition.id]: candidate,
    });
  };

  const handleSubmitVote = () => {
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    setShowConfirmation(false);
    setTimeout(() => {
      navigate(`/results/final/${id}`);
    }, 500);
  };

  const allPositionsVoted = election.positions.every(pos => votes[pos.id]);

  return (
    <div className="min-h-screen bg-slate-50">
    

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-navy-900 mb-2">{election.title}</h1>
          <p className="text-slate-600">Select a position to view candidates and cast your vote</p>

          <div className="mt-6 flex items-center space-x-2">
            <div className="flex-1 bg-slate-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(Object.keys(votes).length / election.positions.length) * 100}%` }}
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-slate-600">
              {Object.keys(votes).length} / {election.positions.length}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Positions</h2>
            <div className="space-y-4">
              {election.positions.map((position) => (
                <div key={position.id} className="relative">
                  <PositionCard
                    position={position}
                    onSelect={handlePositionSelect}
                  />
                  {votes[position.id] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {allPositionsVoted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Button
                  variant="secondary"
                  onClick={handleSubmitVote}
                  className="w-full flex items-center justify-center space-x-2 text-lg py-4"
                >
                  <span>Submit Vote</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedPosition ? (
                <motion.div
                  key={selectedPosition.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-navy-800">{selectedPosition.title}</h2>
                      <p className="text-slate-600">{selectedPosition.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPosition(null)}
                      className="text-slate-600 hover:text-slate-800"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedPosition.candidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onSelect={handleCandidateSelect}
                        selected={votes[selectedPosition.id]?.id === candidate.id}
                        votingMode={true}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full min-h-[400px]"
                >
                  <div className="text-center">
                    <div className="bg-slate-200 p-8 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                      <ArrowLeft className="w-16 h-16 text-slate-400" />
                    </div>
                    <p className="text-xl text-slate-600">
                      Select a position from the left to view candidates
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Your Vote"
      >
        <div className="space-y-4">
          <p className="text-slate-700">
            Please review your selections before submitting. Once submitted, you cannot change your vote.
          </p>

          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            {election.positions.map((position) => (
              votes[position.id] && (
                <div key={position.id} className="flex justify-between items-center">
                  <span className="font-medium text-navy-800">{position.title}:</span>
                  <span className="text-teal-600 font-semibold">{votes[position.id].name}</span>
                </div>
              )
            ))}
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1"
            >
              Review
            </Button>
            <Button
              variant="secondary"
              onClick={confirmSubmit}
              className="flex-1"
            >
              Confirm & Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
