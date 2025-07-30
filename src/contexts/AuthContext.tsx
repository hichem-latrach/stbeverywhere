
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Admin, Client } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; redirectTo: string }>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
  isClient: () => boolean;
  getClientData: () => Client | null;
  getAdminData: () => Admin | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('stb-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; redirectTo: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let mockUser: User & (Admin | Client);
    let redirectTo = '/dashboard';
    
    // Check for admin credentials
    if (email === 'admin@stb.com.tn' && password === 'admin123') {
      mockUser = {
        id: 1,
        email: email,
        password: password,
        name: 'System Administrator',
        department: 'IT Administration',
        register: () => {},
        authenticate: () => {},
        updateProfile: () => {},
        disconnect: () => {}
      } as User & Admin;
      redirectTo = '/admin/dashboard';
    } else if (email === 'test@admin.com' && password === 'test123') {
      mockUser = {
        id: 2,
        email: email,
        password: password,
        name: 'Admin User',
        department: 'Customer Support',
        register: () => {},
        authenticate: () => {},
        updateProfile: () => {},
        disconnect: () => {}
      } as User & Admin;
      redirectTo = '/admin/dashboard';
    } else {
      // Regular client login
      mockUser = {
        id: 3,
        email: email,
        password: password,
        fullName: 'Hichem Latrach',
        firstName: 'Hichem',
        address: '123 Main St, Tunis',
        telephone: '+216 XX XXX XXX',
        city: 'Tunis',
        country: 'Tunisia',
        birthDate: new Date('1990-01-01'),
        maritalStatus: 'Single',
        mainNationality: 'Tunisian',
        otherNationality: '',
        fatherName: 'Father Name',
        motherName: 'Mother Name',
        civilStatus: 'Single',
        residence: 'Tunis',
        cinNumber: '12345678',
        deliveryDate: new Date('2020-01-01'),
        financialSituation: 'Stable',
        activeNature: 'Employee',
        domiciliationAgency: 'STB Tunis Center',
        register: () => {},
        authenticate: () => {},
        updateProfile: () => {},
        disconnect: () => {}
      } as User & Client;
    }
    
    setUser(mockUser);
    localStorage.setItem('stb-user', JSON.stringify(mockUser));
    setIsLoading(false);
    return { success: true, redirectTo };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stb-user');
  };

  const isAdmin = () => {
    return user && 'department' in user;
  };

  const isClient = () => {
    return user && 'fullName' in user;
  };

  const getClientData = (): Client | null => {
    if (isClient()) {
      return user as Client;
    }
    return null;
  };

  const getAdminData = (): Admin | null => {
    if (isAdmin()) {
      return user as Admin;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      isAdmin, 
      isClient, 
      getClientData, 
      getAdminData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
