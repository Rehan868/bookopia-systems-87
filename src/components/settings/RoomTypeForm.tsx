
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

interface RoomTypeFormProps {
  typeId?: string;
}

const RoomTypeForm: React.FC<RoomTypeFormProps> = ({ typeId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    baseRate: '',
    propertyId: '',
    active: true,
    features: [] as string[]
  });
  
  useEffect(() => {
    // Fetch properties
    const fetchProperties = async () => {
      // In a real app, fetch from API
      setProperties([
        { id: "1", name: "Marina Tower" },
        { id: "2", name: "Downtown Heights" }
      ]);
    };
    
    fetchProperties();
    
    // If editing, fetch room type data
    if (typeId) {
      const fetchRoomType = async () => {
        setIsLoading(true);
        try {
          // In a real app, fetch from API
          // Mocking response
          setFormData({
            name: 'Deluxe Room',
            description: 'Spacious room with sea view',
            baseRate: '450',
            propertyId: '1',
            active: true,
            features: ['Sea View', 'King Size Bed', 'Balcony']
          });
        } catch (error) {
          console.error("Error fetching room type:", error);
          toast({
            title: "Error",
            description: "Failed to load room type data",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRoomType();
    }
  }, [typeId, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePropertyChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      propertyId: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, send data to API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: typeId ? "Room Type Updated" : "Room Type Created",
        description: `Room type has been ${typeId ? 'updated' : 'created'} successfully.`
      });
      
      navigate('/settings');
    } catch (error) {
      console.error("Error saving room type:", error);
      toast({
        title: "Error",
        description: "Failed to save room type",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter room type name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="baseRate">Base Rate (AED)</Label>
                  <Input 
                    id="baseRate"
                    name="baseRate"
                    type="number"
                    value={formData.baseRate}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select 
                  value={formData.propertyId} 
                  onValueChange={handlePropertyChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map(property => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter room type description"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/settings')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : typeId ? 'Update Room Type' : 'Create Room Type'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RoomTypeForm;
