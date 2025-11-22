import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`
          block w-full rounded-lg border-gray-300 border px-3 py-2 text-sm placeholder:text-gray-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
        `}
        {...props}
      />
      {/* показываем ошибку если есть */}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};