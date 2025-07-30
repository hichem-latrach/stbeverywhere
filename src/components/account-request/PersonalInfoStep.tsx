
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccountRequest, PersonalInfo } from '@/contexts/AccountRequestContext';
import { useToast } from '@/hooks/use-toast';

const PersonalInfoStep: React.FC = () => {
  const { requestData, updatePersonalInfo, setCurrentStep } = useAccountRequest();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PersonalInfo>(requestData.personalInfo);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCIN = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers;
    }
    return numbers.substring(0, 8);
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers;
    }
    return numbers.substring(0, 8);
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = () => {
    const required = ['fullName', 'cin', 'dateOfBirth', 'phoneNumber', 'email', 'address'];
    for (const field of required) {
      if (!formData[field as keyof PersonalInfo]) {
        toast({
          title: "Missing Information",
          description: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return false;
      }
    }

    if (formData.cin.length !== 8) {
      toast({
        title: "Invalid CIN",
        description: "CIN must be exactly 8 digits",
        variant: "destructive"
      });
      return false;
    }

    if (formData.phoneNumber.length !== 8) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 8 digits",
        variant: "destructive"
      });
      return false;
    }

    // Age validation - must be 18 or older
    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        toast({
          title: "Age Requirement",
          description: "You must be at least 18 years old to open an account",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      updatePersonalInfo(formData);
      setCurrentStep(2);
    }
  };

  // Calculate max date (18 years ago from today)
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <p className="text-gray-600">Please provide your personal details to continue</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="cin">National ID (CIN) *</Label>
          <Input
            id="cin"
            value={formData.cin}
            onChange={(e) => handleInputChange('cin', formatCIN(e.target.value))}
            placeholder="12345678"
            maxLength={8}
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth * (Must be 18 or older)</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            max={getMaxDate()}
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-200 rounded-l-md">
              +216
            </span>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', formatPhoneNumber(e.target.value))}
              placeholder="12345678"
              maxLength={8}
              className="rounded-l-none"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <Label htmlFor="address">Physical Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter your complete address"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} className="bg-stb-purple hover:bg-stb-purple/90">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoStep;
