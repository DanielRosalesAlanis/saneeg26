import { useEffect } from 'react';

export function useEnterKey(callback, disabled = false) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && !disabled) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback, disabled]);
}
