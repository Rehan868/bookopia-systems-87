
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserSession, UserType } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSession | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  staffSignup: (email: string, password: string, name: string, role: string) => Promise<void>;
  ownerSignup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  ownerLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Check if user is staff
            const { data: staffProfile } = await supabase
              .from('staff_profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (staffProfile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                name: staffProfile.name,
                role: staffProfile.role,
                userType: 'staff',
                avatarUrl: staffProfile.avatar_url
              });
              setIsAuthenticated(true);
              return;
            }

            // Check if user is owner
            const { data: ownerProfile } = await supabase
              .from('owner_profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (ownerProfile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                name: ownerProfile.name,
                role: 'owner',
                userType: 'owner',
                avatarUrl: ownerProfile.avatar_url
              });
              setIsAuthenticated(true);
              return;
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Check if user exists in staff or owner tables
        const fetchUserProfile = async () => {
          try {
            // Check if user is staff
            const { data: staffProfile } = await supabase
              .from('staff_profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (staffProfile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                name: staffProfile.name,
                role: staffProfile.role,
                userType: 'staff',
                avatarUrl: staffProfile.avatar_url
              });
              setIsAuthenticated(true);
              setLoading(false);
              return;
            }

            // Check if user is owner
            const { data: ownerProfile } = await supabase
              .from('owner_profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (ownerProfile) {
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || '',
                name: ownerProfile.name,
                role: 'owner',
                userType: 'owner',
                avatarUrl: ownerProfile.avatar_url
              });
              setIsAuthenticated(true);
              setLoading(false);
              return;
            }
            
            setLoading(false);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setLoading(false);
          }
        };

        fetchUserProfile();
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Regular staff login
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Staff signup (only to be used by admins)
  const staffSignup = async (email: string, password: string, name: string, role: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            user_type: 'staff'
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "User created",
        description: `${name} has been added as ${role}`,
      });
      
      return;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create user",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Owner login
  const ownerLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      // Check if user is actually an owner
      const { data: ownerProfile } = await supabase
        .from('owner_profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (!ownerProfile) {
        await supabase.auth.signOut();
        throw new Error('This account is not registered as an owner');
      }

      toast({
        title: "Login successful",
        description: "Welcome to your owner portal!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Owner signup
  const ownerSignup = async (email: string, password: string, name: string, phone?: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            user_type: 'owner',
            created_by: user?.id // Track which admin created this owner
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Owner created",
        description: `${name} has been added as an owner`,
      });
      
      return;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create owner",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session,
      loading,
      login, 
      staffSignup,
      ownerSignup,
      ownerLogin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
