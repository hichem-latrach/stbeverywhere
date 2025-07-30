import React, { useState } from 'react';
import AdminTable from './shared/AdminTable';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckbookRequest {
  id: string;
  accountNumber: string;
  email: string;
  mobile: string;
  numberOfCheques: number;
  idType: string;
  idNumber: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const CheckbookRequests: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const [requests, setRequests] = useState<CheckbookRequest[]>([
    {
      id: 'CB-001',
      accountNumber: '08 101 0123456789 12',
      email: 'ahmed.benali@email.com',
      mobile: '+216 98 123 456',
      numberOfCheques: 25,
      idType: 'CIN',
      idNumber: '12345678',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'CB-002',
      accountNumber: '08 101 0987654321 34',
      email: 'fatma.khelifi@email.com',
      mobile: '+216 97 234 567',
      numberOfCheques: 50,
      idType: 'PASSPORT',
      idNumber: 'AB123456',
      date: '2024-01-14',
      status: 'approved'
    },
    {
      id: 'CB-003',
      accountNumber: '08 101 0567891234 56',
      email: 'mohamed.trabelsi@email.com',
      mobile: '+216 99 345 678',
      numberOfCheques: 100,
      idType: 'CIN',
      idNumber: '87654321',
      date: '2024-01-13',
      status: 'rejected'
    },
    {
      id: 'CB-004',
      accountNumber: '08 101 0345678912 78',
      email: 'leila.bouazizi@email.com',
      mobile: '+216 96 456 789',
      numberOfCheques: 25,
      idType: 'CIN',
      idNumber: '11223344',
      date: '2024-01-16',
      status: 'pending'
    },
    {
      id: 'CB-005',
      accountNumber: '08 101 0789123456 90',
      email: 'karim.hajji@email.com',
      mobile: '+216 95 567 890',
      numberOfCheques: 75,
      idType: 'PASSPORT',
      idNumber: 'CD789012',
      date: '2024-01-17',
      status: 'pending'
    }
  ]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast({
      title: "Request Approved",
      description: `Checkbook request ${id} has been approved successfully.`,
    });
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    toast({
      title: "Request Rejected",
      description: `Checkbook request ${id} has been rejected and removed.`,
      variant: "destructive",
    });
  };


  return (
    <AdminTable
      title="Checkbook Requests"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showStatusFilter
      statusFilter={statusFilter}
      onStatusFilterChange={setStatusFilter}
      columns={[
        { key: "id", label: "ID" },
        { key: "email", label: "Email" },
        { key: "numberOfCheques", label: "Number of Cheques" },
        { key: "date", label: "Date" },
        { key: "accountNumber", label: "Account Number", align: "right" },
        { key: "mobile", label: "Phone Number (Mobile)", align: "right" },
        { key: "idNumber", label: "ID Number", align: "right" },
        { key: "actions", label: "Actions" },
      ]}
      data={filteredRequests}
      renderRow={(request) => (
        <TableRow key={request.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
          <TableCell className="font-medium text-blue-600">{request.id}</TableCell>
          <TableCell className="text-gray-900">{request.email}</TableCell>
          <TableCell className="text-gray-900">{request.numberOfCheques}</TableCell>
          <TableCell className="text-gray-900">{new Date(request.date).toLocaleDateString()}</TableCell>
          <TableCell className="text-gray-900 font-mono text-sm text-right">{request.accountNumber}</TableCell>
          <TableCell className="text-gray-900 text-right">{request.mobile}</TableCell>
          <TableCell className="text-gray-900 text-right">{request.idType}: {request.idNumber}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {request.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white border-0 h-8 px-3"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReject(request.id)}
                    className="bg-red-600 hover:bg-red-700 text-white border-0 h-8 px-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-3"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}
      emptyMessage="No checkbook requests found"
      emptyDescription="Try adjusting your search or filter criteria"
    />
  );
};

export default CheckbookRequests;
