import React from 'react';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 active:scale-95 border border-transparent",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-transparent",
    outline: "border-2 border-slate-200 hover:border-green-600 hover:text-green-600 text-slate-600 bg-transparent",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

// Card Component
export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({ 
  children, 
  className = '',
  hover = false
}) => (
  <div className={`
    glass-panel rounded-2xl p-6 relative overflow-hidden
    ${hover ? 'glass-card-hover cursor-pointer' : ''}
    ${className}
  `}>
    {children}
  </div>
);

// Badge Component
export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'purple' | 'red' }> = ({ 
  children, 
  color = 'green' 
}) => {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]} flex items-center gap-1.5 w-fit`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {children}
    </span>
  );
};

// Input Component
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ 
  label, 
  className = '', 
  ...props 
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
    <input 
      className={`
        w-full px-4 py-3 rounded-lg bg-white border border-slate-200 
        focus:ring-2 focus:ring-green-500/20 focus:border-green-500 
        transition-all outline-none placeholder:text-slate-400
        ${className}
      `}
      {...props} 
    />
  </div>
);