
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '@/hooks/useUsers';

const UserEdit = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <div>Error loading user</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link to="/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit User</h1>
          <p className="text-muted-foreground mt-1">Modify user information</p>
        </div>
      </div>

      <Card className="p-6">
        {/* Add your user edit form here - similar to UserAdd.tsx */}
      </Card>
    </div>
  );
};

export default UserEdit;
