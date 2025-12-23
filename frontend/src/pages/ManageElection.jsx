import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, StopCircle, Eye, Users, BarChart3, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import LiveIndicator from '../components/LiveIndicator';

export default function ManageElection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const election = {
    id: id,
    title: 'Student Council Elections 2025',
    description: 'Annual student council elections for all positions',
    code: 'VOTE2025',
    status: 'live',
    startDate: '2025-12-15',
    endDate: '2025-12-20',
    totalVoters: 1250,
    votedCount: 543,
    liveViewers: 45,
    positions: [
      { title: 'President', candidates: 3 },
      { title: 'Vice President', candidates: 2 },
      { title: 'Secretary', candidates: 4 },
    ],
  };

  const copyElectionCode = () => {
    navigator.clipboard.writeText(election.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = () => {
    alert('Election published and voters notified!');
  };

  const handlePause = () => {
    alert('Election paused temporarily');
  };

  const handleClose = () => {
    if (confirm('Are you sure you want to close this election? This action cannot be undone.')) {
      alert('Election closed successfully');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
    

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-navy-900 mb-2">{election.title}</h1>
              <p className="text-slate-600">{election.description}</p>
            </div>
            {election.status === 'live' && <LiveIndicator viewers={election.liveViewers} />}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-800">{election.votedCount}</p>
                  <p className="text-sm text-slate-600">Total Votes</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {((election.votedCount / election.totalVoters) * 100).toFixed(1)}% turnout
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="card"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-navy-100 p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-navy-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-800">{election.liveViewers}</p>
                  <p className="text-sm text-slate-600">Live Viewers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="card"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy-800">{election.positions.length}</p>
                  <p className="text-sm text-slate-600">Positions</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Election Code</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-slate-100 px-6 py-4 rounded-lg">
                <p className="text-3xl font-mono font-bold text-center text-navy-800">
                  {election.code}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={copyElectionCode}
                className="flex items-center space-x-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Share this code with voters to access the election
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Positions & Candidates</h2>
            <div className="space-y-3">
              {election.positions.map((position, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-50 p-4 rounded-lg"
                >
                  <span className="font-semibold text-navy-800">{position.title}</span>
                  <span className="text-slate-600">{position.candidates} candidates</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">Admin Actions</h2>
            <div className="flex flex-wrap gap-4">
              {election.status === 'draft' && (
                <Button
                  variant="secondary"
                  onClick={handlePublish}
                  className="flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Publish Election</span>
                </Button>
              )}

              {election.status === 'live' && (
                <>
                  <Button
                    variant="outline"
                    onClick={handlePause}
                    className="flex items-center space-x-2"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause Election</span>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/results/live/${election.id}`)}
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>View Live Results</span>
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={handleClose}
                className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50"
              >
                <StopCircle className="w-5 h-5" />
                <span>Close Election</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
