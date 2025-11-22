import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adsApi } from '@/services/ads';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loader2, ChevronLeft, Check, X, Calendar, User, Tag } from 'lucide-react';
import { STATUSES, PRIORITIES } from '@/shared/constants';

import { ImageGallery } from './components/ImageGallery';
import { RejectModal } from './components/RejectModal';

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // загрузка объявления
  const { data: ad, isLoading, isError } = useQuery({
    queryKey: ['ad', id],
    queryFn: () => adsApi.getById(id),
    retry: 1
  });

  // мутация одобрения
  const approveMutation = useMutation({
    mutationFn: () => adsApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['ads']);
      queryClient.invalidateQueries(['ad', id]);
    }
  });

  // мутация для отклонения
  const rejectMutation = useMutation({
    mutationFn: ({ reason, comment }) => adsApi.reject(id, reason, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['ads']);
      queryClient.invalidateQueries(['ad', id]);
      setIsRejectModalOpen(false);
    }
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (isError || !ad) return <div className="text-center py-20 text-red-500">Объявление не найдено</div>;

  const formattedDate = new Date(ad.createdAt).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const formattedPrice = new Intl.NumberFormat('ru-RU', { 
      style: 'currency', currency: 'RUB', maximumFractionDigits: 0 
  }).format(ad.price);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-10">
      {/* кнопка назад */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Назад
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* левая колонка - основной контент */}
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={ad.images} />

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
              <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                {formattedPrice}
              </div>
            </div>

            {/* бейджи */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant={ad.status} />
              
              {/* бейдж срочно если есть */}
              {ad.priority === PRIORITIES.URGENT && <Badge variant="urgent" />}
              
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                 ID: {ad.id}
              </span>
            </div>

            <div className="prose prose-sm max-w-none text-gray-600">
               <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
               <p className="whitespace-pre-wrap leading-relaxed">{ad.description || 'Описание отсутствует'}</p>
            </div>
            
            {/* характеристики если есть */}
            {ad.characteristics && Object.keys(ad.characteristics).length > 0 && (
               <div className="border-t pt-4 mt-6">
                 <h3 className="font-semibold text-gray-900 mb-3">Характеристики</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {Object.entries(ad.characteristics).map(([key, val]) => (
                       <div key={key} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                          <span className="text-gray-500">{key}</span>
                          <span className="font-medium text-gray-900">{val}</span>
                       </div>
                    ))}
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* правая колонка - сайдбар */}
        <div className="space-y-6">
          
          {/* панель действий модератора */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24 z-10">
             <h3 className="font-semibold text-gray-900 mb-4">Решение модератора</h3>
             
             {/* кнопки мода */}
             {ad.status === STATUSES.PENDING ? (
               <div className="space-y-3">
                 <Button 
                   className="w-full bg-green-600 hover:bg-green-700 border-transparent flex justify-center items-center gap-2 py-3"
                   onClick={() => approveMutation.mutate()}
                   isLoading={approveMutation.isPending}
                 >
                   <Check size={18} /> Одобрить
                 </Button>
                 
                 <Button 
                   variant="danger" 
                   className="w-full flex justify-center items-center gap-2 py-3"
                   onClick={() => setIsRejectModalOpen(true)}
                 >
                   <X size={18} /> Отклонить
                 </Button>
               </div>
             ) : (
               <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 text-sm border border-gray-100">
                  Это объявление уже проверено
               </div>
             )}
          </div>

          {/* инфа о селлере */}
          {ad.seller && (
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-semibold text-gray-900 mb-4">Продавец</h3>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                     <User size={24} />
                  </div>
                  <div>
                     <div className="font-medium text-lg">{ad.seller.name}</div>
                     <div className="text-xs text-gray-500">
                       На Авито с {new Date(ad.seller.registeredAt).getFullYear()}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* мета объявления */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-500 space-y-3">
             <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Calendar size={14} /> Создано:</span>
                <span>{formattedDate}</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Tag size={14} /> Категория:</span>
                <span>{ad.category}</span>
             </div>
          </div>

        </div>
      </div>

      {/* модалка реджекта */}
      <RejectModal 
         isOpen={isRejectModalOpen} 
         onClose={() => setIsRejectModalOpen(false)}
         onConfirm={(reason, comment) => rejectMutation.mutate({ reason, comment })}
         isLoading={rejectMutation.isPending}
      />
    </div>
  );
};

export default AdDetailsPage;