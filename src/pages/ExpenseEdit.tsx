
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Save,
  Calendar, 
  DollarSign, 
  Tag, 
  Building, 
  FileText,
  User
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExpense } from '@/hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';

const ExpenseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: expense, isLoading, error } = useExpense(id || '');
  
  const [formData, setFormData] = React.useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    property: '',
    vendor: '',
    notes: '',
  });

  React.useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount.toString(),
        date: expense.date,
        category: expense.category,
        property: expense.property,
        vendor: expense.vendor || '',
        notes: expense.notes || '',
      });
    }
  }, [expense]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.description.trim() || !formData.amount || !formData.date || !formData.category || !formData.property) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would update the expense in the database
    toast({
      title: "Expense updated",
      description: "The expense has been updated successfully.",
    });
    
    navigate(`/expenses/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading expense details...</p>
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Error loading expense details</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/expenses')}>
          Go Back to Expenses
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <Button variant="ghost" className="mb-2" onClick={() => navigate(`/expenses/${id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Expense Details
        </Button>
        <h1 className="text-3xl font-bold">Edit Expense</h1>
        <p className="text-muted-foreground mt-1">Update expense information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Expense Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" /> Amount
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" /> Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center">
                    <Tag className="mr-1 h-4 w-4" /> Category
                  </Label>
                  <Select 
                    name="category" 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Personnel">Personnel</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property" className="flex items-center">
                    <Building className="mr-1 h-4 w-4" /> Property
                  </Label>
                  <Select 
                    name="property" 
                    value={formData.property}
                    onValueChange={(value) => handleSelectChange('property', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beachfront Villa">Beachfront Villa</SelectItem>
                      <SelectItem value="Mountain View Lodge">Mountain View Lodge</SelectItem>
                      <SelectItem value="Downtown Heights">Downtown Heights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vendor" className="flex items-center">
                    <User className="mr-1 h-4 w-4" /> Vendor (Optional)
                  </Label>
                  <Input
                    id="vendor"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center">
                <FileText className="mr-1 h-4 w-4" /> Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/expenses/${id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ExpenseEdit;
