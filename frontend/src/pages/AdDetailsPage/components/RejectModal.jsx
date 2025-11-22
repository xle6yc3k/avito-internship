import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { REJECTION_REASONS } from '@/shared/constants';

export const RejectModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // проверяем что причина выбрана
    if (!reason) return;
    onConfirm(reason, comment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden relative">
        {/* заголовок */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-red-50">
          <h3 className="font-bold text-red-900 flex items-center gap-2">
            <AlertTriangle size={20} />
            Отклонить объявление
          </h3>
          <button onClick={onClose} className="text-red-400 hover:text-red-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* тело модалки */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Выберите причину:</label>
            <div className="space-y-2">
              {REJECTION_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input 
                    type="radio" 
                    name="reject-reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="text-red-600 focus:ring-red-500 accent-red-600"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* комментарий, опц */}
          <div className="animate-fade-in">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Комментарий:</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500 outline-none min-h-[80px]"
                placeholder="Укажите детали нарушения..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {/* футер с кнопками */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>Отмена</Button>
          <Button 
            variant="danger" 
            onClick={handleSubmit} 
            isLoading={isLoading}
            disabled={!reason}
          >
            Отклонить
          </Button>
        </div>
      </div>
    </div>
  );
};