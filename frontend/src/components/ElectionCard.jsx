import { motion } from 'framer-motion';
import { Calendar, Users, Eye, PlayCircle, CheckCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ElectionCard({ election }) {
  const navigate = useNavigate();

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700',
    live: 'bg-green-100 text-green-700',
    ended: 'bg-navy-100 text-navy-700',
  };

  const statusIcons = {
    draft: Edit,
    live: PlayCircle,
    ended: CheckCircle,
  };

  const StatusIcon = statusIcons[election.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
      className="card cursor-pointer"
      onClick={() => navigate(`/admin/election/${election.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-navy-800">{election.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusColors[election.status]}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="capitalize">{election.status}</span>
        </span>
      </div>

      <p className="text-slate-600 mb-4 line-clamp-2">{election.description}</p>

      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{election.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{election.voters} voters</span>
        </div>
        {election.status === 'live' && (
          <div className="flex items-center space-x-1 text-green-600">
            <Eye className="w-4 h-4" />
            <span>{election.liveViewers} watching</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
