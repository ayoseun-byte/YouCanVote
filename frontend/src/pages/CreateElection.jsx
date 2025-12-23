import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import StepProgress from '../components/StepProgress';
import { 
  createElection, 
  addCandidate as addCandidateToContract,
  getElectionDetails,
  getCandidateCount,
  isCurrentUserAdmin,
  checkAdmin
} from '../utils/smartContractFun';

export default function CreateElection() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdElectionId, setCreatedElectionId] = useState(null);

  const [electionData, setElectionData] = useState({
    title: '',
    description: '',
    organization: '',
    positions: [],
    startDate: '',
    endDate: '',
  });

  const [currentPosition, setCurrentPosition] = useState({ title: '', description: '', candidates: [] });
  const [currentCandidate, setCurrentCandidate] = useState({ name: '', party: '', bio: '' });

  const steps = ['Basic Info', 'Positions', 'Candidates', 'Schedule', 'Preview'];

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addPosition = () => {
    if (currentPosition.title) {
      setElectionData({
        ...electionData,
        positions: [...electionData.positions, { ...currentPosition }],
      });
      setCurrentPosition({ title: '', description: '', candidates: [] });
    }
  };

  const addCandidate = () => {
    if (currentCandidate.name && currentPosition.title) {
      const updatedPosition = {
        ...currentPosition,
        candidates: [...currentPosition.candidates, { ...currentCandidate }],
      };
      
      // Update the position in the electionData array
      const updatedPositions = electionData.positions.map(pos => 
        pos.title === currentPosition.title ? updatedPosition : pos
      );
      
      setElectionData({
        ...electionData,
        positions: updatedPositions,
      });
      
      setCurrentPosition(updatedPosition);
      setCurrentCandidate({ name: '', party: '', bio: '' });
    }
  };

  const calculateTimeDifferences = () => {
    const now = new Date();
    const startDate = new Date(electionData.startDate);
    const endDate = new Date(electionData.endDate);
    
    // Calculate minutes from now to start
    const startDelayMinutes = Math.floor((startDate - now) / (1000 * 60));
    
    // Calculate duration in minutes
    const durationMinutes = Math.floor((endDate - startDate) / (1000 * 60));
    
    return {
      startDelayMinutes: Math.max(0, startDelayMinutes), // Ensure non-negative
      durationMinutes: Math.max(1, durationMinutes) // Ensure at least 1 minute
    };
  };

