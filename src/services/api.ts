import { supabase } from "@/integrations/supabase/client";
import { 
  Room, 
  Booking, 
  User, 
  Owner, 
  Expense, 
  CleaningTask,
  PropertyOwnership,
  Guest
} from './supabase-types';

// Helper function to enhance a booking with calculated fields and derived properties
function enhanceBooking(booking: any): Booking {
  const totalAmount = Number(booking.total_amount || 0);
  
  // Add guest_name convenience property by combining first and last name
  let guestName = "";
  if (booking.guests) {
    guestName = `${booking.guests.first_name || ''} ${booking.guests.last_name || ''}`.trim();
  }
  
  return {
    ...booking,
    guest_name: guestName,
    pending_amount: booking.pending_amount !== undefined ? 
      booking.pending_amount : 
      (totalAmount + (booking.security_deposit || 0) - (booking.amount_paid || 0))
  } as Booking;
}

export const fetchRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, properties(name)');
  
  if (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
  
  return (data || []).map(room => ({
    ...room,
    property: room.properties?.name,
    status: room.status as 'available' | 'occupied' | 'maintenance' | 'cleaning'
  })) as Room[];
};

export const fetchRoomById = async (id: string): Promise<Room> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, properties(name)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    throw error;
  }
  
  return {
    ...data,
    property: data.properties?.name,
    status: data.status as 'available' | 'occupied' | 'maintenance' | 'cleaning'
  } as Room;
};

export const fetchRoomByNumber = async (number: string): Promise<Room> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, properties(name)')
    .eq('number', number)
    .single();
  
  if (error) {
    console.error(`Error fetching room with number ${number}:`, error);
    throw error;
  }
  
  return {
    ...data,
    property: data.properties?.name,
    status: data.status as 'available' | 'occupied' | 'maintenance' | 'cleaning'
  } as Room;
};

export const fetchBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `);
  
  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
  
  const transformedData = (data || []).map(booking => enhanceBooking(booking));
  
  return transformedData;
};

export const fetchBookingById = async (id: string): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    throw error;
  }
  
  return enhanceBooking(data);
};

export const createBooking = async (bookingData: Partial<Booking>, guestData: Partial<Guest>): Promise<Booking> => {
  // First, create or update the guest
  let guestId = bookingData.guest_id;
  
  if (!guestId) {
    // Check if guest already exists with the same email
    if (guestData.email) {
      const { data: existingGuest } = await supabase
        .from('guests')
        .select('id')
        .eq('email', guestData.email)
        .maybeSingle();
      
      if (existingGuest) {
        guestId = existingGuest.id;
        // Update existing guest
        await supabase
          .from('guests')
          .update(guestData)
          .eq('id', guestId);
      }
    }
    
    // If no existing guest was found, create a new one
    if (!guestId) {
      const { data: newGuest, error: guestError } = await supabase
        .from('guests')
        .insert(guestData)
        .select('id')
        .single();
      
      if (guestError) {
        console.error('Error creating guest:', guestError);
        throw guestError;
      }
      
      guestId = newGuest.id;
    }
  }
  
  // Generate a unique booking reference
  const reference = `BK-${Date.now().toString().slice(-6)}`;
  
  // Create the booking
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...bookingData,
      reference,
      guest_id: guestId,
      created_at: new Date().toISOString()
    })
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `)
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
  
  return enhanceBooking(data);
};

export const updateBooking = async (id: string, bookingData: Partial<Booking>, guestData?: Partial<Guest>): Promise<Booking> => {
  // If guest data is provided, update the guest
  if (guestData && bookingData.guest_id) {
    await supabase
      .from('guests')
      .update(guestData)
      .eq('id', bookingData.guest_id);
  }
  
  // Update the booking
  const { data, error } = await supabase
    .from('bookings')
    .update({
      ...bookingData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `)
    .single();
  
  if (error) {
    console.error(`Error updating booking with ID ${id}:`, error);
    throw error;
  }
  
  return enhanceBooking(data);
};

export const deleteBooking = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting booking with ID ${id}:`, error);
    throw error;
  }
};

