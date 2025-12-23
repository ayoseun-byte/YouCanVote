import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', onClick, disabled, className = '', ...props }) {
  const baseClasses = "font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-navy-600 hover:bg-navy-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white",
    ghost: "text-navy-600 hover:bg-navy-50",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
