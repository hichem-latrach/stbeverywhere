
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAccountRequest, UploadedFile } from '@/contexts/AccountRequestContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, Image } from 'lucide-react';

const DocumentUploadStep: React.FC = () => {
  const { requestData, updateDocuments, setCurrentStep } = useAccountRequest();
  const { toast } = useToast();
  
  const [documents, setDocuments] = useState<UploadedFile[]>(requestData.documents);

  const requiredDocuments = [
    { type: 'cin-front' as const, label: 'CIN Front', required: true },
    { type: 'cin-back' as const, label: 'CIN Back', required: true },
    { type: 'proof-residence' as const, label: 'Proof of Residence', required: true },
    { type: 'selfie' as const, label: 'Selfie/Photo', required: true }
  ];

  const validateFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload JPG, PNG, or PDF files only",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 5MB",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = (type: UploadedFile['type'], file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newDoc: UploadedFile = {
        file,
        preview: e.target?.result as string,
        type
      };

      setDocuments(prev => {
        const filtered = prev.filter(doc => doc.type !== type);
        return [...filtered, newDoc];
      });
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (type: UploadedFile['type']) => {
    setDocuments(prev => prev.filter(doc => doc.type !== type));
  };

  const getUploadedDoc = (type: UploadedFile['type']) => {
    return documents.find(doc => doc.type === type);
  };

  const validateAllDocuments = () => {
    const missingDocs = requiredDocuments.filter(req => 
      req.required && !getUploadedDoc(req.type)
    );

    if (missingDocs.length > 0) {
      toast({
        title: "Missing Documents",
        description: `Please upload: ${missingDocs.map(doc => doc.label).join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateAllDocuments()) {
      updateDocuments(documents);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <p className="text-gray-600">Please upload the required documents</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {requiredDocuments.map((docReq) => {
          const uploadedDoc = getUploadedDoc(docReq.type);
          
          return (
            <div key={docReq.type} className="border rounded-lg p-4">
              <Label className="text-sm font-medium">
                {docReq.label} {docReq.required && '*'}
              </Label>
              
              {uploadedDoc ? (
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center space-x-2">
                    {uploadedDoc.file.type.startsWith('image/') ? (
                      <Image className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm">{uploadedDoc.file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(uploadedDoc.file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDocument(docReq.type)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> {docReq.label}
                      </p>
                      <p className="text-xs text-gray-500">JPG, PNG or PDF (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(docReq.type, file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext} className="bg-stb-purple hover:bg-stb-purple/90">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadStep;
