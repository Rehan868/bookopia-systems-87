
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { 
  ArrowUpRight, 
  CalendarPlus, 
  CreditCard, 
  LogOut, 
  Trash2,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for bookings - in a real app this would come from an API call specific to the owner
const bookings = [
  {
    id: '1',
    guest_name: 'John Smith',
    room_number: '101',
    property: 'Beachfront Villa',
    check_in: '2025-04-10T14:00:00',
    check_out: '2025-04-15T10:00:00',
    status: 'confirmed',
    amount: 1250.00,
  },
  {
    id: '2',
    guest_name: 'Emma Johnson',
    room_number: '205',
    property: 'Mountain View Lodge',
    check_in: '2025-04-12T15:00:00',
    check_out: '2025-04-14T11:00:00',
    status: 'confirmed',
    amount: 450.00,
  },
  {
    id: '3',
    guest_name: 'Michael Brown',
    room_number: '103',
    property: 'Beachfront Villa',
    check_in: '2025-04-20T14:00:00',
    check_out: '2025-04-25T10:00:00',
    status: 'pending',
    amount: 1350.00,
  },
  {
    id: '4',
    guest_name: 'Sarah Davis',
    room_number: '302',
    property: 'Downtown Heights',
    check_in: '2025-05-01T15:00:00',
    check_out: '2025-05-03T11:00:00',
    status: 'confirmed',
    amount: 390.00,
  },
  {
    id: '5',
    guest_name: 'Robert Wilson',
    room_number: '104',
    property: 'Beachfront Villa',
    check_in: '2025-05-10T14:00:00',
    check_out: '2025-05-15T10:00:00',
    status: 'cancelled',
    amount: 1250.00,
  },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  checked_in: "bg-blue-100 text-blue-800 border-blue-200",
  checked_out: "bg-gray-100 text-gray-800 border-gray-200",
};

const OwnerBookings = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [bookingToDelete, setBookingToDelete] = React.useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  
  const handleDeleteBooking = (id: string) => {
    setBookingToDelete(id);
    setIsDeleteDialogOpen(true);
    setConfirmDelete(false);
  };
  
  const confirmDeleteBooking = () => {
    if (!confirmDelete) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please confirm by checking the box.",
      });
      return;
    }
    
    toast({
      title: "Booking deleted",
      description: `Booking #${bookingToDelete} has been deleted.`,
    });
    
    setIsDeleteDialogOpen(false);
    setBookingToDelete(null);
    setConfirmDelete(false);
  };
  
  const handleCheckout = (id: string) => {
    toast({
      title: "Guest checked out",
      description: `Guest for booking #${id} has been checked out.`,
    });
  };
  
  const handleUpdatePayment = (id: string) => {
    toast({
      title: "Update Payment",
      description: `Redirecting to payment update for booking #${id}.`,
    });
  };
  
  const handleExtendBooking = (id: string) => {
    toast({
      title: "Extend Booking",
      description: `Redirecting to booking extension for booking #${id}.`,
    });
  };
  
  const handleCheckIn = (id: string) => {
    toast({
      title: "Guest checked in",
      description: `Guest for booking #${id} has been checked in.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground mt-1">Manage reservations for your properties</p>
      </div>
      
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-muted/50 group">
                <TableCell className="font-medium">{booking.guest_name}</TableCell>
                <TableCell>{booking.property}</TableCell>
                <TableCell>{booking.room_number}</TableCell>
                <TableCell>{format(new Date(booking.check_in), 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(new Date(booking.check_out), 'MMM d, yyyy')}</TableCell>
                <TableCell>${booking.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColors[booking.status as keyof typeof statusColors]}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[220px]">
                      <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem asChild>
                        <Link to={`/owner/bookings/${booking.id}`}>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      {booking.status === 'confirmed' && (
                        <DropdownMenuItem onClick={() => handleCheckIn(booking.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Check In Guest</span>
                        </DropdownMenuItem>
                      )}
                      
                      {booking.status === 'checked_in' && (
                        <DropdownMenuItem onClick={() => handleCheckout(booking.id)}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Check Out Guest</span>
                        </DropdownMenuItem>
                      )}
                      
                      {['confirmed', 'pending'].includes(booking.status) && (
                        <>
                          <DropdownMenuItem onClick={() => handleUpdatePayment(booking.id)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Update Payment</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleExtendBooking(booking.id)}>
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            <span>Extend Duration</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600" 
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Booking</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="confirm-delete" 
                checked={confirmDelete}
                onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
              />
              <label 
                htmlFor="confirm-delete" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Yes, I want to permanently delete this booking
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteBooking}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerBookings;
