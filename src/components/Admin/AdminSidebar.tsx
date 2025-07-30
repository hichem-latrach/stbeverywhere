
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CreditCard, FileText, Users, LogOut, UserCheck } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { logout, getAdminData } = useAuth();
  const adminData = getAdminData();
  
  const navigation = [
    { id: 'card-requests', name: 'Card Requests', icon: CreditCard },
    { id: 'cheque-requests', name: 'Checkbook Requests', icon: FileText },
    { id: 'clients', name: 'Client Management', icon: UserCheck },
    { id: 'student-files', name: 'TF Bank', icon: Users },
  ];

  const isActive = (tabId: string) => activeTab === tabId;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img 
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
            alt="STB Logo" 
            className="w-16 h-16"
          />
          <div>
            <span className="text-xl font-bold text-gray-900">STB Admin</span>
            <p className="text-xs text-gray-500">Administration Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
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

      {/* Admin Profile */}
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
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
