
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface PropertyFormProps {
  propertyId?: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ propertyId }) => {
  const [property, setProperty] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
    country: '',
    description: '',
    active: true,  // Boolean value for the Switch component
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (propertyId) {
      // Mock loading data - in a real app would fetch from API
      setIsLoading(true);
      setTimeout(() => {
        setProperty({
          id: propertyId,
          name: 'Marina Heights',
          address: '123 Marina Blvd',
          city: 'Dubai',
          country: 'UAE',
          description: 'Luxury apartments in the heart of Dubai Marina',
          active: true,
        });
        setIsLoading(false);
      }, 500);
    }
  }, [propertyId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock save - in a real app would call API
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: propertyId ? 'Property Updated' : 'Property Created',
        description: `${property.name} has been ${propertyId ? 'updated' : 'created'} successfully.`,
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{propertyId ? 'Edit Property' : 'New Property'}</CardTitle>
          <CardDescription>
            {propertyId ? 'Update property information' : 'Create a new property in the system'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input 
              id="name" 
              value={property.name} 
              onChange={(e) => setProperty({...property, name: e.target.value})}
              placeholder="Enter property name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={property.address} 
              onChange={(e) => setProperty({...property, address: e.target.value})}
              placeholder="Enter street address"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={property.city} 
                onChange={(e) => setProperty({...property, city: e.target.value})}
                placeholder="Enter city"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={property.country} 
                onChange={(e) => setProperty({...property, country: e.target.value})}
                placeholder="Enter country"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={property.description} 
              onChange={(e) => setProperty({...property, description: e.target.value})}
              placeholder="Enter property description"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="active" 
              checked={property.active}
              onCheckedChange={(checked) => setProperty({...property, active: checked})}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : propertyId ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
