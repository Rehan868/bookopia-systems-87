
import { supabase } from '@/integrations/supabase/client';
import { Booking, Guest, Room } from '@/services/supabase-types';

// Export the API functions
export const fetchRooms = async () => {
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      *,
      properties(name, address),
      room_types(name, description, base_rate)
    `)
    .order('number', { ascending: true });

  if (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }

  return data;
};

export const fetchRoom = async (id: string) => {
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      *,
      properties(name, address),
      room_types(name, description, base_rate)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching room:', error);
    throw error;
  }

  return data;
};

export const updateBookingStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }

  return { success: true, data };
};

export const deleteBooking = async (id: string) => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }

  return { success: true };
};

export const saveBooking = async (bookingData: Partial<Booking>, guestData: Partial<Guest>) => {
  // Start a transaction
  let guestId = guestData.id;
  
  try {
    // If no guest ID is provided, create a new guest
    if (!guestId) {
      const { data: guest, error: guestError } = await supabase
        .from('guests')
        .insert({
          first_name: guestData.first_name,
          last_name: guestData.last_name,
          email: guestData.email,
          phone: guestData.phone,
          address: guestData.address,
          city: guestData.city,
          state: guestData.state,
          country: guestData.country,
          passport_number: guestData.passport_number
        })
        .select()
        .single();
      
      if (guestError) throw guestError;
      guestId = guest.id;
    }

    // Generate a reference number if not provided
    const reference = bookingData.reference || `BK-${Date.now().toString().slice(-6)}`;
    
    // Create or update the booking
    const bookingPayload = {
      ...bookingData,
      reference,
      guest_id: guestId,
      guest_name: `${guestData.first_name} ${guestData.last_name}`,
      guest_email: guestData.email,
      guest_phone: guestData.phone
    };
    
    let result;
    if (bookingData.id) {
      // Update existing booking
      const { data, error } = await supabase
        .from('bookings')
        .update(bookingPayload)
        .eq('id', bookingData.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Create new booking
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingPayload)
        .select()
        .single();
      
      if (error) throw error;
      result = data;

      // Update room status if booking is active
      if (bookingData.status === 'checked_in') {
        await supabase
          .from('rooms')
          .update({ status: 'occupied' })
          .eq('id', bookingData.room_id);
      }
    }
    
    return { 
      success: true, 
      id: result.id 
    };
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

// Fix the build errors by updating use-toast.ts
