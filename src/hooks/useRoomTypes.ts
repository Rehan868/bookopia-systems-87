import { useState, useEffect } from 'react';
import { 
  fetchRoomTypes, 
  fetchRoomTypeById, 
  createRoomType, 
  updateRoomType, 
  deleteRoomType 
} from '@/services/api';

// Hook for fetching all room types
export function useRoomTypes() {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const roomTypesData = await fetchRoomTypes();
      setData(roomTypesData);
      setError(null);
    } catch (err) {
      console.error('Error in useRoomTypes:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch room types'));
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  return { data, isLoading, error, refetch, isRefetching };
}

// Hook for individual room type data
export function useRoomType(id?: string) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const roomTypeData = await fetchRoomTypeById(id);
      setData(roomTypeData);
      setError(null);
    } catch (err) {
      console.error(`Error in useRoomType for ID ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch room type'));
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const refetch = () => {
    setIsRefetching(true);
    fetchData();
  };

  // Provide a function to save room type (create or update)
  const saveRoomType = async (roomTypeData: any) => {
    try {
      if (id) {
        // Update existing room type
        const updatedRoomType = await updateRoomType(id, roomTypeData);
        setData(updatedRoomType);
        return updatedRoomType;
      } else {
        // Create new room type
        const newRoomType = await createRoomType(roomTypeData);
        setData(newRoomType);
        return newRoomType;
      }
    } catch (err) {
      console.error('Error saving room type:', err);
      throw err;
    }
  };

  // Function to delete the room type
  const removeRoomType = async () => {
    if (!id) return;
    
    try {
      await deleteRoomType(id);
      setData(null);
      return true;
    } catch (err) {
      console.error(`Error deleting room type ID ${id}:`, err);
      throw err;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isRefetching,
    saveRoomType,
    removeRoomType
  };
}