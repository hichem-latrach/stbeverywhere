import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CheckCircle, XCircle, Clock, CreditCard, FileText, Building, Banknote, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  type: 'card' | 'chequebook' | 'account' | 'tf-bank';
  user: string;
  email: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  // Checkbook specific fields
  accountNumber?: string;
  mobileNumber?: string;
  typeId?: string;
  idNumber?: string;
  // Card specific fields
  cardType?: string;
  rib?: string;
  montantTPE?: string;
  // TF Bank specific fields
  validIdDocument?: string;
  proofOfAddress?: string;
  studentVisa?: string;
  enrollmentConfirmation?: string;
  scholarshipProof?: string;
  domicileProofTunis?: string;
}

const AdminRequests: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      type: 'card',
      user: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      description: 'Business Credit Card Application',
      status: 'pending',
      date: '2024-01-20',
      cardType: 'Visa Business',
      rib: '08111234567890123456',
      montantTPE: '5000 TND'
    },
    {
      id: '2',
      type: 'chequebook',
      user: 'Sarah Trabelsi',
      email: 'sarah@example.com',
      description: 'Standard Chequebook (25 checks)',
      status: 'approved',
      date: '2024-01-19',
      accountNumber: '08111234567890',
      mobileNumber: '+216 98 765 432',
      typeId: 'CIN',
      idNumber: '12345678'
    },
    {
      id: '3',
      type: 'account',
      user: 'Mohamed Khelifi',
      email: 'mohamed@example.com',
      description: 'Student Account Opening',
      status: 'pending',
      date: '2024-01-18'
    },
    {
      id: '4',
      type: 'card',
      user: 'Fatma Brahem',
      email: 'fatma@example.com',
      description: 'Personal Debit Card',
      status: 'rejected',
      date: '2024-01-17',
      cardType: 'Mastercard Classic',
      rib: '08119876543210987654',
      montantTPE: '2000 TND'
    },
    {
      id: '5',
      type: 'tf-bank',
      user: 'Youssef Gharbi',
      email: 'youssef@example.com',
      description: 'Pack Étudiant France',
      status: 'pending',
      date: '2024-01-16',
      validIdDocument: 'passport_youssef.pdf',
      proofOfAddress: 'address_proof_youssef.pdf',
      studentVisa: 'visa_france_youssef.pdf',
      enrollmentConfirmation: 'university_enrollment_youssef.pdf',
      scholarshipProof: 'scholarship_youssef.pdf',
      domicileProofTunis: 'domicile_tunis_youssef.pdf'
    },
    {
      id: '6',
      type: 'chequebook',
      user: 'Amina Keskes',
      email: 'amina@example.com',
      description: 'Premium Chequebook (50 checks)',
      status: 'approved',
      date: '2024-01-15',
      accountNumber: '08115555666677',
      mobileNumber: '+216 55 123 456',
      typeId: 'Passport',
      idNumber: 'T1234567'
    },
    {
      id: '7',
      type: 'tf-bank',
      user: 'Karim Belhadj',
      email: 'karim@example.com',
      description: 'International Transfer Service',
      status: 'rejected',
      date: '2024-01-14',
      validIdDocument: 'id_karim.pdf',
      proofOfAddress: 'address_karim.pdf',
      studentVisa: 'visa_karim.pdf',
      enrollmentConfirmation: 'enrollment_karim.pdf',
      scholarshipProof: 'income_karim.pdf',
      domicileProofTunis: 'domicile_karim.pdf'
    },
    {
      id: '8',
      type: 'account',
      user: 'Nadia Fourati',
      email: 'nadia@example.com',
      description: 'Business Account Opening',
      status: 'approved',
      date: '2024-01-13'
    }
  ]);

  const filterRequests = (type: string) => {
    return requests.filter(request => {
      const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesType = request.type === type;
      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status } : request
    ));
    toast({
      title: "Request Updated",
      description: `Request has been ${status}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDocumentView = (filename: string) => {
    toast({
      title: "Document Viewer",
      description: `Opening ${filename}`,
    });
  };

  const handleDocumentDownload = (filename: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    });
  };

  const RequestTable = ({ requests, title }: { requests: ServiceRequest[], title: string }) => {
    const getTableHeaders = () => {
      const baseHeaders = ['ID', 'User', 'Description', 'Status', 'Date'];
      
      if (title === 'Chequebook Requests') {
        return [...baseHeaders.slice(0, 3), 'Account No.', 'Mobile', 'ID Type', 'ID Number', ...baseHeaders.slice(3), 'Actions'];
      } else if (title === 'Card Requests') {
        return [...baseHeaders.slice(0, 3), 'Card Type', 'RIB', 'Montant TPE', ...baseHeaders.slice(3), 'Actions'];
      } else if (title === 'TF Bank Requests') {
        return [...baseHeaders.slice(0, 3), 'Documents', ...baseHeaders.slice(3), 'Actions'];
      }
      
      return [...baseHeaders, 'Actions'];
    };

    const MobileCard = ({ request }: { request: ServiceRequest }) => (
      <Card className="border border-gray-200 mb-4">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">#{request.id}</p>
                <p className="font-semibold text-gray-800">{request.user}</p>
                <p className="text-sm text-gray-500">{request.email}</p>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500 font-medium">Description:</span>
                <p className="text-sm text-gray-800">{request.description}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 font-medium">Date:</span>
                <p className="text-sm text-gray-800">{new Date(request.date).toLocaleDateString()}</p>
              </div>
              
              {/* Type-specific fields */}
              {request.type === 'chequebook' && (
                <>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Account No.:</span>
                      <p className="text-gray-800 font-mono">{request.accountNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Mobile:</span>
                      <p className="text-gray-800">{request.mobileNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">ID Type:</span>
                      <p className="text-gray-800">{request.typeId || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">ID Number:</span>
                      <p className="text-gray-800 font-mono">{request.idNumber || 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}
              
              {request.type === 'card' && (
                <>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Card Type:</span>
                      <p className="text-gray-800">{request.cardType || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">RIB:</span>
                      <p className="text-gray-800 font-mono break-all">{request.rib || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Montant TPE:</span>
                      <p className="text-gray-800">{request.montantTPE || 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}
              
              {request.type === 'tf-bank' && (
                <>
                  <div>
                    <span className="text-sm text-gray-500 font-medium">Documents:</span>
                    <div className="mt-2 space-y-2">
                      {request.validIdDocument && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Valid ID Document</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.validIdDocument!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.validIdDocument!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {request.proofOfAddress && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Proof of Address</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.proofOfAddress!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.proofOfAddress!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {request.studentVisa && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Student Visa</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.studentVisa!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.studentVisa!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {request.enrollmentConfirmation && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Enrollment Confirmation</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.enrollmentConfirmation!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.enrollmentConfirmation!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {request.scholarshipProof && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Scholarship Proof</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.scholarshipProof!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.scholarshipProof!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                      {request.domicileProofTunis && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600">Domicile Proof</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.domicileProofTunis!)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.domicileProofTunis!)}>
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateRequestStatus(request.id, 'approved')}
                disabled={request.status === 'approved'}
                className="flex items-center space-x-1"
              >
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Approve</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateRequestStatus(request.id, 'rejected')}
                disabled={request.status === 'rejected'}
                className="flex items-center space-x-1"
              >
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Reject</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );

    const renderAdditionalCells = (request: ServiceRequest) => {
      if (request.type === 'chequebook') {
        return (
          <>
            <TableCell className="text-sm">{request.accountNumber || 'N/A'}</TableCell>
            <TableCell className="text-sm">{request.mobileNumber || 'N/A'}</TableCell>
            <TableCell className="text-sm">{request.typeId || 'N/A'}</TableCell>
            <TableCell className="text-sm">{request.idNumber || 'N/A'}</TableCell>
          </>
        );
      } else if (request.type === 'card') {
        return (
          <>
            <TableCell className="text-sm">{request.cardType || 'N/A'}</TableCell>
            <TableCell className="text-sm font-mono">{request.rib || 'N/A'}</TableCell>
            <TableCell className="text-sm">{request.montantTPE || 'N/A'}</TableCell>
          </>
        );
      } else if (request.type === 'tf-bank') {
        return (
          <TableCell className="max-w-xs">
            <div className="space-y-1">
              {request.validIdDocument && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Valid ID:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.validIdDocument!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.validIdDocument!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {request.proofOfAddress && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Address Proof:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.proofOfAddress!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.proofOfAddress!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {request.studentVisa && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Student Visa:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.studentVisa!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.studentVisa!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {request.enrollmentConfirmation && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Enrollment:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.enrollmentConfirmation!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.enrollmentConfirmation!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {request.scholarshipProof && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Scholarship:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.scholarshipProof!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.scholarshipProof!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {request.domicileProofTunis && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Domicile Proof:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentView(request.domicileProofTunis!)}>
                    <Eye className="w-3 h-3 mr-1" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDocumentDownload(request.domicileProofTunis!)}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </TableCell>
        );
      }
      return null;
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title === 'Account Requests' && <Building className="w-5 h-5" />}
            {title === 'Card Requests' && <CreditCard className="w-5 h-5" />}
            {title === 'Chequebook Requests' && <FileText className="w-5 h-5" />}
            {title === 'TF Bank Requests' && <Banknote className="w-5 h-5" />}
            {title}
            <Badge variant="outline" className="ml-auto">
              {requests.length} requests
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No {title.toLowerCase()} found
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden">
                {requests.map((request) => (
                  <MobileCard key={request.id} request={request} />
                ))}
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {getTableHeaders().map((header) => (
                          <TableHead key={header} className="whitespace-nowrap">{header}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono">#{request.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.user}</p>
                              <p className="text-sm text-gray-500">{request.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {request.description}
                          </TableCell>
                          {renderAdditionalCells(request)}
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(request.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateRequestStatus(request.id, 'approved')}
                                disabled={request.status === 'approved'}
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateRequestStatus(request.id, 'rejected')}
                                disabled={request.status === 'rejected'}
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const accountRequests = filterRequests('account');
  const cardRequests = filterRequests('card');
  const chequebookRequests = filterRequests('chequebook');
  const tfBankRequests = filterRequests('tf-bank');

  return (
    <div className="space-y-6">
      {/* Global Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Request Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by user name, email, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed View for Better Organization */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          <TabsTrigger value="account" className="text-xs sm:text-sm">Accounts</TabsTrigger>
          <TabsTrigger value="card" className="text-xs sm:text-sm">Cards</TabsTrigger>
          <TabsTrigger value="chequebook" className="text-xs sm:text-sm">Chequebooks</TabsTrigger>
          <TabsTrigger value="tf-bank" className="text-xs sm:text-sm">TF Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <RequestTable requests={accountRequests} title="Account Requests" />
          <RequestTable requests={cardRequests} title="Card Requests" />
          <RequestTable requests={chequebookRequests} title="Chequebook Requests" />
          <RequestTable requests={tfBankRequests} title="TF Bank Requests" />
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <RequestTable requests={accountRequests} title="Account Requests" />
        </TabsContent>

        <TabsContent value="card" className="mt-6">
          <RequestTable requests={cardRequests} title="Card Requests" />
        </TabsContent>

        <TabsContent value="chequebook" className="mt-6">
          <RequestTable requests={chequebookRequests} title="Chequebook Requests" />
        </TabsContent>

        <TabsContent value="tf-bank" className="mt-6">
          <RequestTable requests={tfBankRequests} title="TF Bank Requests" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRequests;
