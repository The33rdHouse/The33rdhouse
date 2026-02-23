import { useState, useEffect } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Progressive image component with blur-up effect
 * Shows a blurred placeholder while the full image loads
 */
export default function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  onError,
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder with blur effect */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-950/50 to-black animate-pulse ${placeholderClassName}`}
        />
      )}
      
      {/* Actual image */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          className={`transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onError={onError}
        />
      )}
    </div>
  );
}
