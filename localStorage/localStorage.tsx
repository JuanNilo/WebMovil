import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Un hook personalizado para recuperar datos desde AsyncStorage
export function useAsyncStorage(key) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          setData(storedData);
        }
      } catch (error) {
        console.error(`Error al recuperar datos de AsyncStorage para la clave "${key}":`, error);
      }
    };

    fetchData();
  }, [key]); // Asegura que el efecto se ejecute cuando cambia la clave

  return data;
}