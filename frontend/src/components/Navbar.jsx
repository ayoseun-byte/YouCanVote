import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vote, Lock, Wallet, ContactIcon, NotebookIcon, WorkflowIcon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { connectWallet, getCurrentAccount } from '../utils/smartContractFun';
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const navItems = [
    { path: '#howitworks', name: 'How IT Works', icon: WorkflowIcon },
    { path: '#contact', name: 'Contact', icon: ContactIcon },
    { path: '#actions', name: 'Actions', icon: NotebookIcon },
  ];

  // Truncate wallet address (e.g., 0x1234...5678)
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        setAccount(currentAccount);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
    } else {
      // User switched accounts
      setAccount(accounts[0]);
    }
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
      console.log('Connected account:', connectedAccount);
      navigate('/choose');
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect wallet: ' + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    // Note: We can't actually disconnect MetaMask programmatically,
    // but we can clear our local state
    navigate('/');
  };

  return (
    <nav className="backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-navy-600 p-2 rounded-lg">
              <img src={logo} alt="LedgerVote Logo" className="w-10 h-10" />
            </div>
            <span className="text-2xl font-bold text-navy-800">LedgerVote</span>
          </Link>

          <nav className="hidden md:flex items-center gap-3 px-2 py-1 rounded-full">
            {navItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.path}
                  className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all hover:text-black/60 hover:bg-white/6"
                >
                  <item.icon size={16} />
                  {item.name}
                </a>
              </div>
            ))}
          </nav>

          {/* Wallet Connection Button */}
          {!account ? (
            <motion.button
              aria-label="Connect wallet"
              onClick={handleConnect}
              disabled={isConnecting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-green-600 px-5 py-2 rounded-2xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Wallet size={16} />
                <span className="hidden sm:inline">
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Connected Wallet Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-green-100 border-2 border-green-600 px-4 py-2 rounded-2xl"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm font-semibold text-green-800">
                  {truncateAddress(account)}
                </span>
              </motion.div>

              {/* Disconnect Button */}
              <motion.button
                aria-label="Disconnect wallet"
                onClick={handleDisconnect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                title="Disconnect"
              >
                <LogOut size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}