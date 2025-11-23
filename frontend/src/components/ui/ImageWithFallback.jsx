import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  if (error || !src) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`} {...props}>
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gray-50 ${className}`} {...props}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};