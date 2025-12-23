import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function StepProgress({ steps, currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span className={`text-sm mt-2 ${
                index === currentStep ? 'text-teal-600 font-semibold' : 'text-slate-600'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-slate-200 rounded relative overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-green-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
