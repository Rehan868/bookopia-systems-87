
import React from 'react';
import { useParams } from 'react-router-dom';
import RoomTypeForm from '@/components/settings/RoomTypeForm';

const RoomTypeEdit = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Room Type</h1>
      <RoomTypeForm typeId={id} />
    </div>
  );
};

export default RoomTypeEdit;
