
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useProperties } from '@/hooks/useProperties';
import { Loader } from 'lucide-react';

// Basic Expense type
interface Expense {
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
  owner?: string;
  notes: string | null;
}

const ExpenseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { data: properties } = useProperties();

  useEffect(() => {
    // In a real app, we would fetch from the API
    // This is a mock function to simulate loading an expense
    const loadExpense = () => {
      setIsLoading(true);
      setTimeout(() => {
        setExpense({
          id: id || '1',
          description: 'Maintenance Supplies',
          amount: 250.50,
          date: '2023-11-15',
          category: 'Maintenance',
          property: 'Marina Heights',
          vendor: 'Home Depot',
          paymentMethod: 'Credit Card',
          receipt: null,
          status: 'Completed',
          owner: 'John Owner', // Adding the owner property
          notes: 'Monthly supplies for property maintenance',
        });
        setIsLoading(false);
      }, 1000);
    };

    loadExpense();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Expense Updated",
      description: "The expense has been updated successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading expense data...</span>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Expense not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Expense</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={expense.description} 
                  onChange={(e) => setExpense({...expense, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (د.إ)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  value={expense.amount}
                  onChange={(e) => setExpense({...expense, amount: parseFloat(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={expense.date}
                  onChange={(e) => setExpense({...expense, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={expense.category}
                  onValueChange={(value) => setExpense({...expense, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Salaries">Salaries</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select 
                  value={expense.property}
                  onValueChange={(value) => setExpense({...expense, property: value})}
                >
                  <SelectTrigger id="property">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties?.map((property: any) => (
                      <SelectItem key={property.id} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input 
                  id="vendor" 
                  value={expense.vendor}
                  onChange={(e) => setExpense({...expense, vendor: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select 
                  value={expense.paymentMethod}
                  onValueChange={(value) => setExpense({...expense, paymentMethod: value})}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={expense.status}
                  onValueChange={(value) => setExpense({...expense, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Allocated to Owner</Label>
              <Input 
                id="owner" 
                value={expense.owner || ''}
                onChange={(e) => setExpense({...expense, owner: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={expense.notes || ''}
                onChange={(e) => setExpense({...expense, notes: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseEdit;
