import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Reply,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'technical' | 'billing' | 'complaint' | 'suggestion';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
}

const ContactRequestManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

  // Mock data - in a real app, this would come from an API
  const contactRequests: ContactRequest[] = [
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      email: 'ahmed.benali@email.com',
      phone: '+216 98 123 456',
      subject: 'Unable to access mobile app',
      message: 'I\'ve been trying to log into the mobile app for the past two days but keep getting an error message. Can you please help me resolve this issue?',
      status: 'pending',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-01-15 09:30:00',
      updatedAt: '2024-01-15 09:30:00',
      responseCount: 0
    },
    {
      id: '2',
      name: 'Fatma Khelifi',
      email: 'fatma.khelifi@email.com',
      phone: '+216 97 234 567',
      subject: 'Request for account statement',
      message: 'Hello, I need my account statements for the last 6 months for tax purposes. Could you please send them to my email address?',
      status: 'in-progress',
      priority: 'medium',
      category: 'general',
      assignedTo: 'Sarah Admin',
      createdAt: '2024-01-14 14:15:00',
      updatedAt: '2024-01-15 08:45:00',
      responseCount: 2
    },
    {
      id: '3',
      name: 'Mohamed Trabelsi',
      email: 'mohamed.trabelsi@email.com',
      phone: '+216 99 345 678',
      subject: 'Billing inquiry - unexpected charges',
      message: 'I noticed some charges on my account that I don\'t recognize. Can someone please review my account and explain these transactions?',
      status: 'resolved',
      priority: 'high',
      category: 'billing',
      assignedTo: 'John Admin',
      createdAt: '2024-01-13 11:20:00',
      updatedAt: '2024-01-14 16:30:00',
      responseCount: 4
    },
    {
      id: '4',
      name: 'Leila Bouazizi',
      email: 'leila.bouazizi@email.com',
      phone: '+216 96 456 789',
      subject: 'Suggestion for new features',
      message: 'I would like to suggest adding a budget tracking feature to the mobile app. This would be very helpful for managing personal finances.',
      status: 'pending',
      priority: 'low',
      category: 'suggestion',
      createdAt: '2024-01-15 16:45:00',
      updatedAt: '2024-01-15 16:45:00',
      responseCount: 0
    },
    {
      id: '5',
      name: 'Karim Hajji',
      email: 'karim.hajji@email.com',
      phone: '+216 95 567 890',
      subject: 'Complaint about service quality',
      message: 'I had a very poor experience at your branch yesterday. The staff was unhelpful and I waited for over an hour. This is unacceptable.',
      status: 'in-progress',
      priority: 'high',
      category: 'complaint',
      assignedTo: 'Maria Admin',
      createdAt: '2024-01-14 10:30:00',
      updatedAt: '2024-01-15 12:15:00',
      responseCount: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-800' },
      resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800' },
      closed: { label: 'Closed', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'High', className: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredRequests = contactRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewRequest = (request: ContactRequest) => {
    setSelectedRequest(request);
  };

  const handleReplyRequest = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsReplyDialogOpen(true);
  };

  const handleReply = () => {
    if (selectedRequest && replyMessage.trim()) {
      // In a real app, this would send the reply via API
      console.log('Sending reply:', replyMessage);
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully.",
      });
      setReplyMessage('');
      setSelectedRequest(null);
      setIsReplyDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Contact Request Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contact requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{request.subject}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{request.message}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-gray-500">{request.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {request.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(request.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-500">{new Date(request.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewRequest(request)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Contact Request Details</DialogTitle>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Information</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><strong>Name:</strong> {selectedRequest.name}</p>
                                      <p><strong>Email:</strong> {selectedRequest.email}</p>
                                      <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Request Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><strong>Subject:</strong> {selectedRequest.subject}</p>
                                      <p><strong>Category:</strong> {selectedRequest.category}</p>
                                      <p><strong>Priority:</strong> {selectedRequest.priority}</p>
                                      <p><strong>Status:</strong> {selectedRequest.status}</p>
                                      <p><strong>Created:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                      {selectedRequest.assignedTo && (
                                        <p><strong>Assigned to:</strong> {selectedRequest.assignedTo}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Message</h4>
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="text-sm">{selectedRequest.message}</p>
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    onClick={() => handleReplyRequest(selectedRequest)}
                                    className="bg-stb-purple hover:bg-stb-purple/90"
                                  >
                                    <Reply className="w-4 h-4 mr-2" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReplyRequest(request)}
                          className="bg-stb-purple text-white hover:bg-stb-purple/90"
                        >
                          <Reply className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="w-full">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{request.subject}</h3>
                      <p className="text-sm text-gray-600">{request.name}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                    <Badge variant="outline">{request.category}</Badge>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.message}</p>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    <p>Created: {new Date(request.createdAt).toLocaleDateString()}</p>
                    {request.assignedTo && <p>Assigned to: {request.assignedTo}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReplyRequest(request)}
                      className="w-full bg-stb-purple text-white hover:bg-stb-purple/90"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No contact requests found</h3>
              <p className="text-gray-600">No requests match your current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Contact Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedRequest.subject}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>From:</strong> {selectedRequest.name} ({selectedRequest.email})</p>
                  <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                  <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-3">
                  <p className="text-sm">{selectedRequest.message}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={6}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsReplyDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleReply}
                  className="bg-stb-purple hover:bg-stb-purple/90"
                  disabled={!replyMessage.trim()}
                >
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactRequestManagement;
