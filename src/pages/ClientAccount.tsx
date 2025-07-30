import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Account, Transaction } from '@/types';

const ClientAccount: React.FC = () => {
  const { toast } = useToast();
  const { getClientData } = useAuth();
  const clientData = getClientData();
  
  // Mock accounts data following the class diagram
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      rib: '6191235965412365',
      iban: 'TN59 6191 2359 6541 2365',
      type: 'Carte Epargne',
      balance: 3250.00,
      creationDate: new Date('2023-01-01'),
      status: 'Active',
      number: '6191235965412365',
      overdraftAuthorized: 0,
      view: () => {}
    },
    {
      id: 2,
      rib: '6191548216544215',
      iban: 'TN59 6191 5482 1654 4215',
      type: 'Carte Visa Nationale',
      balance: 210.00,
      creationDate: new Date('2023-02-01'),
      status: 'Active',
      number: '6191548216544215',
      overdraftAuthorized: 500,
      view: () => {}
    },
    {
      id: 3,
      rib: '6191789456123789',
      iban: 'TN59 6191 7894 5612 3789',
      type: 'Carte MasterCard Travel',
      balance: 850.00,
      creationDate: new Date('2023-03-01'),
      status: 'Active',
      number: '6191789456123789',
      overdraftAuthorized: 1000,
      view: () => {}
    }
  ]);

  // Mock transactions data following the class diagram
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      accountId: 1,
      type: 'credit',
      amount: 2500.00,
      label: 'Salary Transfer',
      transactionDate: new Date('2025-06-07'),
      view: () => {}
    },
    {
      id: 2,
      accountId: 1,
      type: 'debit',
      amount: -100.00,
      label: 'ATM Withdrawal',
      transactionDate: new Date('2025-06-06'),
      view: () => {}
    },
    {
      id: 3,
      accountId: 2,
      type: 'debit',
      amount: -75.50,
      label: 'Online Purchase',
      transactionDate: new Date('2025-06-05'),
      view: () => {}
    }
  ]);

  const handleRequestStatement = () => {
    toast({
      title: "Account Statement Requested",
      description: "Your account statement has been requested and will be sent to your email within 24 hours.",
    });
  };

  const getCardImage = (type: string) => {
    switch (type) {
      case 'Carte Epargne':
        return '/img/26fa9671-55a1-4db1-8ddc-dba03aba1d66.png';
      case 'Carte Visa Nationale':
        return '/img/317f172d-4723-4ded-ba97-dd7de82ac9d1.png';
      case 'Carte MasterCard Travel':
        return '/img/49f539dd-a5ba-438a-b624-4876adcd0dbb.png';
      default:
        return '/img/26fa9671-55a1-4db1-8ddc-dba03aba1d66.png';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Client Account</h1>
          <p className="text-gray-500 mt-2">Manage your finances, track your savings, and stay on top of your transactions.</p>
        </div>

        {/* Account Cards Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="card-hover transition-shadow hover:shadow-md">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-1">
                      {account.type}
                    </h3>
                    <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                      {account.balance.toFixed(2)} TND
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <img 
                      src={getCardImage(account.type)} 
                      alt={account.type}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="break-all">RIB: {account.rib}</p>
                  <p>Status: <span className="text-green-600">{account.status}</span></p>
                  {account.overdraftAuthorized > 0 && (
                    <p>Overdraft: {account.overdraftAuthorized} TND</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Accounts Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <CardTitle className="text-gray-800 font-medium text-lg md:text-xl">Accounts</CardTitle>
              <Button 
                onClick={handleRequestStatement}
                style={{ backgroundColor: '#3853A4' }}
                className="hover:opacity-90 text-white w-full sm:w-auto"
              >
                Request Statement
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {accounts.map((account) => (
                <Card key={account.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">{account.type}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stb-green/10 text-stb-green">
                          {account.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Balance:</span>
                          <span className="font-medium text-gray-800">{account.balance.toFixed(2)} TND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">RIB:</span>
                          <span className="text-gray-500 break-all text-right">{account.rib}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Account Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">RIB</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Balance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-800">{account.type}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{account.rib}</td>
                      <td className="py-4 px-4 font-medium text-gray-800">{account.balance.toFixed(2)} TND</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stb-green/10 text-stb-green">
                          {account.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-800 font-medium text-lg md:text-xl">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{transaction.label}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.transactionDate.toLocaleDateString()} - Account ID: {transaction.accountId}
                    </p>
                  </div>
                  <div className={`font-semibold text-lg sm:text-right ${transaction.type === 'credit' ? 'text-stb-green' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : ''}{transaction.amount.toFixed(2)} TND
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default ClientAccount;
