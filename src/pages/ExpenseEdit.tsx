
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useExpense } from '@/hooks/useExpenses';

const ExpenseEdit = () => {
  const { id } = useParams();
  const { data: expense, isLoading, error } = useExpense(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !expense) {
    return <div>Error loading expense</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link to="/expenses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Expenses
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Expense</h1>
          <p className="text-muted-foreground mt-1">Modify expense information</p>
        </div>
      </div>

      <Card className="p-6">
        {/* Add your expense edit form here - similar to ExpenseAdd.tsx */}
      </Card>
    </div>
  );
};

export default ExpenseEdit;
