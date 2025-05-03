
export type Room = {
  id: string;
  number: string;
  property_id: string;
  room_type_id: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  floor: string;
  size: number | null;
  description: string | null;
  max_adults: number;
  max_children: number;
  base_rate: number;
  active: boolean;
  notes: string | null;
  amenities: any;
  image_urls: string[] | null;
  created_at: string;
  updated_at: string;
  property?: string;
  maintenance?: boolean;
  lastCleaned?: string;
  nextCheckIn?: string | null;
};

export type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  nationality: string | null;
  passport_number: string | null;
  id_document_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  reference: string;
  booking_ref: string;
  room_id: string;
  guest_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_document: string | null;
  check_in_date: string;
  check_out_date: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  base_rate: number;
  total_amount: number;
  security_deposit: number;
  commission: number;
  tourism_fee: number;
  vat: number;
  net_to_owner: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  amount_paid: number;
  pending_amount?: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
  rooms?: {
    number: string;
    property_id: string;
    property_name: string;
  };
  guests?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url: string | null;
  last_active: string | null;
  created_at: string;
  updated_at: string;
};

export type Owner = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  payment_info: any;
  created_at: string;
  updated_at: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  property: string;
  vendor: string;
  paymentMethod: string;
  receipt: string | null;
  status: string;
  owner: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CleaningTask = {
  id: string;
  room_id: string;
  date: string;
  assigned_to: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type PropertyOwnership = {
  id: string;
  room_id: string;
  owner_id: string;
  commission_rate: number;
  contract_start_date: string;
  contract_end_date: string | null;
  created_at: string;
  updated_at: string;
};