export const fetchTodayCheckins = async (): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `)
    .eq('check_in_date', today)
    .eq('status', 'confirmed');
  
  if (error) {
    console.error('Error fetching today\'s check-ins:', error);
    throw error;
  }
  
  const transformedData = (data || []).map(booking => enhanceBooking(booking));
  
  return transformedData;
};

export const fetchTodayCheckouts = async (): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms(number, properties(name)),
      guests:guest_id(first_name, last_name, email, phone)
    `)
    .eq('check_out_date', today)
    .eq('status', 'checked_in');
  
  if (error) {
    console.error('Error fetching today\'s check-outs:', error);
    throw error;
  }
  
  const transformedData = (data || []).map(booking => enhanceBooking(booking));
  
  return transformedData;
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchOwners = async (): Promise<Owner[]> => {
  const { data, error } = await supabase
    .from('owners')
    .select('*');
  
  if (error) {
    console.error('Error fetching owners:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchCleaningTasks = async (): Promise<CleaningTask[]> => {
  const { data, error } = await supabase
    .from('cleaning_tasks')
    .select('*, rooms(number, property:type), users(name)');
  
  if (error) {
    console.error('Error fetching cleaning tasks:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchPropertyOwnership = async (): Promise<PropertyOwnership[]> => {
  const { data, error } = await supabase
    .from('property_ownership')
    .select('*, rooms(number), owners(name)');
  
  if (error) {
    console.error('Error fetching property ownership:', error);
    throw error;
  }
  
  return data || [];
};

export const updateBookingStatus = async (id: string, status: string): Promise<void> => {
  const validStatus = status as "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
  
  const { error } = await supabase
    .from('bookings')
    .update({ status: validStatus })
    .eq('id', id);
  
  if (error) {
    console.error(`Error updating booking status for ID ${id}:`, error);
    throw error;
  }
};

export const updateRoomStatus = async (id: string, status: string): Promise<void> => {
  const validStatus = status as "available" | "occupied" | "cleaning" | "maintenance" | "out-of-order";
  
  const { error } = await supabase
    .from('rooms')
    .update({ status: validStatus })
    .eq('id', id);
  
  if (error) {
    console.error(`Error updating room status for ID ${id}:`, error);
    throw error;
  }
};

export const updateCleaningTaskStatus = async (id: string, status: string): Promise<void> => {
  const validStatus = status as "pending" | "in-progress" | "completed" | "verified" | "issues";
  
  const { error } = await supabase
    .from('cleaning_tasks')
    .update({ status: validStatus })
    .eq('id', id);
  
  if (error) {
    console.error(`Error updating cleaning task status for ID ${id}:`, error);
    throw error;
  }
};

// Property API Functions
export const fetchProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*');
  
  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const createProperty = async (propertyData: any) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }
  
  return data;
};

export const updateProperty = async (id: string, propertyData: any) => {
  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating property with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting property with ID ${id}:`, error);
    throw error;
  }
};

// Room Type API Functions
export const fetchRoomTypes = async () => {
  const { data, error } = await supabase
    .from('room_types')
    .select('*, properties(name)');
  
  if (error) {
    console.error('Error fetching room types:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchRoomTypeById = async (id: string) => {
  const { data, error } = await supabase
    .from('room_types')
    .select('*, properties(name)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching room type with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const createRoomType = async (roomTypeData: any) => {
  const { data, error } = await supabase
    .from('room_types')
    .insert([roomTypeData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating room type:', error);
    throw error;
  }
  
  return data;
};

export const updateRoomType = async (id: string, roomTypeData: any) => {
  const { data, error } = await supabase
    .from('room_types')
    .update(roomTypeData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating room type with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const deleteRoomType = async (id: string) => {
  const { error } = await supabase
    .from('room_types')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting room type with ID ${id}:`, error);
    throw error;
  }
};
