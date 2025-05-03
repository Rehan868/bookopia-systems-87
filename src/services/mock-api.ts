
import { 
  Booking, 
  Room, 
  Guest, 
  User, 
  Owner, 
  Expense, 
  CleaningTask,
  PropertyOwnership 
} from './supabase-types';
import { bookings, rooms, owners, users, expenses, cleaningStatus as cleaningTasks, properties, ownerRooms } from '@/lib/mock-data';

// Helper function to enhance a booking with calculated fields and derived properties
function enhanceBooking(booking: any): Booking {
  const totalAmount = Number(booking.amount || 0);
  
  return {
    ...booking,
    guest_name: booking.guest_name || '',
    guest_email: booking.guest_email || booking.guestEmail || '',
    guest_phone: booking.guest_phone || booking.guestPhone || '',
    reference: booking.booking_number || '',
    booking_ref: booking.booking_number || '',
    check_in_date: booking.check_in || '',
    check_out_date: booking.check_out || '',
    total_amount: totalAmount,
    pending_amount: totalAmount - (booking.amountPaid || 0),
    amount_paid: booking.amountPaid || 0,
    base_rate: booking.baseRate || 150,
    security_deposit: booking.securityDeposit || 0,
    commission: booking.commission || 0,
    tourism_fee: booking.tourismFee || 0,
    vat: booking.vat || 0,
    net_to_owner: booking.netToOwner || 0,
    rooms: {
      number: booking.rooms?.number || '',
      property_id: booking.rooms?.property || '',
      property_name: booking.rooms?.property || '',
    },
    guest_document: booking.guestDocument || null,
  } as Booking;
}

// Fetch all rooms
export const fetchRooms = async (): Promise<Room[]> => {
  return rooms.map(room => ({
    ...room,
    property: room.property,
    max_adults: 2,
    max_children: 2,
    size: 30,
    base_rate: 150,
  } as unknown as Room));
};

// Fetch room by ID
export const fetchRoomById = async (id: string): Promise<Room> => {
  const room = rooms.find(room => room.id === id);
  
  if (!room) {
    throw new Error(`Room with ID ${id} not found`);
  }
  
  return {
    ...room,
    property: room.property,
    max_adults: 2,
    max_children: 2,
    size: 30,
    base_rate: 150,
  } as unknown as Room;
};

// Fetch room by number
export const fetchRoomByNumber = async (number: string): Promise<Room> => {
  const room = rooms.find(room => room.number === number);
  
  if (!room) {
    throw new Error(`Room with number ${number} not found`);
  }
  
  return {
    ...room,
    property: room.property,
    max_adults: 2,
    max_children: 2,
    size: 30,
    base_rate: 150,
  } as unknown as Room;
};

// Fetch all bookings
export const fetchBookings = async (): Promise<Booking[]> => {
  return bookings.map(booking => enhanceBooking(booking));
};

// Fetch booking by ID
export const fetchBookingById = async (id: string): Promise<Booking> => {
  const booking = bookings.find(booking => booking.id === id);
  
  if (!booking) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  return enhanceBooking(booking);
};

// Create a new booking
export const createBooking = async (bookingData: Partial<Booking>, guestData: Partial<Guest>): Promise<Booking> => {
  const newId = `b${bookings.length + 1}`;
  const newBookingNumber = `BK-${new Date().getFullYear()}-${String(bookings.length + 1).padStart(4, '0')}`;
  
  const newBooking = {
    id: newId,
    booking_number: newBookingNumber,
    reference: newBookingNumber,
    booking_ref: newBookingNumber,
    guest_name: `${guestData.first_name || ''} ${guestData.last_name || ''}`.trim(),
    guest_email: guestData.email || '',
    guest_phone: guestData.phone || '',
    check_in: bookingData.check_in_date || new Date().toISOString(),
    check_out: bookingData.check_out_date || new Date().toISOString(),
    check_in_date: bookingData.check_in_date || new Date().toISOString(),
    check_out_date: bookingData.check_out_date || new Date().toISOString(),
    status: bookingData.status || 'confirmed',
    payment_status: bookingData.payment_status || 'paid',
    amount: bookingData.total_amount || 0,
    total_amount: bookingData.total_amount || 0,
    amountPaid: bookingData.amount_paid || 0,
    amount_paid: bookingData.amount_paid || 0,
    rooms: {
      number: bookingData.rooms?.number || '',
      property: bookingData.rooms?.property_id || '',
      property_name: bookingData.rooms?.property_name || '',
    },
    adults: bookingData.adults || 2,
    children: bookingData.children || 0,
    baseRate: bookingData.base_rate || 150,
    base_rate: bookingData.base_rate || 150,
    securityDeposit: bookingData.security_deposit || 0,
    security_deposit: bookingData.security_deposit || 0,
    commission: bookingData.commission || 0,
    tourismFee: bookingData.tourism_fee || 0,
    tourism_fee: bookingData.tourism_fee || 0,
    vat: bookingData.vat || 0,
    netToOwner: bookingData.net_to_owner || 0,
    net_to_owner: bookingData.net_to_owner || 0,
    notes: bookingData.notes || '',
    room_id: bookingData.room_id || '',
    guest_id: 'g1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  bookings.push(newBooking as any);
  
  return enhanceBooking(newBooking);
};

// Update booking
export const updateBooking = async (id: string, bookingData: Partial<Booking>, guestData?: Partial<Guest>): Promise<Booking> => {
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  // Update the booking
  bookings[index] = {
    ...bookings[index],
    ...bookingData,
    check_in: bookingData.check_in_date || bookings[index].check_in,
    check_out: bookingData.check_out_date || bookings[index].check_out,
    amount: bookingData.total_amount || bookings[index].amount,
    amountPaid: bookingData.amount_paid || bookings[index].amountPaid,
    baseRate: bookingData.base_rate || bookings[index].baseRate,
    securityDeposit: bookingData.security_deposit || bookings[index].securityDeposit,
    tourismFee: bookingData.tourism_fee || bookings[index].tourismFee,
    netToOwner: bookingData.net_to_owner || bookings[index].netToOwner,
    updated_at: new Date().toISOString(),
  } as any;
  
  return enhanceBooking(bookings[index]);
};

// Delete booking
export const deleteBooking = async (id: string): Promise<void> => {
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  bookings.splice(index, 1);
};

// Fetch today's check-ins
export const fetchTodayCheckins = async (): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];
  
  const todayCheckins = bookings
    .filter(booking => 
      booking.check_in.split('T')[0] === today && 
      booking.status === 'confirmed'
    );
  
  return todayCheckins.map(booking => enhanceBooking(booking));
};

