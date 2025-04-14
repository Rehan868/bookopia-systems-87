
import { useState, useEffect, createContext, useContext } from "react";
import { users } from "@/lib/mock-data";

export type UserRole = "admin" | "staff" | "manager" | "owner";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  properties: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user info is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple mock authentication
      // In a real app, this would validate credentials against a backend
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === "password") { // Mock password check
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
