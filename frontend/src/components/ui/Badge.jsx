import React from 'react';
import { STATUS_VARIANTS, STATUS_LABELS, PRIORITY_LABELS, STATUSES} from '@/shared/constants';

const PRIORITY_VARIANTS = {
  urgent: 'bg-red-50 text-red-600 border-red-100 ring-1 ring-red-500/20',
  normal: 'bg-blue-50 text-blue-600 border-blue-100',
};

const allVariants = {
    ...STATUS_VARIANTS,
    ...PRIORITY_VARIANTS
};

const allLabels = {
    ...STATUS_LABELS,
    ...PRIORITY_LABELS
};

export const Badge = ({ variant, label, className = '' }) => {
  const style = allVariants[variant] || allVariants[STATUSES.DRAFT];
  // свой label или из словаря
  const text = label || allLabels[variant] || variant;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}>
      {text}
    </span>
  );
};