// Fetch today's check-outs
export const fetchTodayCheckouts = async (): Promise<Booking[]> => {
  const today = new Date().toISOString().split('T')[0];
  
  const todayCheckouts = bookings
    .filter(booking => 
      booking.check_out.split('T')[0] === today && 
      booking.status === 'checked_in'
    );
  
  return todayCheckouts.map(booking => enhanceBooking(booking));
};

// Fetch users
export const fetchUsers = async (): Promise<User[]> => {
  return users as unknown as User[];
};

// Fetch owners
export const fetchOwners = async (): Promise<Owner[]> => {
  return owners as unknown as Owner[];
};

// Fetch expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  return expenses.map(expense => ({
    ...expense,
    owner: expense.vendor || '',
  })) as unknown as Expense[];
};

// Fetch cleaning tasks
export const fetchCleaningTasks = async (): Promise<CleaningTask[]> => {
  return cleaningTasks as unknown as CleaningTask[];
};

// Fetch property ownership
export const fetchPropertyOwnership = async (): Promise<PropertyOwnership[]> => {
  return ownerRooms as unknown as PropertyOwnership[];
};

// Update booking status
export const updateBookingStatus = async (id: string, status: string): Promise<void> => {
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  bookings[index].status = status;
};

// Update room status
export const updateRoomStatus = async (id: string, status: string): Promise<void> => {
  const index = rooms.findIndex(room => room.id === id);
  
  if (index === -1) {
    throw new Error(`Room with ID ${id} not found`);
  }
  
  rooms[index].status = status as any;
};

// Update cleaning task status
export const updateCleaningTaskStatus = async (id: string, status: string): Promise<void> => {
  const index = cleaningTasks.findIndex(task => task.id === id);
  
  if (index === -1) {
    throw new Error(`Cleaning task with ID ${id} not found`);
  }
  
  cleaningTasks[index].status = status;
};

// Property API Functions
export const fetchProperties = async () => {
  return properties;
};

export const fetchPropertyById = async (id: string) => {
  const property = properties.find(property => property.id === id);
  
  if (!property) {
    throw new Error(`Property with ID ${id} not found`);
  }
  
  return property;
};

export const createProperty = async (propertyData: any) => {
  const newId = `p${properties.length + 1}`;
  const newProperty = {
    ...propertyData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  properties.push(newProperty);
  
  return newProperty;
};

export const updateProperty = async (id: string, propertyData: any) => {
  const index = properties.findIndex(property => property.id === id);
  
  if (index === -1) {
    throw new Error(`Property with ID ${id} not found`);
  }
  
  properties[index] = {
    ...properties[index],
    ...propertyData,
    updated_at: new Date().toISOString(),
  };
  
  return properties[index];
};

export const deleteProperty = async (id: string) => {
  const index = properties.findIndex(property => property.id === id);
  
  if (index === -1) {
    throw new Error(`Property with ID ${id} not found`);
  }
  
  properties.splice(index, 1);
};

// Room Type API Functions
export const fetchRoomTypes = async () => {
  // Mocked room types based on rooms
  const roomTypes = [
    { id: 'rt1', name: 'Standard Room', property_id: 'p1' },
    { id: 'rt2', name: 'Deluxe Suite', property_id: 'p1' },
    { id: 'rt3', name: 'Executive Suite', property_id: 'p2' },
  ];
  
  return roomTypes;
};

export const fetchRoomTypeById = async (id: string) => {
  const roomTypes = await fetchRoomTypes();
  const roomType = roomTypes.find(rt => rt.id === id);
  
  if (!roomType) {
    throw new Error(`Room type with ID ${id} not found`);
  }
  
  return roomType;
};

export const createRoomType = async (roomTypeData: any) => {
  const roomTypes = await fetchRoomTypes();
  const newId = `rt${roomTypes.length + 1}`;
  
  const newRoomType = {
    ...roomTypeData,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  return newRoomType;
};

export const updateRoomType = async (id: string, roomTypeData: any) => {
  const roomTypes = await fetchRoomTypes();
  const index = roomTypes.findIndex(rt => rt.id === id);
  
  if (index === -1) {
    throw new Error(`Room type with ID ${id} not found`);
  }
  
  const updatedRoomType = {
    ...roomTypes[index],
    ...roomTypeData,
    updated_at: new Date().toISOString(),
  };
  
  return updatedRoomType;
};

export const deleteRoomType = async (id: string) => {
  // Mock implementation without actual deletion
};
