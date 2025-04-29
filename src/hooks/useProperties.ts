import { useState, useEffect } from 'react';
import { 
  fetchProperties, 
  fetchPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} from '@/services/api';

// Hook for fetching all properties
export function useProperties() {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const propertiesData = await fetchProperties();
      setData(propertiesData);
      setError(null);
    } catch (err) {
      console.error('Error in useProperties:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
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

// Hook for individual property data
export function useProperty(id?: string) {
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
      const propertyData = await fetchPropertyById(id);
      setData(propertyData);
      setError(null);
    } catch (err) {
      console.error(`Error in useProperty for ID ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch property'));
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

  // Provide a function to save property (create or update)
  const saveProperty = async (propertyData: any) => {
    try {
      if (id) {
        // Update existing property
        const updatedProperty = await updateProperty(id, propertyData);
        setData(updatedProperty);
        return updatedProperty;
      } else {
        // Create new property
        const newProperty = await createProperty(propertyData);
        setData(newProperty);
        return newProperty;
      }
    } catch (err) {
      console.error('Error saving property:', err);
      throw err;
    }
  };

  // Function to delete the property
  const removeProperty = async () => {
    if (!id) return;
    
    try {
      await deleteProperty(id);
      setData(null);
      return true;
    } catch (err) {
      console.error(`Error deleting property ID ${id}:`, err);
      throw err;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isRefetching,
    saveProperty,
    removeProperty
  };
}
