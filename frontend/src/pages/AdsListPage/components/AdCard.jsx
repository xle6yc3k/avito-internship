import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

export const AdCard = ({ ad }) => {
  // цену в рубли
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(ad.price);

  // дата в нормальном формате
  const formattedDate = new Date(ad.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* картинка */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={ad.images?.[0] || 'https://placehold.co/400x300?text=No+Image'} 
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* бейджи со статусом и приоритетом */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
           <Badge variant={ad.status} />
           {ad.priority === 'urgent' && <Badge variant="urgent" />}
        </div>
      </div>

      {/* основной контент */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors" title={ad.title}>
            {ad.title}
          </h3>
        </div>
        
        <div className="text-lg font-bold text-gray-900 mb-3">
          {formattedPrice}
        </div>

        {/* мета-информация внизу */}
        <div className="mt-auto space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{ad.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <Link 
          to={`/item/${ad.id}`}
          className="mt-4 w-full block text-center py-2 px-4 bg-gray-50 hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-colors border border-gray-100 hover:border-blue-200"
        >
          Открыть
        </Link>
      </div>
    </div>
  );
};