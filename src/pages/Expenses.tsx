
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, FileEdit, Loader2, Plus, Search } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';

const Expenses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const { data: expenses, isLoading, error } = useExpenses();

  // Filter expenses based on search query and filters
  const filteredExpenses = expenses?.filter(expense => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.property.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || expense.category.toLowerCase() === categoryFilter.toLowerCase();
    
    // Date filter (simplified for demo)
    // In a real app, we'd have more complex date filtering logic
    const matchesDate = dateFilter === 'all';
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleAddNew = () => {
    navigate('/expenses/add');
  };

  const getCategoryBadge = (category: string) => {
    const colorMap: Record<string, string> = {
      'Maintenance': 'bg-blue-100 text-blue-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Personnel': 'bg-purple-100 text-purple-800',
      'Supplies': 'bg-green-100 text-green-800',
      'default': 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={colorMap[category] || colorMap.default}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground mt-1">Manage all property expenses</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Expense
        </Button>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search expenses..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="personnel">Personnel</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading expenses...</span>
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-lg bg-red-50">
          <p className="text-red-600">Error loading expenses data.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left font-medium px-6 py-3">Description</th>
                <th className="text-left font-medium px-6 py-3">Amount</th>
                <th className="text-left font-medium px-6 py-3">Date</th>
                <th className="text-left font-medium px-6 py-3">Category</th>
                <th className="text-left font-medium px-6 py-3">Property</th>
                <th className="text-left font-medium px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExpenses && filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{expense.description}</div>
                      {expense.vendor && (
                        <div className="text-sm text-muted-foreground">{expense.vendor}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">${expense.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{expense.date}</td>
                    <td className="px-6 py-4">
                      {getCategoryBadge(expense.category)}
                    </td>
                    <td className="px-6 py-4">{expense.property}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No expenses found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Expenses;
