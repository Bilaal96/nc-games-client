import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Initialise state with value read from localStorage (if any)
  // Otherwise, initialise state with initalValue
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : initialValue;
  });

  // Setter function that sets the passed value in react state & also persists it to localStorage
  const setPersistedValue = (value) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(value) : value;
    // Save state
    setValue(valueToStore);
    // Save to local storage
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setPersistedValue];
}

export default useLocalStorage;
