import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const TFBankAccountRequest: React.FC = () => {
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<'student' | 'elyssa' | null>(null);
  const [documents, setDocuments] = useState({
    identityDocument: null as File | null,
    passport: null as File | null,
    proofOfEnrollment: null as File | null,
    scholarshipCertificate: null as File | null,
    proofOfResidence: null as File | null,
    proofOfAddress: null as File | null,
    proofOfIncome: null as File | null,
    studentVisa: null as File | null,
    residencePermit: null as File | null,
    taxId: ''
  });

  const handlePackSelection = (pack: 'student' | 'elyssa') => {
    setSelectedPack(pack);
    // Reset documents when switching packs
    setDocuments({
      identityDocument: null,
      passport: null,
      proofOfEnrollment: null,
      scholarshipCertificate: null,
      proofOfResidence: null,
      proofOfAddress: null,
      proofOfIncome: null,
      studentVisa: null,
      residencePermit: null,
      taxId: ''
    });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  const validateRequiredDocuments = () => {
    if (selectedPack === 'student') {
      const requiredFields = ['identityDocument', 'passport', 'proofOfEnrollment', 'proofOfResidence'];
      return requiredFields.every(field => documents[field as keyof typeof documents] !== null);
    } else if (selectedPack === 'elyssa') {
      const requiredFields = ['identityDocument', 'proofOfAddress', 'proofOfIncome'];
      return requiredFields.every(field => documents[field as keyof typeof documents] !== null);
    }
    return false;
  };

  const handleSubmit = () => {
    if (!validateRequiredDocuments()) {
      toast({
        title: "Missing Required Documents",
        description: "Please upload all required documents before submitting your application.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "TF Bank Account Request Submitted",
      description: `Your ${selectedPack === 'student' ? 'Student TF Bank' : 'Pack Elyssa TF Bank'} account request has been submitted successfully.`,
    });
  };

  const renderDocumentUpload = (field: string, label: string, required: boolean = true) => (
    <div>
      <Label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={field}
        type="file"
        onChange={(e) => handleFileUpload(field, e.target.files?.[0] || null)}
        className="w-full"
        accept=".pdf,.jpg,.jpeg,.png"
        required={required}
      />
      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TF Bank Account Request</h1>
          <p className="text-gray-600">Choose your preferred TF Bank account package and upload required documents.</p>
        </div>

        {!selectedPack ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-stb-teal">
              <CardHeader>
                <CardTitle className="text-center text-stb-teal">Pack Student TF Bank</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/img/fbd2065f-5803-4888-bd8a-c7d49d046ec8.png" 
                    alt="Pack Student TF Bank" 
                    className="w-full max-w-xs h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="text-gray-600">
                  <p className="mb-2">Perfect for students studying abroad</p>
                  <ul className="text-sm space-y-1">
                    <li>• No monthly fees</li>
                    <li>• Student-friendly features</li>
                    <li>• International transfer benefits</li>
                    <li>• Educational institution partnerships</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => handlePackSelection('student')}
                  className="w-full bg-stb-teal hover:bg-stb-teal/90 text-white"
                >
                  Choose Student Pack
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-stb-purple">
              <CardHeader>
                <CardTitle className="text-center text-stb-purple">Pack Elyssa TF Bank</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/img/37cfdb60-9f66-4add-a6f5-5345c1af8244.png" 
                    alt="Pack Elyssa TF Bank" 
                    className="w-full max-w-xs h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="text-gray-600">
                  <p className="mb-2">Comprehensive banking for professionals</p>
                  <ul className="text-sm space-y-1">
                    <li>• Premium banking services</li>
                    <li>• Enhanced transfer limits</li>
                    <li>• Priority customer support</li>
                    <li>• Investment opportunities</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => handlePackSelection('elyssa')}
                  className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white"
                >
                  Choose Elyssa Pack
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {selectedPack === 'student' ? 'Student TF Bank' : 'Pack Elyssa TF Bank'} - Required Documents
                </CardTitle>
                <Button 
                  onClick={() => setSelectedPack(null)}
                  variant="outline"
                >
                  Change Package
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedPack === 'student' ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-stb-teal mb-2">Student TF Bank Requirements:</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• A valid official identity document</li>
                        <li>• A copy of your passport with student visa</li>
                        <li>• Proof of enrollment in an educational institution abroad</li>
                        <li>• A scholarship certificate or other proof of income (if applicable)</li>
                        <li>• Proof of residence for you or your parents in Tunisia</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderDocumentUpload('identityDocument', 'Valid Official Identity Document')}
                      {renderDocumentUpload('passport', 'Passport with Student Visa')}
                      {renderDocumentUpload('proofOfEnrollment', 'Proof of Enrollment')}
                      {renderDocumentUpload('scholarshipCertificate', 'Scholarship Certificate / Proof of Income', false)}
                      {renderDocumentUpload('proofOfResidence', 'Proof of Residence in Tunisia')}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-stb-purple mb-2">Pack Elyssa TF Bank Requirements:</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Valid Identification:</strong> A government-issued ID such as a passport or national ID card</li>
                        <li>• <strong>Proof of Address:</strong> A recent utility bill, lease agreement, or official correspondence showing your current address</li>
                        <li>• <strong>Proof of Income or Financial Resources:</strong> Recent payslips, bank statements, or other documents demonstrating your financial stability</li>
                        <li>• <strong>Student Status (if applicable):</strong> For students, a copy of your student visa and enrollment confirmation from your educational institution</li>
                        <li>• <strong>Proof of Residency (if applicable):</strong> For non-EU residents applying in Germany, a valid residence permit with at least 24 months' validity from the application date</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderDocumentUpload('identityDocument', 'Valid Identification (Passport/National ID)')}
                      {renderDocumentUpload('proofOfAddress', 'Proof of Address')}
                      {renderDocumentUpload('proofOfIncome', 'Proof of Income or Financial Resources')}
                      {renderDocumentUpload('studentVisa', 'Student Visa (if applicable)', false)}
                      {renderDocumentUpload('proofOfEnrollment', 'Enrollment Confirmation (if student)', false)}
                      {renderDocumentUpload('residencePermit', 'Residence Permit (if non-EU resident)', false)}
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setSelectedPack(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="bg-stb-purple hover:bg-stb-purple/90 text-white"
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TFBankAccountRequest;
