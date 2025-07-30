
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, CheckCircle, XCircle, Clock, Menu, X, MessageSquare, BarChart3, Settings, CreditCard, UserCheck } from 'lucide-react';
import CardRequests from '@/components/Admin/CardRequests';
import ChequeBookRequests from '@/components/Admin/ChequeBookRequests';
import ClientsManagement from '@/components/Admin/ClientsManagement';
import StudentFileReview from '@/components/Admin/StudentFileReview';
import AdminSidebar from '@/components/Layout/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isLoading, logout, getAdminData } = useAuth();
  const [activeTab, setActiveTab] = useState('card-requests');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const adminData = getAdminData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-stb-purple"></div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'card-requests':
        return <CardRequests />;
      case 'checkbook-requests':
        return <ChequeBookRequests />;
      case 'clients':
        return <ClientsManagement />;
      case 'student-files':
        return <StudentFileReview />;
      default:
        return <CardRequests />;
    }
  };

  const navigation = [
    { id: 'card-requests', name: 'Card Requests', icon: CreditCard },
    { id: 'checkbook-requests', name: 'Checkbook Requests', icon: FileText },
    { id: 'clients', name: 'Client Management', icon: UserCheck },
{ id: 'student-files', name: 'TF Bank', icon: Users },
  ];

  const isActive = (tabId: string) => activeTab === tabId;

  return (
    <div className="min-h-screen bg-white flex w-full">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full p-2 shadow-md"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-6 w-6 text-gray-900" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="bg-black/50 flex-1" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative bg-white w-4/5 max-w-xs h-full shadow-xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <img 
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
                  alt="STB Logo" 
                  className="w-8 h-8"
                />
                <span className="text-lg font-bold text-gray-900">STB Admin</span>
              </div>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-stb-purple"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6 text-gray-900" />
              </button>
            </div>
            <nav className="flex-1 px-4 pt-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive(item.id)
                        ? 'bg-stb-purple/10 text-stb-purple border border-stb-purple/20'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-stb-purple rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {adminData?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {adminData?.name || 'Administrator'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {adminData?.department || 'Admin'}
                  </p>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="pl-12 lg:pl-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-gray-700 text-base lg:text-lg">STB Everywhere Administration Panel</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 bg-white overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
