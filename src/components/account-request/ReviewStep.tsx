
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAccountRequest } from '@/contexts/AccountRequestContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { FileText, Image, CheckCircle } from 'lucide-react';

const ReviewStep: React.FC = () => {
  const { requestData, updateConfirmation, submitRequest, setCurrentStep } = useAccountRequest();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isConfirmed, setIsConfirmed] = useState(requestData.confirmed);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!isConfirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that all information is accurate",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    updateConfirmation(isConfirmed);

    try {
      await submitRequest();
      setIsSubmitted(true);
      
      toast({
        title: "Request Submitted Successfully",
        description: "Your account request has been submitted for review",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your account request has been successfully submitted. You will receive a notification 
            once it's reviewed by our team.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login page...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Review & Confirmation</CardTitle>
        <p className="text-gray-600">Please review your information before submitting</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium">Full Name:</span>
              <p>{requestData.personalInfo.fullName}</p>
            </div>
            <div>
              <span className="font-medium">CIN:</span>
              <p>{requestData.personalInfo.cin}</p>
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span>
              <p>{new Date(requestData.personalInfo.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium">Phone:</span>
              <p>+216 {requestData.personalInfo.phoneNumber}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Email:</span>
              <p>{requestData.personalInfo.email}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Address:</span>
              <p>{requestData.personalInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Documents Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Uploaded Documents</h3>
          <div className="space-y-2">
            {requestData.documents.map((doc, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                {doc.file.type.startsWith('image/') ? (
                  <Image className="w-4 h-4 text-blue-500" />
                ) : (
                  <FileText className="w-4 h-4 text-red-500" />
                )}
                <span className="font-medium">
                  {doc.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                </span>
                <span>{doc.file.name}</span>
                <span className="text-gray-500">
                  ({(doc.file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="confirmation"
            checked={isConfirmed}
            onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
          />
          <Label htmlFor="confirmation" className="text-sm">
            I confirm that all information provided is accurate and complete.
          </Label>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !isConfirmed}
            className="bg-stb-purple hover:bg-stb-purple/90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Account Request'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
