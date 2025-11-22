import React from 'react';
import { CheckCircle, XCircle, Edit3, Clock } from 'lucide-react';

const ActionIcon = ({ action }) => {
  switch (action) {
    case 'approved': return <CheckCircle className="text-green-500" size={18} />;
    case 'rejected': return <XCircle className="text-red-500" size={18} />;
    case 'requestChanges': return <Edit3 className="text-yellow-500" size={18} />;
    default: return <Clock className="text-gray-400" size={18} />;
  }
};

const getActionLabel = (action) => {
  switch (action) {
    case 'approved': return 'Одобрил';
    case 'rejected': return 'Отклонил';
    case 'requestChanges': return 'Вернул на доработку';
    default: return 'Действие';
  }
};

export const ModerationHistory = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-6">
      <h3 className="font-semibold text-gray-900 mb-4">История модерации</h3>
      <div className="space-y-0">
        {history.map((record, index) => (
          <div key={index} className="relative pl-8 pb-6 last:pb-0">
            {index !== history.length - 1 && (
              <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-200"></div>
            )}
            
            <div className="absolute left-0 top-0 bg-white rounded-full border border-gray-200 p-1 z-10">
               <ActionIcon action={record.action} />
            </div>
            
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <span>{record.moderatorName || `Модератор #${record.moderatorId}`}</span>
                  <span className="text-gray-400 font-normal text-xs">•</span>
                  <span>{getActionLabel(record.action)}</span>
               </div>
               
               <div className="text-xs text-gray-500">
                  {new Date(record.timestamp).toLocaleString('ru-RU')}
               </div>

               {record.reason && (
                 <div className="mt-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-100 inline-block self-start">
                    <strong>Причина:</strong> {record.reason}
                 </div>
               )}
               
               {record.comment && (
                 <div className="mt-1 text-sm text-gray-600 italic border-l-2 border-gray-300 pl-3 py-1">
                    "{record.comment}"
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};