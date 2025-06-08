import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from "@/config/dbtypes";
import { logout as apiLogout } from '@/auth/auth-router';
import Toast from 'react-native-toast-message';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully!',
      });
    }
    catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;