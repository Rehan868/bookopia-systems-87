
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  userType?: 'staff' | 'owner';
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles = [],
  userType,
  children 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    // Determine redirect based on the attempted path
    const isOwnerPath = location.pathname.startsWith('/owner');
    const redirectPath = isOwnerPath ? '/owner/login' : '/login';
    
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check user type restriction
  if (userType && user.userType !== userType) {
    // If staff trying to access owner routes or vice versa
    const redirectPath = user.userType === 'owner' ? '/owner/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && user.role && !allowedRoles.includes(user.role)) {
    // If user doesn't have the required role
    const redirectPath = user.userType === 'owner' ? '/owner/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};
