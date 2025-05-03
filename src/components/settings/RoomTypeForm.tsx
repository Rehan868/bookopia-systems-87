
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface RoomTypeFormProps {
  typeId?: string;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({ typeId }) => {
  const [roomType, setRoomType] = useState({
    id: '',
    name: '',
    description: '',
    maxOccupancy: 2,
    basePricePerNight: 150,
    active: true,  // Boolean value for the Switch component
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeId) {
      // Mock loading data - in a real app would fetch from API
      setIsLoading(true);
      setTimeout(() => {
        setRoomType({
          id: typeId,
          name: 'Deluxe Suite',
          description: 'Spacious suite with sea view and private balcony',
          maxOccupancy: 3,
          basePricePerNight: 250,
          active: true,
        });
        setIsLoading(false);
      }, 500);
    }
  }, [typeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock save - in a real app would call API
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: typeId ? 'Room Type Updated' : 'Room Type Created',
        description: `${roomType.name} has been ${typeId ? 'updated' : 'created'} successfully.`,
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{typeId ? 'Edit Room Type' : 'New Room Type'}</CardTitle>
          <CardDescription>
            {typeId ? 'Update room type information' : 'Create a new room type in the system'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Room Type Name</Label>
            <Input 
              id="name" 
              value={roomType.name} 
              onChange={(e) => setRoomType({...roomType, name: e.target.value})}
              placeholder="Enter room type name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={roomType.description} 
              onChange={(e) => setRoomType({...roomType, description: e.target.value})}
              placeholder="Enter room type description"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxOccupancy">Max Occupancy</Label>
              <Input 
                id="maxOccupancy" 
                type="number"
                min="1"
                value={roomType.maxOccupancy} 
                onChange={(e) => setRoomType({...roomType, maxOccupancy: parseInt(e.target.value)})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="basePricePerNight">Base Price Per Night (د.إ)</Label>
              <Input 
                id="basePricePerNight" 
                type="number"
                min="0"
                step="0.01"
                value={roomType.basePricePerNight} 
                onChange={(e) => setRoomType({...roomType, basePricePerNight: parseFloat(e.target.value)})}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="active" 
              checked={roomType.active}
              onCheckedChange={(checked) => setRoomType({...roomType, active: checked})}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : typeId ? 'Update Room Type' : 'Create Room Type'}
        </Button>
      </div>
    </form>
  );
};

export default RoomTypeForm;
