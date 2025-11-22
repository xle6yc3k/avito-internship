import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useHotkeys } from 'react-hotkeys-hook';
import { Loader2, ChevronLeft, Check, X, Calendar, User, Tag, Edit3, ArrowRight, ArrowLeft } from 'lucide-react';

import { adsApi } from '../../services/ads';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { STATUSES, PRIORITIES } from '../../shared/constants';

import { ImageGallery } from './components/ImageGallery';
import { RejectModal } from './components/RejectModal';
import { ChangesModal } from './components/ChangesModal';
import { ModerationHistory } from './components/ModerationHistory';

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentId = parseInt(id);
  
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isChangesOpen, setIsChangesOpen] = useState(false);

  const { data: ad, isLoading, isError } = useQuery({
    queryKey: ['ad', id],
    queryFn: () => adsApi.getById(id),
    retry: 1
  });

  const approveMutation = useMutation({
    mutationFn: () => adsApi.approve(id),
    onSuccess: () => handleSuccess()
  });

  const rejectMutation = useMutation({
    mutationFn: ({ reason, comment }) => adsApi.reject(id, reason, comment),
    onSuccess: () => {
      setIsRejectOpen(false);
      handleSuccess();
    }
  });

  const changesMutation = useMutation({
    mutationFn: ({ reason, comment }) => adsApi.requestChanges(id, reason, comment),
    onSuccess: () => {
      setIsChangesOpen(false);
      handleSuccess();
    }
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries(['ads']);
    queryClient.invalidateQueries(['ad', id]);
  };

  // хоткеи
  useHotkeys('right', () => navigate(`/item/${currentId + 1}`), [currentId, navigate]);
  useHotkeys('left', () => {
    if (currentId > 1) navigate(`/item/${currentId - 1}`);
  }, [currentId, navigate]);
  useHotkeys('esc', () => navigate('/list'));

  const canPerformAction = ad?.status === STATUSES.PENDING && !isRejectOpen && !isChangesOpen;

  useHotkeys('a', () => {
    if (canPerformAction) approveMutation.mutate();
  }, [canPerformAction, approveMutation]);

  useHotkeys('d', () => {
    if (canPerformAction) setIsRejectOpen(true);
  }, [canPerformAction]);

  useHotkeys('e', () => {
    if (canPerformAction) setIsChangesOpen(true);
  }, [canPerformAction]);

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
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/list')} 
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Назад к списку (Esc)
        </button>

        <div className="flex gap-2">
           <Button 
             variant="secondary" 
             className="px-3 py-1 h-9 text-xs"
             onClick={() => navigate(`/item/${currentId - 1}`)}
             disabled={currentId <= 1}
             title="Горячая клавиша: ←"
           >
             <ArrowLeft size={14} className="mr-1"/> Пред.
           </Button>
           <Button 
             variant="secondary" 
             className="px-3 py-1 h-9 text-xs"
             onClick={() => navigate(`/item/${currentId + 1}`)}
             title="Горячая клавиша: →"
           >
             След. <ArrowRight size={14} className="ml-1"/>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={ad.images} />

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
              <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                {formattedPrice}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant={ad.status} />
              {ad.priority === PRIORITIES.URGENT && <Badge variant="urgent" />}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                 ID: {ad.id}
              </span>
            </div>

            <div className="prose prose-sm max-w-none text-gray-600">
               <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
               <p className="whitespace-pre-wrap leading-relaxed">{ad.description || 'Описание отсутствует'}</p>
            </div>
            
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

          <ModerationHistory history={ad.moderationHistory} />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24 z-10">
             <h3 className="font-semibold text-gray-900 mb-4">Решение модератора</h3>
             
             {ad.status === STATUSES.PENDING ? (
               <div className="space-y-3">
                 <Button 
                   className="w-full bg-green-600 hover:bg-green-700 border-transparent flex justify-center items-center gap-2 py-3"
                   onClick={() => approveMutation.mutate()}
                   isLoading={approveMutation.isPending}
                   title="A"
                 >
                   <Check size={18} /> Одобрить (A)
                 </Button>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white border-transparent flex justify-center items-center gap-2 py-3"
                      onClick={() => setIsChangesOpen(true)}
                      title="E"
                    >
                      <Edit3 size={18} /> Доработка (E)
                    </Button>

                    <Button 
                      variant="danger" 
                      className="w-full flex justify-center items-center gap-2 py-3"
                      onClick={() => setIsRejectOpen(true)}
                      title="D"
                    >
                      <X size={18} /> Отклонить (D)
                    </Button>
                 </div>
               </div>
             ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 text-sm border border-gray-100">
                  Это объявление уже проверено
                </div>
             )}
             
             <div className="mt-4 pt-4 border-t text-xs text-gray-400 flex justify-between px-2">
                <span>A - Одобрить</span>
                <span>E - Доработка</span>
                <span>D - Отклонить</span>
             </div>
          </div>

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

      <RejectModal 
         isOpen={isRejectOpen} 
         onClose={() => setIsRejectOpen(false)}
         onConfirm={(reason, comment) => rejectMutation.mutate({ reason, comment })}
         isLoading={rejectMutation.isPending}
      />

      <ChangesModal 
         isOpen={isChangesOpen} 
         onClose={() => setIsChangesOpen(false)}
         onConfirm={(reason, comment) => changesMutation.mutate({ reason, comment })}
         isLoading={changesMutation.isPending}
      />
    </div>
  );
};

export default AdDetailsPage;