import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            if (item === null) return initialValue;
            const parsed = JSON.parse(item);
            return parsed !== null ? parsed : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            localStorage.removeItem(key);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        if (typeof window === 'undefined') return;
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;