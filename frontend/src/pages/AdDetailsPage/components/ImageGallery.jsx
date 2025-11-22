import React, { useState } from 'react';

export const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);

  // если нет изображений, показываем заглушку
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
        Нет изображений
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* главное изображение */}
      <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
        <img 
          src={selectedImage} 
          alt="Main" 
          className="w-full h-full object-cover transition-opacity duration-300" 
        />
      </div>

      {/* мелкие */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`
                relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                ${selectedImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'}
              `}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};