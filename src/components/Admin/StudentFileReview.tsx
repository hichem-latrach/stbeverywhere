import React, { useState } from 'react';
import AdminTable from './shared/AdminTable';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Eye, Download, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentFile {
  id: string;
  clientId: string;
  email: string;
  passport: string;
  enrollmentDocument: string;
  scholarship: string;
  residenceTunisia: string;
  residenceFrance: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const StudentFileReview: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const [studentFiles, setStudentFiles] = useState<StudentFile[]>([
    {
      id: 'SF-001',
      clientId: 'C-001',
      email: 'ahmed.student@email.com',
      passport: 'AB123456',
      enrollmentDocument: 'ENR_2024_001.pdf',
      scholarship: 'SCH_2024_001.pdf',
      residenceTunisia: 'RT_2024_001.pdf',
      residenceFrance: 'RF_2024_001.pdf',
      status: 'pending'
    },
    {
      id: 'SF-002',
      clientId: 'C-002',
      email: 'fatma.student@email.com',
      passport: 'CD789012',
      enrollmentDocument: 'ENR_2024_002.pdf',
      scholarship: 'SCH_2024_002.pdf',
      residenceTunisia: 'RT_2024_002.pdf',
      residenceFrance: 'RF_2024_002.pdf',
      status: 'accepted'
    },
    {
      id: 'SF-003',
      clientId: 'C-003',
      email: 'mohamed.student@email.com',
      passport: 'EF345678',
      enrollmentDocument: 'ENR_2024_003.pdf',
      scholarship: 'SCH_2024_003.pdf',
      residenceTunisia: 'RT_2024_003.pdf',
      residenceFrance: 'RF_2024_003.pdf',
      status: 'rejected'
    },
    {
      id: 'SF-004',
      clientId: 'C-004',
      email: 'leila.student@email.com',
      passport: 'GH901234',
      enrollmentDocument: 'ENR_2024_004.pdf',
      scholarship: 'SCH_2024_004.pdf',
      residenceTunisia: 'RT_2024_004.pdf',
      residenceFrance: 'RF_2024_004.pdf',
      status: 'pending'
    },
    {
      id: 'SF-005',
      clientId: 'C-005',
      email: 'karim.student@email.com',
      passport: 'IJ567890',
      enrollmentDocument: 'ENR_2024_005.pdf',
      scholarship: 'SCH_2024_005.pdf',
      residenceTunisia: 'RT_2024_005.pdf',
      residenceFrance: 'RF_2024_005.pdf',
      status: 'pending'
    }
  ]);

  const filteredFiles = studentFiles.filter(file => {
    const matchesSearch = 
      file.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.passport.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAccept = (id: string) => {
    setStudentFiles(studentFiles.map(file => 
      file.id === id ? { ...file, status: 'accepted' as const } : file
    ));
    toast({
      title: "File Accepted",
      description: `Student file ${id} has been accepted successfully.`,
    });
  };

  const handleReject = (id: string) => {
    setStudentFiles(studentFiles.filter(file => file.id !== id));
    toast({
      title: "File Rejected",
      description: `Student file ${id} has been rejected and removed.`,
      variant: "destructive",
    });
  };

  const handleView = (document: string) => {
    toast({
      title: "Viewing Document",
      description: `Opening ${document}...`,
    });
  };

  const handleDownload = (document: string) => {
    toast({
      title: "Downloading Document",
      description: `Downloading ${document}...`,
    });
  };


  return (
    <AdminTable
      title="TF Bank Students"
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showStatusFilter
      statusFilter={statusFilter}
      onStatusFilterChange={setStatusFilter}
      statusOptions={[
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" }
      ]}
      columns={[
        { key: "clientId", label: "Client ID" },
        { key: "email", label: "Email" },
        { key: "passport", label: "Passport" },
        { key: "enrollment", label: "Enrollment Document" },
        { key: "scholarship", label: "Scholarship" },
        { key: "residenceTunisia", label: "Residence in Tunisia" },
        { key: "residenceFrance", label: "Residence in France" },
        { key: "actions", label: "Actions" }
      ]}
      data={filteredFiles}
      renderRow={(file) => (
        <TableRow key={file.id} className="border-gray-200 hover:bg-gray-50 transition-colors">
          <TableCell className="font-medium text-blue-600">{file.clientId}</TableCell>
          <TableCell className="text-gray-900">{file.email}</TableCell>
          <TableCell className="text-gray-900">{file.passport}</TableCell>
          <TableCell>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleView(file.enrollmentDocument)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="View Attachment"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(file.enrollmentDocument)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="Download"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleView(file.scholarship)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="View Attachment"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(file.scholarship)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="Download"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleView(file.residenceTunisia)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="View Attachment"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(file.residenceTunisia)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="Download"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleView(file.residenceFrance)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="View Attachment"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDownload(file.residenceFrance)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 h-8 px-2"
                title="Download"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              {file.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleAccept(file.id)}
                    className="bg-green-600 hover:bg-green-700 text-white border-0 h-8 px-3"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReject(file.id)}
                    className="bg-red-600 hover:bg-red-700 text-white border-0 h-8 px-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
      emptyMessage="No student files found"
      emptyDescription="Try adjusting your search or filter criteria"
    />
  );
};

export default StudentFileReview;
