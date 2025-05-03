
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem 
} from '@/components/ui/select';

interface Room {
  id: string;
  number: string;
  name?: string;
  property_name?: string;
}

interface OwnerFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  sendInvite: boolean;
  selectedRooms: string[];
}

const OwnerAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { ownerSignup, user } = useAuth();
  const [formData, setFormData] = useState<OwnerFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    sendInvite: true,
    selectedRooms: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available rooms
  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data: roomsData, error } = await supabase
        .from('rooms')
        .select('id, number, name, property_id, properties(name)')
        .order('number', { ascending: true });
      
      if (error) throw error;
      
      return roomsData.map((room: any) => ({
        id: room.id,
        number: room.number,
        name: room.name,
        property_name: room.properties?.name
      }));
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoomSelection = (roomId: string) => {
    if (formData.selectedRooms.includes(roomId)) {
      setFormData({
        ...formData,
        selectedRooms: formData.selectedRooms.filter(id => id !== roomId)
      });
    } else {
      setFormData({
        ...formData,
        selectedRooms: [...formData.selectedRooms, roomId]
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      sendInvite: checked,
    });
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register the owner in auth
      await ownerSignup(
        formData.email, 
        formData.password, 
        formData.name,
        formData.phone
      );
      
      // Get the new owner's ID
      const { data: ownerData } = await supabase
        .from('owner_profiles')
        .select('id')
        .eq('email', formData.email)
        .single();
      
      if (ownerData && formData.selectedRooms.length > 0) {
        // Assign rooms to the owner
        for (const roomId of formData.selectedRooms) {
          await supabase
            .from('room_owner_assignments')
            .insert({
              room_id: roomId,
              owner_id: ownerData.id,
              assigned_by: user?.id
            });
        }
      }
      
      toast({
        title: "Owner Added",
        description: `${formData.name} has been added successfully with ${formData.selectedRooms.length} assigned rooms.`,
      });
      
      navigate('/owners');
    } catch (error: any) {
      console.error('Error creating owner:', error);
      toast({
        title: "Error adding owner",
        description: error.message || "Failed to add owner",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Owner</h1>
        <p className="text-muted-foreground mt-1">Create a new property owner account</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
              <CardDescription>Enter the owner's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter owner's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="owner@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password*</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password*</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Assign Rooms</h4>
                {roomsLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                  </div>
                ) : rooms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rooms.map((room: Room) => (
                      <div 
                        key={room.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          formData.selectedRooms.includes(room.id) 
                            ? 'bg-primary/10 border-primary' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleRoomSelection(room.id)}
                      >
                        <div className="flex items-center">
                          <Checkbox 
                            checked={formData.selectedRooms.includes(room.id)}
                            className="mr-2"
                            onCheckedChange={() => handleRoomSelection(room.id)}
                          />
                          <div>
                            <p className="font-medium">{room.number} {room.name && `- ${room.name}`}</p>
                            <p className="text-xs text-muted-foreground">{room.property_name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No rooms available for assignment</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Owner Preview</CardTitle>
              <CardDescription>How the owner will appear in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarFallback className="text-xl">{getInitials(formData.name)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">{formData.name || 'New Owner'}</h3>
                <p className="text-muted-foreground">{formData.email || 'owner@example.com'}</p>
                {formData.phone && (
                  <p className="text-xs text-muted-foreground mt-1">{formData.phone}</p>
                )}
                <Badge className="mt-2" variant="outline">
                  Owner
                </Badge>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="sendInvite"
                    checked={formData.sendInvite}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="sendInvite"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send invitation email
                  </label>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">Assigned Rooms</h4>
                  <div className="text-sm text-blue-700">
                    {formData.selectedRooms.length > 0 ? (
                      <p>Owner will have access to {formData.selectedRooms.length} assigned room(s).</p>
                    ) : (
                      <p>No rooms selected. Owner will have an empty dashboard.</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3 flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/owners')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Owner...' : 'Add Owner'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OwnerAdd;
