import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : ''} ${className}`;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
