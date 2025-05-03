
// This is a mock API file that redirects to our mock-api service
import { 
  getRooms, 
  getRoom, 
  getBookings, 
  getBooking,
  getTodayCheckins,
  getTodayCheckouts,
  getProperties,
  getRoomTypes
} from '@/services/mock-api';

import { Booking, Guest, Room } from '@/services/supabase-types';

// Export the mock API functions
export const fetchRooms = async () => {
  const rooms = await getRooms();
  return rooms;
};

export const fetchRoom = async (id: string) => {
  const room = await getRoom(id);
  return room;
};

export const updateBookingStatus = async (id: string, status: string) => {
  // Mock implementation - in reality this would update the booking in a database
  console.log(`Updating booking ${id} status to ${status}`);
  return { success: true };
};

export const deleteBooking = async (id: string) => {
  // Mock implementation - in reality this would delete the booking from a database
  console.log(`Deleting booking ${id}`);
  return { success: true };
};

export const saveBooking = async (bookingData: Partial<Booking>, guestData: Partial<Guest>) => {
  // Mock implementation - in reality this would save to a database
  console.log('Saving booking:', bookingData);
  console.log('Guest data:', guestData);
  return { success: true, id: 'new-id-123' };
};
