
import { useState, useEffect } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  priority?: boolean;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const AnimatedImage = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  priority = false,
  containerClassName = '',
  objectFit = 'cover'
}: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Determine aspect ratio padding
  let aspectRatioPadding = '';
  if (aspectRatio === 'square') aspectRatioPadding = 'pt-[100%]';
  else if (aspectRatio === 'video') aspectRatioPadding = 'pt-[56.25%]';
  else if (aspectRatio === 'portrait') aspectRatioPadding = 'pt-[125%]';
  else if (aspectRatio === 'wide') aspectRatioPadding = 'pt-[42%]';

  useEffect(() => {
    // Prefetch image
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  return (
    <div 
      className={`relative overflow-hidden ${aspectRatioPadding} ${containerClassName}`}
      style={{ aspectRatio: aspectRatio === 'auto' ? 'auto' : undefined }}
    >
      {/* Shimmer effect during loading */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent animate-shimmer"
          style={{
            backgroundSize: '500px 100%',
          }}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => {
          setIsLoading(false);
          setTimeout(() => setHasLoaded(true), 100);
        }}
        className={`
          absolute inset-0 w-full h-full transition-all duration-700
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
          ${objectFit === 'fill' ? 'object-fill' : ''}
          ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
          ${isLoading ? 'scale-[1.05] blur-[10px] opacity-0' : 'scale-100 blur-0 opacity-100'}
          ${className}
        `}
      />
      
      {/* Animation overlay */}
      {hasLoaded && (
        <div 
          className="absolute inset-0 bg-white/20 animate-reveal"
          style={{ 
            animation: 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards' 
          }}
        />
      )}
    </div>
  );
};

export default AnimatedImage;
