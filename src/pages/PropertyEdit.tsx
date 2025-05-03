
import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '@/components/settings/PropertyForm';

const PropertyEdit = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
      <PropertyForm propertyId={id} />
    </div>
  );
};

export default PropertyEdit;
