import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ElectionCard from '../components/ElectionCard';
import Button from '../components/Button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const mockElections = [
    {
      id: '1',
      title: 'Student Council Elections 2025',
      description: 'Annual student council elections for all positions',
      date: 'Dec 15-20, 2025',
      voters: 1250,
      status: 'live',
      liveViewers: 45,
    },
    {
      id: '2',
      title: 'HOA Board Member Selection',
      description: 'Homeowners association board member election',
      date: 'Jan 10, 2026',
      voters: 340,
      status: 'draft',
    },
    {
      id: '3',
      title: 'Club President Elections',
      description: 'Annual club president and vice president elections',
      date: 'Nov 5-7, 2025',
      voters: 89,
      status: 'ended',
    },
  ];

  const filteredElections = mockElections.filter(
    (election) => filter === 'all' || election.status === filter
  );

  return (
    <div className="min-h-screen ">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-navy-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-600">
                Manage and monitor your elections
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/admin/election/create')}
              className="flex items-center space-x-2 mt-4 md:mt-0 text-green-400"
            >
              <Plus className="w-5 h-5" />
              
              <span className='text-green-400 '>Create New Election</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <Filter className="w-5 h-5 text-slate-500 ml-2" />
            {['all', 'draft', 'live', 'ended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md font-medium transition-all capitalize ${
                  filter === status
                    ? 'bg-navy-600 text-green-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map((election, index) => (
            <motion.div
              key={election.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ElectionCard election={election} />
            </motion.div>
          ))}
        </div>

        {filteredElections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-600 text-lg mb-4">
              No elections found with status: {filter}
            </p>
            <Button
              variant="outline"
              onClick={() => setFilter('all')}
            >
              Show All Elections
            </Button>
          </motion.div>
        )}
      </div>

    
    </div>
  );
}
