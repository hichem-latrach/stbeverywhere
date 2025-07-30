
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, FileText, CreditCard, CheckCircle, Settings, LogOut, Menu, X, HelpCircle, Landmark } from "lucide-react";

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout, getClientData } = useAuth();
  const clientData = getClientData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Client Account', href: '/client-account', icon: User },
    { name: 'TF Bank Account', href: '/tf-bank-account', icon: Landmark },
    { name: 'Checkbook Request', href: '/checkbook-request', icon: FileText },
    { name: 'Credit Card Request', href: '/credit-card-request', icon: CreditCard },
    { name: 'KYC File', href: '/kyc', icon: CheckCircle },
  ];

  const bottomNavigation = [
    { name: 'Support', href: '/support', icon: HelpCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Hamburger for mobile
  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-full p-2 shadow-md touch-target"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-7 w-7 text-gray-900" />
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="bg-black/50 flex-1" onClick={() => setSidebarOpen(false)} />
          <aside className="relative bg-white w-4/5 max-w-xs h-full shadow-xl slide-in-right flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 min-w-0">
        <img 
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
          alt="STB Everywhere" 
          className="w-10 h-10"
        />
                <span className="text-lg font-bold text-gray-900 truncate">STB</span>
              </div>
              <button
                className="touch-target p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-stb-teal"
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-7 w-7 text-gray-900" />
              </button>
            </div>
            <nav className="flex-1 px-4 pt-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors touch-target ${
                      isActive(item.href)
                        ? 'bg-stb-teal/10 text-stb-teal'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 space-y-1 border-t border-gray-200 pt-4">
              {bottomNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors touch-target ${
                      isActive(item.href)
                        ? 'bg-stb-teal/10 text-stb-teal'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-stb-teal rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {clientData?.firstName?.charAt(0) || clientData?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {clientData?.fullName || clientData?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center space-x-2 touch-target"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col overflow-y-auto min-h-screen z-30">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img 
              src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
              alt="STB Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900">STB Everywhere</span>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 pt-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-stb-teal/10 text-stb-teal'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Bottom Navigation */}
        <div className="px-4 space-y-1 border-t border-gray-200 pt-4">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-stb-teal/10 text-stb-teal'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-stb-teal rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {clientData?.firstName?.charAt(0) || clientData?.fullName?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {clientData?.fullName || clientData?.firstName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
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
      </aside>
    </>
  );
};

export default DashboardSidebar;
