
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  FileEdit, 
  ArrowLeft, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Tag, 
  Building, 
  FileText
} from 'lucide-react';
import { useExpense } from '@/hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';

const ExpenseView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: expense, isLoading, error } = useExpense(id || '');

  const handleEdit = () => {
    navigate(`/expenses/edit/${id}`);
  };

  const handleDelete = () => {
    toast({
      title: "Expense deleted",
      description: `Expense ${id} has been deleted successfully.`,
    });
    
    // In a real app, you would delete the expense from the database
    navigate('/expenses');
  };

  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt downloaded",
      description: "The receipt has been downloaded to your device.",
    });
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
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" className="mb-2" onClick={() => navigate('/expenses')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Expenses
          </Button>
          <h1 className="text-3xl font-bold">Expense Details</h1>
          <p className="text-muted-foreground mt-1">View and manage expense information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-lg font-medium mt-1">{expense.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Date
                </h3>
                <p className="text-lg font-medium mt-1">{expense.date}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" /> Amount
                </h3>
                <p className="text-lg font-medium mt-1">${expense.amount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                  <Tag className="mr-2 h-4 w-4" /> Category
                </h3>
                <p className="text-lg font-medium mt-1">{expense.category}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                  <Building className="mr-2 h-4 w-4" /> Property
                </h3>
                <p className="text-lg font-medium mt-1">{expense.property}</p>
              </div>
              
              {expense.vendor && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Vendor</h3>
                  <p className="text-lg font-medium mt-1">{expense.vendor}</p>
                </div>
              )}
            </div>
          </div>
          
          {expense.notes && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <FileText className="mr-2 h-4 w-4" /> Notes
              </h3>
              <p className="mt-2">{expense.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseView;
