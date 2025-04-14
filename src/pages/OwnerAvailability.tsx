
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { User, Calendar as CalendarIcon, Clock, Phone } from 'lucide-react';

const OwnerAvailability = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // In a real app, this would be fetched from the backend
  const getRoomStatus = (date: Date): Array<{
    roomNumber: string;
    status: string;
    guest?: string;
    checkIn?: string;
    checkOut?: string;
    phone?: string;
  }> => {
    // Mock data - would come from API based on selected date
    return [
      {
        roomNumber: '101',
        status: 'booked',
        guest: 'John Smith',
        checkIn: '2025-04-14',
        checkOut: '2025-04-16',
        phone: '+1 (555) 123-4567'
      },
      { 
        roomNumber: '102',
        status: 'available'
      },
      { 
        roomNumber: '103',
        status: 'available'
      },
      {
        roomNumber: '104',
        status: 'booked',
        guest: 'Emma Johnson',
        checkIn: '2025-04-13',
        checkOut: '2025-04-15',
        phone: '+1 (555) 987-6543'
      },
      {
        roomNumber: '201',
        status: 'maintenance'
      },
      { 
        roomNumber: '202',
        status: 'available'
      },
      {
        roomNumber: '203',
        status: 'booked',
        guest: 'Michael Brown',
        checkIn: '2025-04-12',
        checkOut: '2025-04-18',
        phone: '+1 (555) 456-7890'
      },
      {
        roomNumber: '204',
        status: 'booked',
        guest: 'Sarah Davis',
        checkIn: '2025-04-10',
        checkOut: '2025-04-20',
        phone: '+1 (555) 234-5678'
      },
      { 
        roomNumber: '301',
        status: 'available'
      },
      { 
        roomNumber: '302',
        status: 'available'
      },
      {
        roomNumber: '303',
        status: 'maintenance'
      },
      { 
        roomNumber: '304',
        status: 'available'
      },
    ];
  };
  
  // Get status for the selected date
  const rooms = date ? getRoomStatus(date) : [];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Availability Calendar</h1>
        <p className="text-muted-foreground mt-1">Check room availability for your properties</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? `Room Status for ${format(date, 'MMMM d, yyyy')}` : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <HoverCard key={room.roomNumber}>
                  <HoverCardTrigger asChild>
                    <div 
                      className={`p-4 rounded-md border cursor-pointer transition-all hover:shadow-md ${
                        room.status === 'available' ? 'bg-green-50 border-green-200' :
                        room.status === 'booked' ? 'bg-red-50 border-red-200' :
                        'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="font-medium">Room {room.roomNumber}</div>
                      <div className={`text-sm ${
                        room.status === 'available' ? 'text-green-700' :
                        room.status === 'booked' ? 'text-red-700' :
                        'text-yellow-700'
                      }`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  
                  {room.status === 'booked' && (
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Booking Details</h4>
                          
                          <div className="flex items-center pt-2">
                            <User className="h-4 w-4 opacity-70 mr-2" />
                            <p className="text-sm">
                              <span className="text-muted-foreground">Guest:</span> {room.guest}
                            </p>
                          </div>
                          
                          <div className="flex items-center pt-1">
                            <CalendarIcon className="h-4 w-4 opacity-70 mr-2" />
                            <p className="text-sm">
                              <span className="text-muted-foreground">Stay:</span> {format(new Date(room.checkIn!), 'MMM d')} - {format(new Date(room.checkOut!), 'MMM d, yyyy')}
                            </p>
                          </div>
                          
                          <div className="flex items-center pt-1">
                            <Clock className="h-4 w-4 opacity-70 mr-2" />
                            <p className="text-sm">
                              <span className="text-muted-foreground">Status:</span> {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                            </p>
                          </div>
                          
                          <div className="flex items-center pt-1">
                            <Phone className="h-4 w-4 opacity-70 mr-2" />
                            <p className="text-sm">
                              <span className="text-muted-foreground">Contact:</span> {room.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  )}
                  
                  {room.status === 'maintenance' && (
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Maintenance Information</h4>
                        <p className="text-sm">This room is currently undergoing maintenance and is not available for booking.</p>
                        <p className="text-sm text-muted-foreground mt-2">Expected to be available again in 3 days.</p>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerAvailability;
