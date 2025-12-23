import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import OTPInput from '../components/OTPInput';
import CountdownTimer from '../components/CountdownTimer';
import Button from '../components/Button';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOTPComplete = (otp) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      navigate('/vote/1');
    }, 1500);
  };

  const handleResend = () => {
    alert('New OTP sent to your registered email/phone');
  };

  const handleTimerComplete = () => {
    alert('OTP expired. Please request a new one.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
    

      <div className="max-w-md mx-auto px-4 py-20">
        <button
          onClick={() => navigate('/join')}
          className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-br from-navy-600 to-teal-500 p-6 rounded-2xl shadow-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">Verify Your Identity</h1>
            <p className="text-slate-600">Enter the 6-digit code sent to your device</p>
          </div>

          <div className="card space-y-6">
            <OTPInput length={6} onComplete={handleOTPComplete} />

            <div className="flex justify-center">
              <CountdownTimer initialSeconds={120} onComplete={handleTimerComplete} />
            </div>

            {isVerifying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center space-x-2 text-teal-600"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full"
                />
                <span className="font-medium">Verifying...</span>
              </motion.div>
            )}

            <div className="text-center">
              <button
                onClick={handleResend}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-navy-50 border border-navy-200 rounded-lg p-4"
          >
            <p className="text-sm text-navy-800">
              <span className="font-semibold">Security Notice:</span> This verification ensures
              only authorized voters can participate in the election.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
