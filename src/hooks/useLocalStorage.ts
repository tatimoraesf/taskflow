import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  //Carrega o valor salvo do LocalStorage (se existir)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error)
      return initialValue;
    }
  })

  //Salva no localStorage toda vez que o valor muda
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const;
}