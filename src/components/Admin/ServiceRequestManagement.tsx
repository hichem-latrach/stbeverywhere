import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'checkbook' | 'credit-card' | 'account-package';
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  submissionDate: string;
  lastUpdated: string;
  priority: 'low' | 'medium' | 'high';
}

const ServiceRequestManagement: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock service request data
  useEffect(() => {
    const mockRequests: ServiceRequest[] = [
      {
        id: '1',
        userId: '1',
        userName: 'Hichem Latrach',
        userEmail: 'hichem@example.com',
        type: 'checkbook',
        description: 'Standard Checkbook (25 checks)',
        status: 'pending',
        submissionDate: '2024-01-20',
        lastUpdated: '2024-01-20',
        priority: 'medium'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Sarah Ben Ali',
        userEmail: 'sarah@example.com',
        type: 'credit-card',
        description: 'Business Credit Card Application',
        status: 'approved',
        submissionDate: '2024-01-18',
        lastUpdated: '2024-01-19',
        priority: 'high'
      },
      {
        id: '3',
        userId: '3',
        userName: 'Mohamed Trabelsi',
        userEmail: 'mohamed@example.com',
        type: 'account-package',
        description: 'Premium Banking Package',
        status: 'processing',
        submissionDate: '2024-01-17',
        lastUpdated: '2024-01-19',
        priority: 'low'
      },
      {
        id: '4',
        userId: '4',
        userName: 'Fatma Khelifi',
        userEmail: 'fatma@example.com',
        type: 'checkbook',
        description: 'Premium Checkbook (50 checks)',
        status: 'rejected',
        submissionDate: '2024-01-15',
        lastUpdated: '2024-01-16',
        priority: 'low'
      }
    ];
    setRequests(mockRequests);
  }, []);

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (requestId: string, newStatus: 'pending' | 'approved' | 'rejected' | 'processing') => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : request
    ));
    toast({
      title: "Request Status Updated",
      description: `Request status changed to ${newStatus}`,
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'checkbook': return 'Checkbook';
      case 'credit-card': return 'Credit Card';
      case 'account-package': return 'Account Package';
      default: return type;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-lg sm:text-xl lg:text-2xl">Service Request Management</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredRequests.length} Total Requests
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by user name, email, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="checkbook">Checkbook</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="account-package">Account Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Card View (Visible on Mobile) */}
          <div className="block lg:hidden space-y-4">
            {paginatedRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No service requests found
              </div>
            ) : (
              paginatedRequests.map((request) => (
                <Card key={request.id} className="border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with ID and Status */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-gray-600">#{request.id}</span>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      {/* User Info */}
                      <div>
                        <p className="font-medium text-sm">{request.userName}</p>
                        <p className="text-xs text-gray-500">{request.userEmail}</p>
                      </div>
                      
                      {/* Type and Priority */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(request.type)}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </Badge>
                      </div>
                      
                      {/* Description */}
                      <div>
                        <p className="text-sm text-gray-700">{request.description}</p>
                      </div>
                      
                      {/* Date */}
                      <div className="text-xs text-gray-500">
                        Submitted: {new Date(request.submissionDate).toLocaleDateString()}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(request.id, 'approved')}
                          disabled={request.status === 'approved'}
                          className="flex-1 min-w-0"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                          <span className="text-xs">Approve</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(request.id, 'processing')}
                          disabled={request.status === 'processing'}
                          className="flex-1 min-w-0"
                        >
                          <Clock className="w-3 h-3 mr-1 text-blue-600" />
                          <span className="text-xs">Process</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(request.id, 'rejected')}
                          disabled={request.status === 'rejected'}
                          className="flex-1 min-w-0"
                        >
                          <XCircle className="w-3 h-3 mr-1 text-red-600" />
                          <span className="text-xs">Reject</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden lg:block overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Request ID</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">User</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Type</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Description</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Priority</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Submitted</TableHead>
                      <TableHead className="px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white divide-y divide-gray-200">
                    {paginatedRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No service requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="px-3 py-4 font-mono text-sm">
                            #{request.id}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <div>
                              <p className="font-medium text-sm sm:text-base text-gray-900">{request.userName}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{request.userEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <Badge variant="outline" className="text-xs">
                              {getTypeLabel(request.type)}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-3 py-4 max-w-xs">
                            <p className="text-sm text-gray-900 truncate">{request.description}</p>
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <Badge className={`text-xs px-2 py-1 ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <Badge className={`text-xs px-2 py-1 ${getStatusColor(request.status)}`}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-3 py-4 text-sm text-gray-900">
                            {new Date(request.submissionDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(request.id, 'approved')}
                                disabled={request.status === 'approved'}
                                className="min-h-[36px]"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(request.id, 'processing')}
                                disabled={request.status === 'processing'}
                                className="min-h-[36px]"
                              >
                                <Clock className="w-4 h-4 text-blue-600" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusChange(request.id, 'rejected')}
                                disabled={request.status === 'rejected'}
                                className="min-h-[36px]"
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestManagement;