import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, CheckCircle, Users, BarChart3, Clock,Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Lottie from 'lottie-react';
import Balloting from '../Balloting.json'
import AnimationStack from '../components/AnimationStack';
import InfiniteDeck from '../components/InfiniteDeck';
import { connectWallet } from '../utils/smartContractFun';
import RotatingText from '../components/RotatingText';
import ProblemStack from '../components/ProblemStack';

export default function LandingPage() {
  const navigate = useNavigate();
    const handleConnect = async () => {
      try {
        
        const connectedAccount = await connectWallet();
        console.log('Connected account:', connectedAccount);
        navigate('/choose');
      } catch (error) {
        console.error('Connection failed:', error);
        alert('Failed to connect wallet: ' + error.message);
      } finally {
      }
    };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Encrypted',
      description: 'Military-grade encryption ensures every vote is protected and anonymous.',
    },
    {
      icon: Lock,
      title: 'Verified Access',
      description: 'Multi-factor authentication prevents unauthorized access.',
    },
    {
      icon: CheckCircle,
      title: 'Transparent Results',
      description: 'Real-time results with complete audit trails.',
    },
    {
      icon: Users,
      title: 'Easy Management',
      description: 'Intuitive dashboard for organizing and monitoring elections.',
    },
    {
      icon: BarChart3,
      title: 'Live Analytics',
      description: 'Track participation and results as they happen.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Set custom voting periods that work for your organization.',
    },
  ];

  return (
    <div className="min-h-screen secondary ">
    

      <section className="relative overflow-hidden lg:pt-10  px-4 lg:h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8 inline-block"
          >
            <div className=" p-5 rounded-3xl ">
              <Lottie animationData={Balloting} className="w-30 h-30  mx-auto" />

              {/* <Shield className="w-10 h-10  mx-auto" /> */}
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl   font-bold  mb-6">
          
              Ledge Votes —  
<div className='inline-block '>

             <RotatingText
  texts={ [
    "Secure",
    "Tamper-Proof",
    "Digital Voting",
    "Tamper-Free",
    "Transparent",
    "Immutable",
  ]}
  mainClassName="px-2 sm:px-2 md:px-3   overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>

</div>
       

            Elections
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Modern voting platform for organizations, schools, and communities.
            Create elections in minutes, vote securely, see results instantly.
          </p>

        

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConnect}
        className="group relative px-8 py-3 accent mx-10 flex justify-center items-center text-white rounded-2xl font-bold text-md shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2 text-center">
          Start Voting
           {/* <ChevronRight size={18} /> */}
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>
          </div>
        </motion.div>

          <InfiniteDeck/>
       

  
      </section>

      <AnimationStack/>
      <ProblemStack/>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose LedgerVote?
            </h2>
            <p className="text-xl text-slate-600">
              Built with security, transparency, and ease of use in mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card text-center border border-green-600/20"
              >
                <div className="bg-green-600/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-10 h-10 text-navy-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border border-black/20 bg-black/5 mx-20 rounded-xl ">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-black">
            Join thousands of organizations using SecureVote for fair and transparent elections.
          </p>
          <Button
            // variant="secondary"
            onClick={() => navigate('/admin/election/create')}
            className="bg-green-600 text-white hover:bg-slate-100 text-lg px-8 py-3"
          >
            Create Your First Election
          </Button>
        </motion.div>
      </section>


    </div>
  );
}
