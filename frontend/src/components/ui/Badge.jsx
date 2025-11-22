import React from 'react';

// стили для разных статусов
const variants = {
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  urgent: 'bg-red-50 text-red-600 border-red-100 ring-1 ring-red-500/20',
  normal: 'bg-blue-50 text-blue-600 border-blue-100',
};

// текстовые метки для статусов
export const badgeLabels = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  pending: 'На модерации',
  draft: 'Черновик',
  urgent: 'Срочно',
  normal: 'Обычно',
};

export const Badge = ({ variant, label, className = '' }) => {
  const style = variants[variant] || variants.draft;
  // свой label или из словаря
  const text = label || badgeLabels[variant] || variant;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}>
      {text}
    </span>
  );
};