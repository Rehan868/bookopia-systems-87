
import { Booking, CleaningTask, Expense, Guest, Owner, PropertyOwnership, Room, User } from '@/services/supabase-types';

// Mock data for rooms
const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    property_id: '1',
    room_type_id: '1',
    status: 'available',
    floor: '1',
    size: 35,
    description: 'Deluxe Room with Sea View',
    max_adults: 2,
    max_children: 1,
    base_rate: 850,
    active: true,
    notes: null,
    amenities: ['wifi', 'tv', 'minibar', 'safe', 'bath'],
    image_urls: ['/placeholder.svg', '/placeholder.svg'],
    created_at: '2023-05-01T10:00:00Z',
    updated_at: '2023-05-15T14:30:00Z',
    property: 'Marina Heights',
    maintenance: false,
    lastCleaned: '2023-05-14T08:00:00Z',
    nextCheckIn: '2023-05-16T14:00:00Z',
  },
  {
    id: '2',
    number: '102',
    property_id: '1',
    room_type_id: '1',
    status: 'occupied',
    floor: '1',
    size: 35,
    description: 'Deluxe Room with City View',
    max_adults: 2,
    max_children: 1,
    base_rate: 800,
    active: true,
    notes: null,
    amenities: ['wifi', 'tv', 'minibar', 'safe'],
    image_urls: ['/placeholder.svg', '/placeholder.svg'],
    created_at: '2023-05-01T10:05:00Z',
    updated_at: '2023-05-15T14:35:00Z',
    property: 'Marina Heights',
    maintenance: false,
    lastCleaned: '2023-05-14T09:00:00Z',
    nextCheckIn: null,
  },
  {
    id: '3',
    number: '201',
    property_id: '1',
    room_type_id: '2',
    status: 'cleaning',
    floor: '2',
    size: 55,
    description: 'Suite with Balcony',
    max_adults: 3,
    max_children: 2,
    base_rate: 1200,
    active: true,
    notes: 'VIP guests prefer this room',
    amenities: ['wifi', 'tv', 'minibar', 'safe', 'bath', 'balcony'],
    image_urls: ['/placeholder.svg', '/placeholder.svg'],
    created_at: '2023-05-01T10:10:00Z',
    updated_at: '2023-05-15T14:40:00Z',
    property: 'Marina Heights',
    maintenance: false,
    lastCleaned: '2023-05-14T10:00:00Z',
    nextCheckIn: '2023-05-17T14:00:00Z',
  },
];

// Mock data for bookings
const bookings: Booking[] = [
  {
    id: '1',
    reference: 'BK-2023-0012',
    booking_ref: 'BK-2023-0012',
    room_id: '1',
    guest_id: '1',
    guest_name: 'John Smith',
    guest_email: 'john.smith@example.com',
    guest_phone: '+1 (555) 123-4567',
    guest_document: null,
    check_in_date: '2023-11-18',
    check_out_date: '2023-11-21',
    check_in: '2023-11-18T14:00:00Z',
    check_out: '2023-11-21T12:00:00Z',
    adults: 2,
    children: 0,
    base_rate: 850,
    total_amount: 2550,
    security_deposit: 500,
    commission: 255,
    tourism_fee: 76.5,
    vat: 127.5,
    net_to_owner: 2091,
    status: 'confirmed',
    payment_status: 'paid',
    amount_paid: 2550,
    notes: 'Guest requested a high floor with ocean view. Prefers quiet room away from elevator.',
    created_at: '2023-10-15T08:22:33Z',
    updated_at: '2023-10-15T08:22:33Z',
    created_by: 'admin',
    updated_by: null,
    rooms: {
      number: '101',
      property_id: '1',
      property_name: 'Marina Heights'
    },
    guests: {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567'
    }
  },
  {
    id: '2',
    reference: 'BK-2023-0013',
    booking_ref: 'BK-2023-0013',
    room_id: '2',
    guest_id: '2',
    guest_name: 'Sarah Johnson',
    guest_email: 'sarah.j@example.com',
    guest_phone: '+1 (555) 987-6543',
    guest_document: null,
    check_in_date: '2023-11-20',
    check_out_date: '2023-11-25',
    check_in: '2023-11-20T15:00:00Z',
    check_out: '2023-11-25T11:00:00Z',
    adults: 2,
    children: 1,
    base_rate: 800,
    total_amount: 4000,
    security_deposit: 500,
    commission: 400,
    tourism_fee: 120,
    vat: 200,
    net_to_owner: 3280,
    status: 'confirmed',
    payment_status: 'partial',
    amount_paid: 2000,
    notes: 'Family with young child. Requested extra pillows and crib.',
    created_at: '2023-10-16T09:15:27Z',
    updated_at: '2023-10-16T09:15:27Z',
    created_by: 'admin',
    updated_by: null,
    rooms: {
      number: '102',
      property_id: '1',
      property_name: 'Marina Heights'
    },
    guests: {
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543'
    }
  }
];

// Mock data for cleaning tasks
const cleaningTasks: CleaningTask[] = [
  {
    id: '1',
    room_id: '1',
    date: '2023-11-21T13:00:00Z',
    assigned_to: 'Maria Lopez',
    status: 'pending',
    notes: 'Standard cleaning after checkout',
    created_at: '2023-11-20T10:00:00Z',
    updated_at: '2023-11-20T10:00:00Z'
  },
  {
    id: '2',
    room_id: '3',
    date: '2023-11-18T13:00:00Z',
    assigned_to: 'Carlos Rodriguez',
    status: 'completed',
    notes: 'Deep cleaning with special attention to bathroom',
    created_at: '2023-11-17T09:00:00Z',
    updated_at: '2023-11-18T14:30:00Z'
  }
];

// Mock API functions
export const getRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(rooms), 500);
  });
};

export const getRoom = async (id: string): Promise<Room | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const room = rooms.find((r) => r.id === id) || null;
      resolve(room);
    }, 500);
  });
};

export const getBookings = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(bookings), 500);
  });
};

export const getBooking = async (id: string): Promise<Booking | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const booking = bookings.find((b) => b.id === id) || null;
      resolve(booking);
    }, 500);
  });
};

export const getTodayCheckins = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, filter by today's date
      resolve(bookings.filter(b => b.id === '1'));
    }, 500);
  });
};

export const getTodayCheckouts = async (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, filter by today's date
      resolve(bookings.filter(b => b.id === '2'));
    }, 500);
  });
};

export const getCleaningTasks = async (): Promise<CleaningTask[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cleaningTasks), 500);
  });
};

// Mock API for properties
export const getProperties = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: '1', name: 'Marina Heights', address: 'Dubai Marina', rooms: 15 },
      { id: '2', name: 'Downtown Residence', address: 'Downtown Dubai', rooms: 10 },
    ]), 500);
  });
};

// Mock API for room types
export const getRoomTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: '1', name: 'Standard Room', capacity: 2 },
      { id: '2', name: 'Deluxe Suite', capacity: 4 },
    ]), 500);
  });
};
