import { Vote, Shield, Lock, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-black mt-20 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Vote className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">LedgerVote</span>
            </div>
            <p className="text-black mb-4">
              Modern, secure, and transparent voting platform for organizations,
              schools, and communities.
            </p>
            <div className="flex space-x-4">
              <Shield className="w-5 h-5 text-black" />
              <Lock className="w-5 h-5 text-black" />
              <CheckCircle className="w-5 h-5 text-black" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-black">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-black">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 LedgerVote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
