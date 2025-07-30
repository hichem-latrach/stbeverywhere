import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, User, MapPin, CreditCard, Building2, Edit, Save, X, Edit3, History, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';

interface KycModificationRequest {
  id: string;
  fieldName: string;
  fieldLabel: string;
  oldValue: string;
  newValue: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const KYC: React.FC = () => {
  const { toast } = useToast();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<{ field: string; label: string; value: string } | null>(null);
  const [newValue, setNewValue] = useState('');
  const [reason, setReason] = useState('');
  const [modificationRequests, setModificationRequests] = useState<KycModificationRequest[]>([]);

  // KYC data with state management
  const [kycData, setKycData] = useState({
    // General Information
    title: 'Mr. Hichem Latrach',
    countryOfBirth: 'Tunisia',
    dateOfBirth: '31-08-2003',
    phoneNumber: '55604103',
    email: 'hichemlatrach4@gmail.com',
    address: 'Manar 2',
    reason: 'Account creation',
    relationshipType: 'Savings',

    // Financial Information
    status: 'Individual',
    natureOfActivity: 'Student / Private',

    // Personal Information
    primaryNationality: 'Tunisian',
    otherNationality: '—',
    motherFullName: 'Foulen ben Foulen',
    fatherFullName: 'Foulen ben Foulen',
    maritalStatus: 'Single',

    // Other Information
    residence: 'Resident in Tunisia',
    cinNumber: '14777322',
    dateOfIssue: '10-10-2020',

    // Domiciliation Agency
    selectedAgencyNumber: '103',
    accountType: 'Special Savings Card Account',
    accountCurrency: 'TND'
  });

  // Mock modification requests data
  useEffect(() => {
    const mockRequests: KycModificationRequest[] = [
      {
        id: '1',
        fieldName: 'phoneNumber',
        fieldLabel: 'Phone Number',
        oldValue: '55604103',
        newValue: '55123456',
        reason: 'Changed mobile phone number',
        status: 'pending',
        createdAt: '2024-01-20T10:30:00Z',
        updatedAt: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        fieldName: 'address',
        fieldLabel: 'Address',
        oldValue: 'Manar 2',
        newValue: 'Ariana Center',
        reason: 'Moved to new location',
        status: 'approved',
        createdAt: '2024-01-18T14:15:00Z',
        updatedAt: '2024-01-19T09:45:00Z'
      },
      {
        id: '3',
        fieldName: 'email',
        fieldLabel: 'Email',
        oldValue: 'hichemlatrach4@gmail.com',
        newValue: 'hichem.new@gmail.com',
        reason: 'Updated email address for better communication',
        status: 'rejected',
        createdAt: '2024-01-15T16:20:00Z',
        updatedAt: '2024-01-16T11:30:00Z'
      }
    ];
    setModificationRequests(mockRequests);
  }, []);

  const handleRequestEdit = (field: string, label: string, value: string) => {
    setSelectedField({ field, label, value });
    setNewValue(value);
    setReason('');
    setIsRequestDialogOpen(true);
  };

  const handleSubmitRequest = () => {
    if (!selectedField || !newValue.trim() || !reason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (newValue === selectedField.value) {
      toast({
        title: "No Changes",
        description: "The new value is the same as the current value.",
        variant: "destructive"
      });
      return;
    }

    const newRequest: KycModificationRequest = {
      id: Date.now().toString(),
      fieldName: selectedField.field,
      fieldLabel: selectedField.label,
      oldValue: selectedField.value,
      newValue: newValue.trim(),
      reason: reason.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setModificationRequests(prev => [newRequest, ...prev]);
    setIsRequestDialogOpen(false);
    setSelectedField(null);
    setNewValue('');
    setReason('');

    toast({
      title: "Request Submitted",
      description: "Your modification request has been submitted for admin review.",
    });
  };

  const handleCancelRequest = () => {
    setIsRequestDialogOpen(false);
    setSelectedField(null);
    setNewValue('');
    setReason('');
  };

  // Editable fields that can be modified through requests
  const editableFields = new Set([
    'title', 'phoneNumber', 'email', 'address', 'reason', 'relationshipType',
    'natureOfActivity', 'maritalStatus'
  ]);

  const EditableField = ({ label, field, value, type = 'text' }: { 
    label: string; 
    field: string; 
    value: string; 
    type?: 'text' | 'email' | 'tel' | 'date';
  }) => (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-medium text-gray-600">{label}</Label>
      <div className="flex items-center justify-between">
        <span className="text-base text-gray-900 font-medium">{value}</span>
        {editableFields.has(field) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRequestEdit(field, label, value)}
            className="ml-2 text-stb-purple hover:text-stb-purple/80"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const EditableSelectField = ({ label, field, value, options }: { 
    label: string; 
    field: string; 
    value: string; 
    options: { value: string; label: string }[];
  }) => (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-medium text-gray-600">{label}</Label>
      <div className="flex items-center justify-between">
        <span className="text-base text-gray-900 font-medium">{value}</span>
        {editableFields.has(field) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRequestEdit(field, label, value)}
            className="ml-2 text-stb-purple hover:text-stb-purple/80"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(120, 39, 174); // STB Purple
    doc.text('STB Everywhere - KYC Information', 20, 30);
    
    // General Information
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('General Information', 20, 50);
    
    doc.setFontSize(12);
    doc.text(`Title: ${kycData.title}`, 20, 65);
    doc.text(`Country of Birth: ${kycData.countryOfBirth}`, 20, 75);
    doc.text(`Date of Birth: ${kycData.dateOfBirth}`, 20, 85);
    doc.text(`Phone Number: ${kycData.phoneNumber}`, 20, 95);
    doc.text(`Email: ${kycData.email}`, 20, 105);
    doc.text(`Address: ${kycData.address}`, 20, 115);
    doc.text(`Reason: ${kycData.reason}`, 20, 125);
    doc.text(`Relationship Type: ${kycData.relationshipType}`, 20, 135);

    // Financial Information
    doc.setFontSize(16);
    doc.text('Financial Information', 20, 155);
    
    doc.setFontSize(12);
    doc.text(`Status: ${kycData.status}`, 20, 170);
    doc.text(`Nature of Activity: ${kycData.natureOfActivity}`, 20, 180);

    // Personal Information
    doc.setFontSize(16);
    doc.text('Personal Information', 20, 200);
    
    doc.setFontSize(12);
    doc.text(`Primary Nationality: ${kycData.primaryNationality}`, 20, 215);
    doc.text(`Other Nationality: ${kycData.otherNationality}`, 20, 225);
    doc.text(`Mother's Full Name: ${kycData.motherFullName}`, 20, 235);
    doc.text(`Father's Full Name: ${kycData.fatherFullName}`, 20, 245);
    doc.text(`Marital Status: ${kycData.maritalStatus}`, 20, 255);

    // Add new page for remaining information
    doc.addPage();
    
    // Other Information
    doc.setFontSize(16);
    doc.text('Other Information', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Residence: ${kycData.residence}`, 20, 45);
    doc.text(`CIN Number: ${kycData.cinNumber}`, 20, 55);
    doc.text(`Date of Issue: ${kycData.dateOfIssue}`, 20, 65);

    // Domiciliation Agency
    doc.setFontSize(16);
    doc.text('Domiciliation Agency', 20, 85);
    
    doc.setFontSize(12);
    doc.text(`Selected Agency Number: ${kycData.selectedAgencyNumber}`, 20, 100);
    doc.text(`Account Type: ${kycData.accountType}`, 20, 110);
    doc.text(`Account Currency: ${kycData.accountCurrency}`, 20, 120);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 280);
    doc.text('STB Everywhere - Confidential Document', 20, 290);

    doc.save('STB_KYC_Information.pdf');
    
    toast({
      title: "PDF Downloaded",
      description: "Your KYC information has been downloaded as a PDF file.",
    });
  };

  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-base text-gray-900 font-medium">{value}</span>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">KYC Information</h1>
            <p className="text-gray-600 mt-1">Your verified Know Your Customer information</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadPDF} className="bg-stb-purple hover:bg-stb-purple/90 text-white w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* General Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-stb-purple" />
              General Information
              </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EditableField label="Title" field="title" value={kycData.title} />
              <EditableField label="Country of Birth" field="countryOfBirth" value={kycData.countryOfBirth} />
              <EditableField label="Date of Birth" field="dateOfBirth" value={kycData.dateOfBirth} type="date" />
              <EditableField label="Phone Number" field="phoneNumber" value={kycData.phoneNumber} type="tel" />
              <EditableField label="Email" field="email" value={kycData.email} type="email" />
              <EditableField label="Address" field="address" value={kycData.address} />
              <EditableField label="Reason" field="reason" value={kycData.reason} />
              <EditableField label="Relationship Type" field="relationshipType" value={kycData.relationshipType} />
              </div>
            </CardContent>
          </Card>

        {/* Financial Information */}
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-stb-teal" />
              Financial Information
            </CardTitle>
            </CardHeader>
          <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableSelectField 
                label="Status" 
                field="status" 
                value={kycData.status} 
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Corporate', label: 'Corporate' },
                  { value: 'Business', label: 'Business' }
                ]} 
              />
              <EditableField label="Nature of Activity" field="natureOfActivity" value={kycData.natureOfActivity} />
                </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-stb-green" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EditableField label="Primary Nationality" field="primaryNationality" value={kycData.primaryNationality} />
              <EditableField label="Other Nationality" field="otherNationality" value={kycData.otherNationality} />
              <EditableField label="Mother's Full Name" field="motherFullName" value={kycData.motherFullName} />
              <EditableField label="Father's Full Name" field="fatherFullName" value={kycData.fatherFullName} />
              <EditableSelectField 
                label="Marital Status" 
                field="maritalStatus" 
                value={kycData.maritalStatus}
                options={[
                  { value: 'Single', label: 'Single' },
                  { value: 'Married', label: 'Married' },
                  { value: 'Divorced', label: 'Divorced' },
                  { value: 'Widowed', label: 'Widowed' }
                ]}
              />
              </div>
            </CardContent>
          </Card>

        {/* Other Information */}
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-stb-orange" />
              Other Information
            </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoField label="Residence" value={kycData.residence} />
              <InfoField label="CIN Number" value={kycData.cinNumber} />
              <InfoField label="Date of Issue" value={kycData.dateOfIssue} />
              </div>
            </CardContent>
          </Card>

        {/* Domiciliation Agency */}
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-stb-blue" />
              Domiciliation Agency
            </CardTitle>
            </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoField label="Selected Agency Number" value={kycData.selectedAgencyNumber} />
              <InfoField label="Account Type" value={kycData.accountType} />
              <InfoField label="Account Currency" value={kycData.accountCurrency} />
              </div>
            </CardContent>
          </Card>


        <div className="flex justify-center">
          <Button onClick={handleDownloadPDF} size="lg" className="bg-stb-purple hover:bg-stb-purple/90 text-white">
            <Download className="w-5 h-5 mr-2" />
            Download Complete KYC Information as PDF
            </Button>
          </div>

        {/* Edit Request Dialog */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900">Request Field Modification</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Submit a request to modify your KYC information. An admin will review and approve your request.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Field</Label>
                <p className="text-base font-medium text-gray-900">{selectedField?.label}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Current Value</Label>
                <p className="text-base text-gray-700 bg-gray-50 p-2 rounded border">{selectedField?.value}</p>
              </div>
              <div>
                <Label htmlFor="newValue" className="text-sm font-medium text-gray-600">New Value *</Label>
                <Input
                  id="newValue"
                  value={newValue}
                  onChange={(e) => {
                    const field = selectedField?.field;
                    let value = e.target.value;
                    
                    // Apply field-specific validation
                    if (field === 'phoneNumber') {
                      // Only allow numbers, spaces, and + symbol
                      if (/^[+\d\s]*$/.test(value)) {
                        setNewValue(value);
                      }
                    } else if (field === 'email') {
                      // Convert to lowercase for email
                      setNewValue(value.toLowerCase());
                    } else if (field === 'cinNumber' || field === 'selectedAgencyNumber') {
                      // Only allow numbers
                      if (/^\d*$/.test(value)) {
                        setNewValue(value);
                      }
                    } else {
                      setNewValue(value);
                    }
                  }}
                  placeholder={
                    selectedField?.field === 'phoneNumber' ? '+216 12 345 678' :
                    selectedField?.field === 'email' ? 'your.email@example.com' :
                    selectedField?.field === 'cinNumber' ? '12345678' :
                    'Enter new value'
                  }
                  type={
                    selectedField?.field === 'email' ? 'email' :
                    selectedField?.field === 'phoneNumber' ? 'tel' :
                    selectedField?.field === 'dateOfBirth' || selectedField?.field === 'dateOfIssue' ? 'date' :
                    'text'
                  }
                  maxLength={
                    selectedField?.field === 'phoneNumber' ? 15 :
                    selectedField?.field === 'cinNumber' ? 8 :
                    selectedField?.field === 'selectedAgencyNumber' ? 3 :
                    undefined
                  }
                  className="mt-1"
                  required
                />
                {selectedField?.field === 'phoneNumber' && (
                  <p className="text-xs text-gray-500 mt-1">Format: +216 XX XXX XXX</p>
                )}
                {selectedField?.field === 'cinNumber' && (
                  <p className="text-xs text-gray-500 mt-1">8 digits for National ID</p>
                )}
                {selectedField?.field === 'email' && (
                  <p className="text-xs text-gray-500 mt-1">Valid email address required</p>
                )}
              </div>
              <div>
                <Label htmlFor="reason" className="text-sm font-medium text-gray-600">Reason for Change *</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please explain why you need to change this information"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancelRequest} className="mb-2 sm:mb-0">
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest} className="bg-stb-purple hover:bg-stb-purple/90 text-white">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default KYC;