const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      if (!electionData.title || !electionData.description) {
        alert('Please fill in election title and description');
        setIsSubmitting(false);
        return;
      }

      if (electionData.positions.length === 0) {
        alert('Please add at least one position');
        setIsSubmitting(false);
        return;
      }

      if (!electionData.startDate || !electionData.endDate) {
        alert('Please set start and end dates');
        setIsSubmitting(false);
        return;
      }

      // Calculate time parameters
      const { startDelayMinutes, durationMinutes } = calculateTimeDifferences();

      // Create full description with organization info
      const fullDescription = electionData.organization 
        ? `${electionData.description} | Organization: ${electionData.organization}`
        : electionData.description;

      console.log('Creating election with params:', {
        title: electionData.title,
        description: fullDescription,
        durationMinutes,
        startDelayMinutes
      });

      // Step 1: Create the election on the blockchain
      const result = await createElection(
        electionData.title,
        fullDescription,
        durationMinutes,
        startDelayMinutes
      );

      console.log('Election created:', result);

      const electionId = result.electionId;
      setCreatedElectionId(electionId);

      // Step 2: Add all candidates for all positions
      // Since the contract treats each candidate as part of a single election,
      // we'll add all candidates with their position info in the name
      for (const position of electionData.positions) {
        if (position.candidates && position.candidates.length > 0) {
          for (const candidate of position.candidates) {
            // Format: "Position: Name (Party)" or "Position: Name"
            const candidateName = candidate.party 
              ? `${position.title}: ${candidate.name} (${candidate.party})`
              : `${position.title}: ${candidate.name}`;
            
            console.log(`Adding candidate: ${candidateName} to election ${electionId}`);
            
            // Use the renamed import here
            await addCandidateToContract(electionId, candidateName);
            
            // Small delay between transactions to avoid nonce issues
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      alert(`Election created successfully! Election ID: ${electionId}`);
      
      // Navigate to admin page or election details
      navigate('/admin');
      
    } catch (err) {
      console.error('Error creating election:', err);
      alert(`Error creating election: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Create New Election</h1>
          <p className="text-slate-600">Follow the steps to set up your election</p>
        </div>

        <StepProgress steps={steps} currentStep={currentStep} />

        <div className="card min-h-[400px]">
          <AnimatePresence mode="wait" custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800">Basic Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Election Title *
                    </label>
                    <input
                      type="text"
                      value={electionData.title}
                      onChange={(e) => setElectionData({ ...electionData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., Student Council Elections 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={electionData.description}
                      onChange={(e) => setElectionData({ ...electionData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows="4"
                      placeholder="Describe the purpose and details of this election"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      value={electionData.organization}
                      onChange={(e) => setElectionData({ ...electionData, organization: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., Springfield High School"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800">Add Positions</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Position Title *
                      </label>
                      <input
                        type="text"
                        value={currentPosition.title}
                        onChange={(e) => setCurrentPosition({ ...currentPosition, title: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., President"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={currentPosition.description}
                        onChange={(e) => setCurrentPosition({ ...currentPosition, description: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        rows="2"
                        placeholder="Brief description of the position"
                      />
                    </div>
                    <Button onClick={addPosition} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span className='text-green-600'>Add Position</span>
                    </Button>
                  </div>

                  {electionData.positions.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h3 className="font-semibold text-navy-800">Added Positions:</h3>
                      {electionData.positions.map((pos, index) => (
                        <div key={index} className="flex justify-between items-center bg-slate-100 p-3 rounded-lg">
                          <span className="font-medium">{pos.title}</span>
                          <button
                            onClick={() => {
                              const newPositions = electionData.positions.filter((_, i) => i !== index);
                              setElectionData({ ...electionData, positions: newPositions });
                            }}
                            className="text-red-500 hover:text-red-700 "
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800">Add Candidates</h2>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Select Position *
                    </label>
                    <select
                      value={currentPosition.title}
                      onChange={(e) => {
                        const selected = electionData.positions.find(p => p.title === e.target.value);
                        if (selected) setCurrentPosition(selected);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Choose a position</option>
                      {electionData.positions.map((pos, index) => (
                        <option key={index} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                  </div>

                  {currentPosition.title && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Candidate Name *
                        </label>
                        <input
                          type="text"
                          value={currentCandidate.name}
                          onChange={(e) => setCurrentCandidate({ ...currentCandidate, name: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="e.g., John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Party/Affiliation
                        </label>
                        <input
                          type="text"
                          value={currentCandidate.party}
                          onChange={(e) => setCurrentCandidate({ ...currentCandidate, party: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={currentCandidate.bio}
                          onChange={(e) => setCurrentCandidate({ ...currentCandidate, bio: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          rows="2"
                          placeholder="Brief biography"
                        />
                      </div>
                      <Button onClick={addCandidate} className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span className='text-green-600'>Add Candidate</span>
                      </Button>

                      {currentPosition.candidates?.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-semibold text-navy-800">Candidates for {currentPosition.title}:</h4>
                          {currentPosition.candidates.map((cand, index) => (
                            <div key={index} className="bg-slate-100 p-3 rounded-lg">
                              <div className="font-medium">{cand.name}</div>
                              {cand.party && <div className="text-sm text-slate-600">{cand.party}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800">Schedule Election</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Start Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        value={electionData.startDate}
                        onChange={(e) => setElectionData({ ...electionData, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        End Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        value={electionData.endDate}
                        onChange={(e) => setElectionData({ ...electionData, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <p className="text-teal-800">
                      The election will be accessible to voters between the start and end times you specify.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800">Preview & Confirm</h2>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-navy-800 mb-2">Election Details</h3>
                      <p className="text-lg font-semibold">{electionData.title}</p>
                      <p className="text-slate-600">{electionData.description}</p>
                      <p className="text-sm text-slate-500 mt-2">{electionData.organization}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-navy-800 mb-2">Positions ({electionData.positions.length})</h3>
                      <ul className="space-y-2">
                        {electionData.positions.map((pos, index) => (
                          <li key={index} className="flex justify-between">
                            <span className="font-medium">{pos.title}</span>
                            <span className="text-slate-600">{pos.candidates?.length || 0} candidates</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-bold text-navy-800 mb-2">Schedule</h3>
                      <p className="text-slate-600">
                        {electionData.startDate && electionData.endDate
                          ? `${new Date(electionData.startDate).toLocaleString()} - ${new Date(electionData.endDate).toLocaleString()}`
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className='text-green-600'>Previous</span>
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <span className='text-green-600'>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='text-green-600'
              >
                {isSubmitting ? 'Creating Election...' : 'Create Election'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}