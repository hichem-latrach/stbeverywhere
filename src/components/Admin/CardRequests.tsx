import React, { useState } from 'react';
import AdminTable from './shared/AdminTable';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardRequest {
  id: string;
  cardType: string;
  email: string;
  mobile: string;
  rib: string;
  tpeAmount: string;
  idType: string;
  idNumber: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const CardRequests: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [requests, setRequests] = useState<CardRequest[]>([
    {
      id: 'CR-001',
      cardType: 'Visa Classic',
      email: 'ahmed.benali@email.com',
      mobile: '+216 98 123 456',
      rib: '08 101 0123456789 12',
      tpeAmount: '12132.00 TND',
      idType: 'CIN',
      idNumber: '12345678',
      submissionDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'CR-002',
      cardType: 'MasterCard Gold',
      email: 'fatma.khelifi@email.com',
      mobile: '+216 97 234 567',
      rib: '08 101 0987654321 34',
      tpeAmount: '25000.00 TND',
      idType: 'PASSPORT',
      idNumber: 'AB123456',
      submissionDate: '2024-01-14',
      status: 'approved'
    },
    {
      id: 'CR-003',
      cardType: 'Visa Platinum',
      email: 'mohamed.trabelsi@email.com',
      mobile: '+216 99 345 678',
      rib: '08 101 0567891234 56',
      tpeAmount: '50000.00 TND',
      idType: 'CIN',
      idNumber: '87654321',
      submissionDate: '2024-01-13',
      status: 'rejected'
    },
    {
      id: 'CR-004',
      cardType: 'MasterCard Standard',
      email: 'leila.bouazizi@email.com',
      mobile: '+216 96 456 789',
      rib: '08 101 0345678912 78',
      tpeAmount: '8000.00 TND',
      idType: 'CIN',
      idNumber: '11223344',
      submissionDate: '2024-01-16',
      status: 'pending'
    }
  ]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.cardType.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast({
      title: "Request Approved",
      description: `Card request ${id} has been approved successfully.`,
    });
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
    toast({
      title: "Request Rejected",
      description: `Card request ${id} has been rejected and removed.`,
      variant: "destructive",
    });
  };


  return (
    <AdminTable
      title="Card Requests"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      columns={[
        { key: "id", label: "ID" },
        { key: "cardType", label: "Card Type" },
        { key: "email", label: "Email" },
        { key: "tpeAmount", label: "TPE Amount" },
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
          <TableCell className="text-gray-900">{request.cardType}</TableCell>
          <TableCell className="text-gray-900">{request.email}</TableCell>
          <TableCell className="text-gray-900">{request.tpeAmount}</TableCell>
          <TableCell className="text-gray-900">{new Date(request.submissionDate).toLocaleDateString()}</TableCell>
          <TableCell className="text-gray-900 font-mono text-sm text-right">{request.rib}</TableCell>
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
      emptyMessage="No card requests found"
      emptyDescription="Try adjusting your search criteria"
    />
  );
};

export default CardRequests;
