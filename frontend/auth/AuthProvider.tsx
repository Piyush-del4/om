'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../lib/api/client';
import { tokenStore } from './tokenStore';

interface User {
 _id: string;
 name: string;
 email: string;
 role: 'user' | 'admin';
 phone?: string;
 zodiacSign?: string;
 dateOfBirth?: string;
 birthTime?: string;
 birthPlace?: string;
 gender?: string;
 defaultAddress?: {
 fullName: string;
 phone: string;
 flatHouse: string;
 areaStreet: string;
 landmark?: string;
 pincode: string;
 townCity: string;
 state: string;
 };
}

interface AuthContextType {
 user: User | null;
 isAuthenticated: boolean;
 isAdmin: boolean;
 isLoading: boolean;
 login: (email: string, password: string) => Promise<any>;
 register: (name: string, email: string, password: string, phone?: string, otp?: string) => Promise<any>;
 logout: () => Promise<void>;
 refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 const refreshUser = async () => {
 try {
 const response = await client.get('/users/me');
 if (response.data?.success && response.data?.data) {
 setUser(response.data.data);
 } else {
 setUser(null);
 }
 } catch (error) {
 setUser(null);
 }
 };

 const tryTokenRefresh = async () => {
 try {
 const refreshResponse = await client.post('/auth/refresh');
 const token = refreshResponse.data?.data?.accessToken;
 if (token) {
 tokenStore.setToken(token);
 await refreshUser();
 }
 } catch (error) {
 tokenStore.setToken(null);
 setUser(null);
 } finally {
 setIsLoading(false);
 }
 };

 useEffect(() => {
 tryTokenRefresh();

 // Listen for auth-expired event from API client
 const handleAuthExpired = () => {
 tokenStore.setToken(null);
 setUser(null);
 setIsLoading(false);
 };

 if (typeof window !== 'undefined') {
 window.addEventListener('auth-expired', handleAuthExpired);
 }

 return () => {
 if (typeof window !== 'undefined') {
 window.removeEventListener('auth-expired', handleAuthExpired);
 }
 };
 }, []);

 const login = async (email: string, password: string) => {
 try {
 const response = await client.post('/auth/login', { email, password });
 if (response.data?.success && response.data?.data) {
 const { accessToken, user: userData } = response.data.data;
 tokenStore.setToken(accessToken);
 setUser(userData);
 return response.data.data;
 }
 throw new Error('Authentication failed');
 } catch (error) {
 throw error;
 }
 };

 const register = async (name: string, email: string, password: string, phone?: string, otp?: string) => {
 try {
 const response = await client.post('/auth/register', { name, email, password, phone, otp });
 if (response.data?.success && response.data?.data) {
 const { accessToken, user: userData } = response.data.data;
 tokenStore.setToken(accessToken);
 setUser(userData);
 return response.data.data;
 }
 throw new Error('Registration failed');
 } catch (error) {
 throw error;
 }
 };

 const logout = async () => {
 try {
 await client.post('/auth/logout');
 } catch (error) {
 // Proceed with clearing client tokens anyway
 } finally {
 tokenStore.setToken(null);
 setUser(null);
 }
 };

 const value: AuthContextType = {
 user,
 isAuthenticated: !!user,
 isAdmin: user?.role === 'admin',
 isLoading,
 login,
 register,
 logout,
 refreshUser,
 };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
 const context = useContext(AuthContext);
 if (context === undefined) {
 throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
}
