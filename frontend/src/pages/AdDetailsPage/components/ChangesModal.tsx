import React, { useState } from 'react';
import { X, Edit3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { REJECTION_REASONS } from '../../../shared/constants';

export const ChangesModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason) return;
    onConfirm(reason, comment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden relative">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-yellow-50">
          <h3 className="font-bold text-yellow-800 flex items-center gap-2">
            <Edit3 size={20} />
            Вернуть на доработку
          </h3>
          <button onClick={onClose} className="text-yellow-600 hover:text-yellow-800 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Что исправить?</label>
            <div className="space-y-2">
              {REJECTION_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-yellow-50 transition border-gray-200 has-[:checked]:border-yellow-400 has-[:checked]:bg-yellow-50">
                  <input 
                    type="radio" 
                    name="changes-reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="text-yellow-600 focus:ring-yellow-500 accent-yellow-600"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Комментарий для продавца:</label>
            <textarea 
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500 outline-none min-h-[80px]"
                placeholder="Опишите, что нужно поправить..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>Отмена</Button>
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-transparent"
            onClick={handleSubmit} 
            isLoading={isLoading}
            disabled={!reason}
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};