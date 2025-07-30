
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CreditCard, FileText, Settings, TrendingUp, AlertTriangle, BookOpen, UserCheck } from 'lucide-react';
import AdminSidebar from '@/components/Layout/AdminSidebar';
import UserManagement from '@/components/Admin/UserManagement';
import ServiceRequestManagement from '@/components/Admin/ServiceRequestManagement';
import CardRequests from '@/components/Admin/CardRequests';
import ChequeBookRequests from '@/components/Admin/ChequeBookRequests';
import ClientsManagement from '@/components/Admin/ClientsManagement';
import StudentFileReview from '@/components/Admin/StudentFileReview';
import ContactRequestManagement from '@/components/Admin/ContactRequestManagement';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isLoading, getAdminData } = useAuth();
  const [activeTab, setActiveTab] = useState('card-requests');
  const adminData = getAdminData();

  // Mock statistics data
  const [stats, setStats] = useState({
    totalUsers: 1248,
    activeRequests: 67,
    pendingComplaints: 23,
    totalTransactions: 15847
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-stb-teal"></div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {adminData?.name || 'Administrator'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Refresh Data
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="card-requests">
              <CardRequests />
            </TabsContent>

            <TabsContent value="checkbook-requests">
              <ChequeBookRequests />
            </TabsContent>

            <TabsContent value="clients">
              <ClientsManagement />
            </TabsContent>

            <TabsContent value="student-files">
              <StudentFileReview />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
