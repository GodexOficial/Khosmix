import { useState, useEffect } from "react";
import images from '../constants/images';

export const useImagePreload = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = Object.values(images);
    let loadedCount = 0;

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(imageUrls.map(preloadImage))
      .then(() => setLoaded(true))
      .catch(error => {
        console.error('Error preloading images:', error);
        setLoaded(true); // Continue mesmo com erro
      });
  }, []);

  return loaded;
};
