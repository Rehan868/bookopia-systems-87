import { useState, useEffect } from 'react';
import { Booking, Guest } from '@/services/supabase-types';
import { 
  fetchBookings, 
  fetchBookingById, 
  createBooking, 
  updateBooking, 
  deleteBooking,
  fetchTodayCheckins,
  fetchTodayCheckouts,
  updateBookingStatus
} from '@/services/api';

// Mock data available for fallback if needed
const mockBookings = [
  {
    id: '1',
    booking_number: 'BK-2023-0001',
    guest_name: 'John Smith',
    check_in: '2023-06-15',
    check_out: '2023-06-18',
    status: 'confirmed',
    amount: 450,
    rooms: { number: '101', property: 'Marina Tower' },
    commission: 45,
    tourismFee: 13.5,
    vat: 22.5,
    netToOwner: 369,
    securityDeposit: 100,
    baseRate: 150,
    adults: 2,
    children: 0,
    guestEmail: 'john.smith@example.com',
    guestPhone: '+1 (555) 123-4567',
    payment_status: 'paid',
    amountPaid: 450,
    pendingAmount: 0,
    guestDocument: 'passport-123.pdf'
  },
  {
    id: '2',
    booking_number: 'BK-2023-0002',
    guest_name: 'Emma Johnson',
    check_in: '2023-06-14',
    check_out: '2023-06-16',
    status: 'checked-in',
    amount: 350,
    rooms: { number: '205', property: 'Downtown Heights' },
    commission: 35,
    tourismFee: 10.5,
    vat: 18,
    netToOwner: 295,
    securityDeposit: 100,
    baseRate: 150,
    adults: 1,
    children: 1,
    guestEmail: 'emma.johnson@example.com',
    guestPhone: '+1 (555) 987-6543',
    payment_status: 'pending',
    amountPaid: 350,
    pendingAmount: 0
  },
  {
    id: '3',
    booking_number: 'BK-2023-0003',
    guest_name: 'Michael Chen',
    check_in: '2023-06-12',
    check_out: '2023-06-13',
    status: 'checked-out',
    amount: 175,
    rooms: { number: '304', property: 'Marina Tower' },
    commission: 17.5,
    tourismFee: 5.25,
    vat: 8.75,
    netToOwner: 142.5,
    securityDeposit: 100,
    baseRate: 150,
    adults: 1,
    children: 0,
    guestEmail: 'michael.chen@example.com',
    guestPhone: '+1 (555) 555-1234',
    payment_status: 'paid',
    amountPaid: 175,
    pendingAmount: 0
  },
  {
    id: '4',
    booking_number: 'BK-2023-0004',
    guest_name: 'Sarah Davis',
    check_in: '2023-06-18',
    check_out: '2023-06-20',
    status: 'confirmed',
    amount: 300,
    rooms: { number: '102', property: 'Downtown Heights' },
    commission: 30,
    tourismFee: 9,
    vat: 16.5,
    netToOwner: 253.5,
    securityDeposit: 100,
    baseRate: 150,
    adults: 2,
    children: 0,
    guestEmail: 'sarah.davis@example.com',
    guestPhone: '+1 (555) 321-6543',
    payment_status: 'pending',
    amountPaid: 300,
    pendingAmount: 0
  },
  {
    id: '5',
    booking_number: 'BK-2023-0005',
    guest_name: 'David Wilson',
    check_in: '2023-06-10',
    check_out: '2023-06-15',
    status: 'checked-out',
    amount: 625,
    rooms: { number: '401', property: 'Marina Tower' },
    commission: 62.5,
    tourismFee: 18.75,
    vat: 31.25,
    netToOwner: 521.25,
    securityDeposit: 100,
    baseRate: 150,
    adults: 2,
    children: 0,
    guestEmail: 'david.wilson@example.com',
    guestPhone: '+1 (555) 789-1234',
    payment_status: 'paid',
    amountPaid: 625,
    pendingAmount: 0
  },
];

export function useBookings() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const bookingsData = await fetchBookings();
      setData(bookingsData);
      setError(null);
    } catch (err) {
      console.error('Error in useBookings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
      
      // Only fallback to mock data in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        setData(mockBookings as unknown as Booking[]);
      }
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

// Hook for individual booking data
export function useBooking(id?: string) {
  const [data, setData] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    if (!id) {
      setIsLoading(false);
      setError(new Error('No booking ID provided'));
      return;
    }
    
    try {
      setIsLoading(true);
      const bookingData = await fetchBookingById(id);
      setData(bookingData);
      setError(null);
    } catch (err) {
      console.error(`Error in useBooking for ID ${id}:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch booking'));
      
      // Only fallback to mock data in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const booking = mockBookings.find(booking => booking.id === id);
        if (booking) {
          setData(booking as unknown as Booking);
        }
      }
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

  // Create a function to handle booking status changes
  const updateStatus = async (status: string) => {
    if (!id) return;
    
    try {
      await updateBookingStatus(id, status);
      refetch(); // Refetch the booking data after updating status
      return true;
    } catch (err) {
      console.error(`Error updating booking status for ID ${id}:`, err);
      throw err;
    }
  };

  // Add CRUD operations
  const saveBooking = async (bookingData: Partial<Booking>, guestData?: Partial<Guest>) => {
    try {
      if (id) {
        // Update existing booking
        const updatedBooking = await updateBooking(id, bookingData, guestData);
        setData(updatedBooking);
        return updatedBooking;
      } else {
        // Create new booking
        if (!guestData) {
          throw new Error('Guest data is required when creating a new booking');
        }
        const newBooking = await createBooking(bookingData, guestData);
        setData(newBooking);
        return newBooking;
      }
    } catch (err) {
      console.error('Error saving booking:', err);
      throw err;
    }
  };

  const removeBooking = async () => {
    if (!id) return;
    
    try {
      await deleteBooking(id);
      setData(null);
      return true;
    } catch (err) {
      console.error(`Error deleting booking ID ${id}:`, err);
      throw err;
    }
  };

  return { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isRefetching,
    updateStatus,
    saveBooking,
    removeBooking
  };
}

export function useTodayCheckins() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const checkinsData = await fetchTodayCheckins();
      setData(checkinsData);
      setError(null);
    } catch (err) {
      console.error('Error in useTodayCheckins:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch today\'s check-ins'));
      
      // Fallback to mock data only in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const today = new Date().toISOString().split('T')[0];
        const checkins = mockBookings.filter(
          booking => booking.check_in.split('T')[0] === today && booking.status === 'confirmed'
        );
        setData(checkins as unknown as Booking[]);
      }
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

export function useTodayCheckouts() {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const checkoutsData = await fetchTodayCheckouts();
      setData(checkoutsData);
      setError(null);
    } catch (err) {
      console.error('Error in useTodayCheckouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch today\'s check-outs'));
      
      // Fallback to mock data only in development environment
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        const today = new Date().toISOString().split('T')[0];
        const checkouts = mockBookings.filter(
          booking => booking.check_out.split('T')[0] === today && booking.status === 'checked-in'
        );
        setData(checkouts as unknown as Booking[]);
      }
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
