import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface CreditCardRequest {
  id: string;
  phoneNumber: string;
  cardType: string;
  email: string;
  rib: string;
  maxTPE: string;
  idType: string;
  idNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const CreditCardRequest: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<CreditCardRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState<CreditCardRequest | null>(null);
  const [formData, setFormData] = useState({
    phoneNumber: '+216',
    cardType: '',
    email: '',
    rib: '',
    maxTPE: '',
    idType: '',
    idNumber: ''
  });

  useEffect(() => {
    // Load existing requests from localStorage
    const savedRequests = localStorage.getItem('creditCardRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  const saveRequestsToStorage = (updatedRequests: CreditCardRequest[]) => {
    localStorage.setItem('creditCardRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRequest) {
      // Update existing request
      const updatedRequests = requests.map(req => 
        req.id === editingRequest.id 
          ? { ...req, ...formData }
          : req
      );
      saveRequestsToStorage(updatedRequests);
      toast({
        title: "Request Updated",
        description: "Your credit card request has been updated successfully.",
      });
      setEditingRequest(null);
    } else {
      // Create new request
      const newRequest: CreditCardRequest = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toLocaleDateString()
      };
      saveRequestsToStorage([...requests, newRequest]);
      toast({
        title: "Request Submitted",
        description: "Your credit card request has been submitted successfully.",
      });
    }
    
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (request: CreditCardRequest) => {
    setEditingRequest(request);
    setFormData({
      phoneNumber: request.phoneNumber,
      cardType: request.cardType,
      email: request.email,
      rib: request.rib,
      maxTPE: request.maxTPE,
      idType: request.idType,
      idNumber: request.idNumber
    });
    setShowForm(true);
  };

  const handleDelete = (requestId: string) => {
    const updatedRequests = requests.filter(req => req.id !== requestId);
    saveRequestsToStorage(updatedRequests);
    toast({
      title: "✅ Request Deleted Successfully",
      description: "Your credit card request has been permanently removed from the system.",
      duration: 4000,
    });
  };

  const resetForm = () => {
    setFormData({
      phoneNumber: '+216',
      cardType: '',
      email: '',
      rib: '',
      maxTPE: '',
      idType: '',
      idNumber: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-100 border border-green-200';
      case 'rejected': return 'text-red-700 bg-red-100 border border-red-200';
      default: return 'text-amber-700 bg-amber-100 border border-amber-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '⏳';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Credit Card Requests</h1>
            <p className="text-gray-600">Manage your credit card requests.</p>
          </div>
          <Button 
            onClick={() => {
              setShowForm(true);
              setEditingRequest(null);
              resetForm();
            }}
            className="bg-stb-purple hover:bg-stb-purple/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Existing Requests Table */}
        {requests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Credit Card Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Card Type</TableHead>
                    <TableHead>RIB</TableHead>
                    <TableHead>Max TPE</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.createdAt}</TableCell>
                      <TableCell>{request.cardType}</TableCell>
                      <TableCell>{request.rib}</TableCell>
                      <TableCell>{request.maxTPE}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}>
                          <span className="text-base">{getStatusIcon(request.status)}</span>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(request)}
                            disabled={request.status === 'approved'}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={request.status === 'approved'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md mx-auto bg-white border-2 border-red-200 shadow-2xl">
                              <AlertDialogHeader className="text-center pb-4">
                                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                  <span className="text-3xl">🗑️</span>
                                </div>
                                <AlertDialogTitle className="text-xl font-bold text-gray-900">Delete Credit Card Request</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600 mt-2 text-base leading-relaxed">
                                  This will permanently remove your credit card request from the system. You won't be able to recover it after deletion.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
                                <AlertDialogCancel className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300">
                                  Keep Request
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(request.id)}
                                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Request Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingRequest ? 'Edit Credit Card Request' : 'New Credit Card Request'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers, spaces, and + symbol
                        if (/^[+\d\s]*$/.test(value)) {
                          handleInputChange('phoneNumber', value);
                        }
                      }}
                      placeholder="+216 12 345 678"
                      className="w-full"
                      maxLength={15}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: +216 XX XXX XXX</p>
                  </div>

                  <div>
                    <Label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Type *
                    </Label>
                    <Select 
                      value={formData.cardType} 
                      onValueChange={(value) => handleInputChange('cardType', value)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="carte-epargne" className="hover:bg-blue-50 focus:bg-blue-50">Carte Epargne</SelectItem>
                        <SelectItem value="visa-classic" className="hover:bg-blue-50 focus:bg-blue-50">Visa Classic</SelectItem>
                        <SelectItem value="visa-gold" className="hover:bg-blue-50 focus:bg-blue-50">Visa Gold</SelectItem>
                        <SelectItem value="visa-platinum" className="hover:bg-blue-50 focus:bg-blue-50">Visa Platinum</SelectItem>
                        <SelectItem value="mastercard-standard" className="hover:bg-blue-50 focus:bg-blue-50">MasterCard Standard</SelectItem>
                        <SelectItem value="mastercard-gold" className="hover:bg-blue-50 focus:bg-blue-50">MasterCard Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())}
                      placeholder="your.email@example.com"
                      className="w-full"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll use this for card delivery updates</p>
                  </div>

                  <div>
                    <Label htmlFor="rib" className="block text-sm font-medium text-gray-700 mb-2">
                      RIB (Bank Account Number) *
                    </Label>
                    <Input
                      id="rib"
                      type="text"
                      value={formData.rib}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        // Only allow numbers
                        if (/^\d*$/.test(value)) {
                          handleInputChange('rib', value);
                        }
                      }}
                      placeholder="20 digit bank account number"
                      className="w-full font-mono"
                      maxLength={20}
                      minLength={20}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be exactly 20 digits</p>
                  </div>

                  <div>
                    <Label htmlFor="maxTPE" className="block text-sm font-medium text-gray-700 mb-2">
                      Max TPE (Terminal Point of Sale) *
                    </Label>
                    <Input
                      id="maxTPE"
                      type="number"
                      value={formData.maxTPE}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow positive numbers
                        if (/^\d*$/.test(value) && (value === '' || parseInt(value) >= 0)) {
                          handleInputChange('maxTPE', value);
                        }
                      }}
                      placeholder="1000"
                      className="w-full"
                      min="0"
                      max="50000"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Daily spending limit in TND (0-50,000)</p>
                  </div>

                  <div>
                    <Label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-2">
                      ID Type *
                    </Label>
                    <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="cin" className="hover:bg-blue-50 focus:bg-blue-50">CIN (National ID)</SelectItem>
                        <SelectItem value="passport" className="hover:bg-blue-50 focus:bg-blue-50">Passport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      ID Number *
                    </Label>
                    <Input
                      id="idNumber"
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase().replace(/\s/g, '');
                        // Allow alphanumeric characters only
                        if (/^[A-Z0-9]*$/.test(value)) {
                          handleInputChange('idNumber', value);
                        }
                      }}
                      placeholder={formData.idType === 'cin' ? '12345678' : 'AB1234567'}
                      className="w-full font-mono"
                      maxLength={formData.idType === 'cin' ? 8 : 9}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.idType === 'cin' ? '8 digits for CIN' : '9 characters for Passport'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingRequest(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-stb-purple hover:bg-stb-purple/90 text-white">
                    {editingRequest ? 'Update Request' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreditCardRequest;
