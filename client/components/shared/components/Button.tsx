import React from 'react';

export const Button: React.FC<{
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ label, type = 'button', onClick, className, disabled }) => {
  return (
    <button
      className={`btn waves-effect waves-light ${className}`.trim()}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};