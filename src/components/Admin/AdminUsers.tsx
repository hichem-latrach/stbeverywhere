
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended';
  joinDate: string;
  lastLogin: string;
  requestHistory: {
    id: string;
    type: string;
    date: string;
    status: string;
  }[];
}

const AdminUsers: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      phone: '+216 20 123 456',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-20',
      requestHistory: [
        { id: '1', type: 'Card Request', date: '2024-01-20', status: 'pending' },
        { id: '2', type: 'Chequebook', date: '2024-01-15', status: 'approved' }
      ]
    },
    {
      id: '2',
      name: 'Sarah Trabelsi',
      email: 'sarah@example.com',
      phone: '+216 25 789 012',
      status: 'active',
      joinDate: '2023-11-15',
      lastLogin: '2024-01-19',
      requestHistory: [
        { id: '3', type: 'Chequebook', date: '2024-01-19', status: 'approved' }
      ]
    },
    {
      id: '3',
      name: 'Mohamed Khelifi',
      email: 'mohamed@example.com',
      phone: '+216 22 345 678',
      status: 'suspended',
      joinDate: '2023-10-20',
      lastLogin: '2024-01-10',
      requestHistory: [
        { id: '4', type: 'Account Opening', date: '2024-01-18', status: 'pending' }
      ]
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
    toast({
      title: "User Status Updated",
      description: "User status has been changed",
    });
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been permanently deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">User Management</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Search */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Users Table - Responsive wrapper */}
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="hidden sm:table-cell px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Email</TableHead>
                      <TableHead className="hidden md:table-cell px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Phone</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="hidden lg:table-cell px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Join Date</TableHead>
                      <TableHead className="hidden lg:table-cell px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Last Login</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="px-3 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm sm:text-base text-gray-900">{user.name}</span>
                            <span className="sm:hidden text-xs text-gray-500 mt-1">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell px-3 py-4 text-sm text-gray-900">{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell px-3 py-4 text-sm text-gray-900">{user.phone}</TableCell>
                        <TableCell className="px-3 py-4">
                          <Badge className={`text-xs px-2 py-1 ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell px-3 py-4 text-sm text-gray-900">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell px-3 py-4 text-sm text-gray-900">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-3 py-4">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedUser(user)}
                                  className="w-full sm:w-auto min-h-[36px] text-xs sm:text-sm"
                                >
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-0" />
                                  <span className="sm:hidden">View</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-xs sm:max-w-lg md:max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-sm sm:text-lg">User Details & Request History</DialogTitle>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-3 sm:space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold text-sm sm:text-base">User Information</h4>
                                        <div className="space-y-1 text-xs sm:text-sm">
                                          <p><strong>Name:</strong> {selectedUser.name}</p>
                                          <p><strong>Email:</strong> {selectedUser.email}</p>
                                          <p><strong>Phone:</strong> {selectedUser.phone}</p>
                                          <p><strong>Status:</strong> {selectedUser.status}</p>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <h4 className="font-semibold text-sm sm:text-base">Account Details</h4>
                                        <div className="space-y-1 text-xs sm:text-sm">
                                          <p><strong>Join Date:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                                          <p><strong>Last Login:</strong> {new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Request History</h4>
                                      <div className="overflow-x-auto">
                                        <Table className="min-w-full">
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead className="text-xs sm:text-sm">Type</TableHead>
                                              <TableHead className="text-xs sm:text-sm">Date</TableHead>
                                              <TableHead className="text-xs sm:text-sm">Status</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {selectedUser.requestHistory.map((request) => (
                                              <TableRow key={request.id}>
                                                <TableCell className="text-xs sm:text-sm">{request.type}</TableCell>
                                                <TableCell className="text-xs sm:text-sm">{new Date(request.date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                  <Badge className={`text-xs px-1.5 py-0.5 ${
                                                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                  }`}>
                                                    {request.status}
                                                  </Badge>
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                              className={`w-full sm:w-auto min-h-[36px] text-xs sm:text-sm ${
                                user.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'
                              }`}
                            >
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteUser(user.id)}
                              className="w-full sm:w-auto min-h-[36px] text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-0" />
                              <span className="sm:hidden">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
