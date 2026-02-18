'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

// Custom hook for localStorage that works with SSR
// Uses useSyncExternalStore for proper hydration
function getLocalStorageSnapshot<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function subscribeToLocalStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Use useSyncExternalStore for SSR-safe localStorage access
  const storedValue = useSyncExternalStore(
    subscribeToLocalStorage,
    () => getLocalStorageSnapshot(key, defaultValue),
    () => defaultValue // Server snapshot
  );

  const [state, setState] = useState<T>(storedValue);

  // Update state when storedValue changes (after hydration)
  useEffect(() => {
    setState(storedValue);
  }, [storedValue]);

  // SetValue function that updates both state and localStorage
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error saving to localStorage:`, error);
    }
  };

  return [state, setValue];
}

// Simpler hook for just reading a value (no setter)
export function useLocalStorageValue<T>(key: string, defaultValue: T): T {
  const [value] = useLocalStorage(key, defaultValue);
  return value;
}
