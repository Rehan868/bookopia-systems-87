import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DateRange } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { CalendarIcon, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useBooking } from '@/hooks/useBookings';
import { fetchRooms, saveBooking } from '@/services/api';
import { Booking, Guest, Room } from '@/services/supabase-types';

interface BookingFormData {
  reference: string;
  room_id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  property: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  base_rate: number;
  total_amount: number;
  security_deposit: number;
  commission: number;
  tourism_fee: number;
  vat: number;
  net_to_owner: number;
  notes: string;
  status: string;
  payment_status: string;
  sendConfirmation: boolean;
  guestDocument?: File | null;
  amount_paid: number;
}

interface AddEditBookingFormProps {
  mode: 'add' | 'edit';
  bookingId?: string;
  defaultValues?: any;
}

// Helper function to ensure values are numbers
const ensureNumber = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export function AddEditBookingForm({ mode, bookingId, defaultValues }: AddEditBookingFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: bookingData, isLoading, error } = useBooking(mode === 'edit' ? bookingId || '' : '');
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState<boolean>(true);
  
  // Initialize form data from defaultValues or with defaults
  const [formData, setFormData] = useState<BookingFormData>({
    reference: mode === 'edit' ? '' : `BK-${Date.now().toString().slice(-6)}`,
    room_id: '',
    guestFirstName: '',
    guestLastName: '',
    guestEmail: '',
    guestPhone: '',
    property: '',
    roomNumber: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
    adults: 2,
    children: 0,
    base_rate: 0,
    total_amount: 0,
    security_deposit: 100,
    commission: 0,
    tourism_fee: 0,
    vat: 0,
    net_to_owner: 0,
    notes: '',
    status: 'confirmed',
    payment_status: 'pending',
    sendConfirmation: true,
    guestDocument: null,
    amount_paid: 0,
  });
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: formData.checkIn,
    to: formData.checkOut,
  });
  
  // Load rooms data
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const roomsData = await fetchRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error loading rooms:', error);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    
    loadRooms();
  }, []);
  
  // Populate form with booking data when in edit mode
  useEffect(() => {
    if (mode === 'edit' && (defaultValues || bookingData)) {
      const data = defaultValues || bookingData;
      if (!data) return;
      
      let firstN = '';
      let lastN = '';
      
      // Extract first and last name from the guest data
      if (data.guests) {
        firstN = data.guests.first_name || '';
        lastN = data.guests.last_name || '';
      } else if (data.guest_name) {
        // If we only have a combined name, make a best guess at splitting it
        const nameParts = data.guest_name.split(' ');
        if (nameParts.length > 1) {
          firstN = nameParts[0];
          lastN = nameParts.slice(1).join(' ');
        } else {
          firstN = nameParts[0];
        }
      }
      
      setFormData({
        reference: data.reference || '',
        room_id: data.room_id || '',
        guestFirstName: firstN,
        guestLastName: lastN,
        guestEmail: data.guests?.email || '',
        guestPhone: data.guests?.phone || '',
        property: '',  // Will be set when rooms are loaded
        roomNumber: data.rooms?.number || '',
        checkIn: data.check_in_date ? parseISO(data.check_in_date) : new Date(),
        checkOut: data.check_out_date ? parseISO(data.check_out_date) : new Date(),
        adults: ensureNumber(data.adults) || 2,
        children: ensureNumber(data.children) || 0,
        base_rate: ensureNumber(data.base_rate) || 0,
        total_amount: ensureNumber(data.total_amount) || 0,
        security_deposit: ensureNumber(data.security_deposit) || 100,
        commission: ensureNumber(data.commission) || 0,
        tourism_fee: ensureNumber(data.tourism_fee) || 0,
        vat: ensureNumber(data.vat) || 0,
        net_to_owner: ensureNumber(data.net_to_owner) || 0,
        notes: data.notes || '',
        status: data.status || 'confirmed',
        payment_status: data.payment_status || 'pending',
        sendConfirmation: true,
        guestDocument: null,
        amount_paid: ensureNumber(data.amount_paid) || 0,
      });
      
      setDateRange({
        from: data.check_in_date ? parseISO(data.check_in_date) : new Date(),
        to: data.check_out_date ? parseISO(data.check_out_date) : new Date(),
      });
    }
  }, [bookingData, defaultValues, mode]);
  
  // Set property based on room selection when rooms are loaded
  useEffect(() => {
    if (rooms.length > 0 && formData.room_id) {
      const selectedRoom = rooms.find(room => room.id === formData.room_id);
      if (selectedRoom) {
        setFormData(prev => ({
          ...prev,
          roomNumber: selectedRoom.number,
          property: selectedRoom.property || '',
          base_rate: selectedRoom.base_rate || prev.base_rate
        }));
      }
    }
  }, [formData.room_id, rooms]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ensureNumber(value),
    }));
    
    // Recalculate amounts if base_rate changes
    if (name === 'base_rate') {
      recalculateAmounts(ensureNumber(value));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        guestDocument: e.target.files![0]
      }));
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      sendConfirmation: checked,
    });
  };
  
  const handleRoomChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      room_id: value
    }));
    
    const selectedRoom = rooms.find(room => room.id === value);
    if (selectedRoom) {
      setFormData(prev => ({
        ...prev,
        roomNumber: selectedRoom.number,
        property: selectedRoom.property || '',
        base_rate: selectedRoom.base_rate || prev.base_rate
      }));
      
      recalculateAmounts(selectedRoom.base_rate);
    }
  };
  
  const recalculateAmounts = (baseRate: number) => {
    const nights = getNumberOfNights();
    const totalAmount = baseRate * nights;
    const vat = totalAmount * 0.05; // 5% VAT
    const tourismFee = totalAmount * 0.03; // 3% Tourism Fee
    const commission = totalAmount * 0.1; // 10% Commission
    const netToOwner = totalAmount - vat - tourismFee - commission;
    
    setFormData(prev => ({
      ...prev,
      base_rate: baseRate,
      total_amount: totalAmount,
      vat: vat,
      tourism_fee: tourismFee,
      commission: commission,
      net_to_owner: netToOwner
    }));
  };
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setDateRange(range);
      setFormData(prev => {
        const updatedData = {
          ...prev,
          checkIn: range.from!,
          checkOut: range.to || range.from,
        };
        
        // Recalculate amounts based on new date range
        if (range.to) {
          const nights = Math.round((range.to.getTime() - range.from!.getTime()) / (1000 * 60 * 60 * 24));
          const baseRate = ensureNumber(prev.base_rate);
          const totalAmount = baseRate * nights;
          const vat = totalAmount * 0.05; // 5% VAT
          const tourismFee = totalAmount * 0.03; // 3% Tourism Fee
          const commission = totalAmount * 0.1; // 10% Commission
          const netToOwner = totalAmount - vat - tourismFee - commission;
          
          return {
            ...updatedData,
            total_amount: totalAmount,
            vat,
            tourism_fee: tourismFee,
            commission,
            net_to_owner: netToOwner,
          };
        }
        
        return updatedData;
      });
    }
  };
  
  const getNumberOfNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round(Math.abs(formData.checkOut.getTime() - formData.checkIn.getTime()) / msPerDay);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the booking data for the API
      const bookingPayload: Partial<Booking> = {
        room_id: formData.room_id,
        check_in_date: formData.checkIn.toISOString().split('T')[0],
        check_out_date: formData.checkOut.toISOString().split('T')[0],
        adults: formData.adults,
        children: formData.children,
        base_rate: formData.base_rate,
        total_amount: formData.total_amount,
        security_deposit: formData.security_deposit,
        commission: formData.commission,
        tourism_fee: formData.tourism_fee,
        vat: formData.vat,
        net_to_owner: formData.net_to_owner,
        status: formData.status as 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show',
        payment_status: formData.payment_status as 'pending' | 'partial' | 'paid' | 'refunded',
        amount_paid: formData.amount_paid,
        notes: formData.notes
      };
      
      // Prepare the guest data
      const guestPayload: Partial<Guest> = {
        first_name: formData.guestFirstName,
        last_name: formData.guestLastName,
        email: formData.guestEmail || null,
        phone: formData.guestPhone || null
      };
      
      // Save the booking
      await saveBooking(bookingPayload, guestPayload);
      
      toast({
        title: mode === 'add' ? "Booking Created" : "Booking Updated",
        description: `The booking for ${formData.guestFirstName} ${formData.guestLastName} has been ${mode === 'add' ? 'created' : 'updated'} successfully.`,
      });
      
      navigate('/bookings');
    } catch (error) {
      console.error('Error saving booking:', error);
      toast({
        title: "Error",
        description: `There was a problem ${mode === 'add' ? 'creating' : 'updating'} the booking. Please try again.`,
        variant: "destructive"
      });
    }
  };
  
  // Format a number for display, handling potential non-numeric values
  const formatNumber = (value: any): string => {
    const num = ensureNumber(value);
    return num.toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading booking data...</span>
      </div>
    );
  }

  if (mode === 'edit' && error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Error loading booking data</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/bookings')}
        >
          Back to Bookings
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{mode === 'add' ? 'Add New Booking' : 'Edit Booking'}</h1>
        <p className="text-muted-foreground mt-1">
          {mode === 'add' ? 'Create a new booking' : `Edit booking ${formData.reference}`}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
              <CardDescription>Enter the guest's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference">Booking Reference</Label>
                  <Input
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Booking Status</Label>
                  <Select name="status" value={formData.status} onValueChange={value => setFormData({...formData, status: value})}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="checked_in">Checked In</SelectItem>
                      <SelectItem value="checked_out">Checked Out</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no_show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestFirstName">First Name*</Label>
                  <Input
                    id="guestFirstName"
                    name="guestFirstName"
                    value={formData.guestFirstName}
                    onChange={handleInputChange}
                    placeholder="Enter guest's first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestLastName">Last Name*</Label>
                  <Input
                    id="guestLastName"
                    name="guestLastName"
                    value={formData.guestLastName}
                    onChange={handleInputChange}
                    placeholder="Enter guest's last name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestEmail">Email Address</Label>
                  <Input
                    id="guestEmail"
                    name="guestEmail"
                    type="email"
                    value={formData.guestEmail}
                    onChange={handleInputChange}
                    placeholder="guest@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Phone Number</Label>
                  <Input
                    id="guestPhone"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guestDocument">Guest ID/Passport</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="guestDocument"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  {formData.guestDocument && (
                    <p className="text-sm text-muted-foreground">
                      {formData.guestDocument.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Overview of the current booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="font-medium text-blue-800">Stay Information</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>Check-in</div>
                    <div className="text-right font-medium">
                      {formData.checkIn ? format(formData.checkIn, 'MMM dd, yyyy') : 'Not set'}
                    </div>
                    <div>Check-out</div>
                    <div className="text-right font-medium">
                      {formData.checkOut ? format(formData.checkOut, 'MMM dd, yyyy') : 'Not set'}
                    </div>
                    <div>Nights</div>
                    <div className="text-right font-medium">{getNumberOfNights()}</div>
                    <div>Guests</div>
                    <div className="text-right font-medium">
                      {formData.adults + formData.children} ({formData.adults} adults, {formData.children} children)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Base Rate:</span>
                    <span>${formatNumber(formData.base_rate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Nights:</span>
                    <span>× {getNumberOfNights()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Amount:</span>
                    <span>${formatNumber(formData.total_amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Security Deposit:</span>
                    <span>${formatNumber(formData.security_deposit)}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grand Total:</span>
                    <span>${formatNumber(formData.total_amount + formData.security_deposit)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Payment Status:</span>
                    <Select name="payment_status" value={formData.payment_status} onValueChange={value => setFormData({...formData, payment_status: value})}>
                      <SelectTrigger className="h-7 w-24">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="sendConfirmation"
                  checked={formData.sendConfirmation}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="sendConfirmation"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Send confirmation email to guest
                </label>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Enter the booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room_id">Room*</Label>
                {isLoadingRooms ? (
                  <div className="flex items-center">
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Loading rooms...</span>
                  </div>
                ) : (
                  <Select name="room_id" value={formData.room_id} onValueChange={handleRoomChange} required>
                    <SelectTrigger id="room_id">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.number} - {room.property || 'Unknown Property'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Booking Dates*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select booking dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults">Adults*</Label>
                  <Input
                    id="adults"
                    name="adults"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.adults}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Children</Label>
                  <Input
                    id="children"
                    name="children"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.children}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Payment information and calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base_rate">Base Rate (per night)*</Label>
                <Input
                  id="base_rate"
                  name="base_rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.base_rate}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="commission">Commission*</Label>
                <Input
                  id="commission"
                  name="commission"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.commission}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourism_fee">Tourism Fee*</Label>
                <Input
                  id="tourism_fee"
                  name="tourism_fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.tourism_fee}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat">VAT*</Label>
                <Input
                  id="vat"
                  name="vat"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.vat}
                  onChange={handleNumberChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="net_to_owner">Net To Owner*</Label>
                <Input
                  id="net_to_owner"
                  name="net_to_owner"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.net_to_owner}
                  onChange={handleNumberChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security_deposit">Security Deposit</Label>
                <Input
                  id="security_deposit"
                  name="security_deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.security_deposit}
                  onChange={handleNumberChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount_paid">Amount Paid by Guest</Label>
                <Input
                  id="amount_paid"
                  name="amount_paid"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount_paid}
                  onChange={handleNumberChange}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-semibold">${formatNumber(formData.total_amount + formData.security_deposit)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                    <p className="text-lg font-semibold text-red-600">
                      ${formatNumber(formData.total_amount + formData.security_deposit - formData.amount_paid)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Add any additional notes or special requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter any special requests or notes about this booking"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/bookings')}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Create Booking' : 'Update Booking'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
