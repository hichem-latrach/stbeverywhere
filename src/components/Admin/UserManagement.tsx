import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Client, Admin } from '@/types';
import { useToast } from '@/hooks/use-toast';

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<Client | Admin | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock users data following the class diagram
  const [users, setUsers] = useState<(Client | Admin)[]>([
    {
      id: 1,
      email: 'test@admin.com',
      password: 'test123',
      name: 'Admin User',
      department: 'IT Administration',
      register: () => {},
      authenticate: () => {},
      updateProfile: () => {},
      disconnect: () => {}
    } as Admin,
    {
      id: 2,
      email: 'hichem@example.com',
      password: 'password',
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
    } as Client,
    {
      id: 3,
      email: 'sarah@example.com',
      password: 'password',
      fullName: 'Sarah Ben Ali',
      firstName: 'Sarah',
      address: '456 Oak Ave, Sfax',
      telephone: '+216 YY YYY YYY',
      city: 'Sfax',
      country: 'Tunisia',
      birthDate: new Date('1985-03-15'),
      maritalStatus: 'Married',
      mainNationality: 'Tunisian',
      otherNationality: '',
      fatherName: 'Father Name',
      motherName: 'Mother Name',
      civilStatus: 'Married',
      residence: 'Sfax',
      cinNumber: '87654321',
      deliveryDate: new Date('2019-05-10'),
      financialSituation: 'Good',
      activeNature: 'Self-employed',
      domiciliationAgency: 'STB Sfax',
      register: () => {},
      authenticate: () => {},
      updateProfile: () => {},
      disconnect: () => {}
    } as Client
  ]);

  const isAdmin = (user: Client | Admin): user is Admin => {
    return 'department' in user;
  };

  const isClient = (user: Client | Admin): user is Client => {
    return 'fullName' in user;
  };

  const getUserType = (user: Client | Admin): string => {
    return isAdmin(user) ? 'Admin' : 'Client';
  };

  const getUserName = (user: Client | Admin): string => {
    return isAdmin(user) ? user.name : user.fullName;
  };

  const handleViewUser = (user: Client | Admin) => {
    setSelectedUser(user);
    // Call the view method from the User class
    user.authenticate();
  };

  const handleEditUser = (user: Client | Admin) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
      // Call the disconnect method from the User class
      userToDelete.disconnect();
      setUsers(users.filter(u => u.id !== userId));
      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    }
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      // Call the updateProfile method from the User class
      selectedUser.updateProfile();
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setIsEditDialogOpen(false);
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
    }
  };

  const filteredUsers = users.filter(user =>
    getUserName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Management</CardTitle>
            <Button className="bg-stb-purple hover:bg-stb-purple/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Mobile Cards View - visible on mobile only */}
          <div className="block md:hidden space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="w-full">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{getUserName(user)}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getUserType(user) === 'Admin' ? 'default' : 'secondary'}>
                      {getUserType(user)}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {isAdmin(user) && (
                      <p>Department: {user.department}</p>
                    )}
                    {isClient(user) && (
                      <p>Location: {user.city}, {user.country}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUser(user)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View - hidden on mobile */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Additional Info</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {getUserName(user)}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getUserType(user) === 'Admin' ? 'default' : 'secondary'}>
                        {getUserType(user)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {isAdmin(user) && (
                        <span className="text-sm text-gray-600">
                          Dept: {user.department}
                        </span>
                      )}
                      {isClient(user) && (
                        <span className="text-sm text-gray-600">
                          {user.city}, {user.country}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              
              {isAdmin(selectedUser) && (
                <>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={selectedUser.department}
                      onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                    />
                  </div>
                </>
              )}
              
              {isClient(selectedUser) && (
                <>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={selectedUser.fullName}
                      onChange={(e) => setSelectedUser({...selectedUser, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Telephone</Label>
                    <Input
                      id="telephone"
                      value={selectedUser.telephone}
                      onChange={(e) => setSelectedUser({...selectedUser, telephone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={selectedUser.city}
                      onChange={(e) => setSelectedUser({...selectedUser, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="financialSituation">Financial Situation</Label>
                    <Select
                      value={selectedUser.financialSituation}
                      onValueChange={(value) => setSelectedUser({...selectedUser, financialSituation: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stable">Stable</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="col-span-2 flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateUser} className="bg-stb-purple hover:bg-stb-purple/90">
                  Update User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;