import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset as number;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
};
