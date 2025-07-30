
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PersonalInfo {
  fullName: string;
  cin: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  type: 'cin-front' | 'cin-back' | 'proof-residence' | 'selfie';
}

export interface AccountRequestData {
  personalInfo: PersonalInfo;
  documents: UploadedFile[];
  confirmed: boolean;
}

interface AccountRequestContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  requestData: AccountRequestData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateDocuments: (documents: UploadedFile[]) => void;
  updateConfirmation: (confirmed: boolean) => void;
  submitRequest: () => Promise<void>;
}

const AccountRequestContext = createContext<AccountRequestContextType | undefined>(undefined);

export const useAccountRequest = () => {
  const context = useContext(AccountRequestContext);
  if (!context) {
    throw new Error('useAccountRequest must be used within AccountRequestProvider');
  }
  return context;
};

export const AccountRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [requestData, setRequestData] = useState<AccountRequestData>({
    personalInfo: {
      fullName: '',
      cin: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      address: ''
    },
    documents: [],
    confirmed: false
  });

  const updatePersonalInfo = (info: PersonalInfo) => {
    setRequestData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateDocuments = (documents: UploadedFile[]) => {
    setRequestData(prev => ({ ...prev, documents }));
  };

  const updateConfirmation = (confirmed: boolean) => {
    setRequestData(prev => ({ ...prev, confirmed }));
  };

  const submitRequest = async () => {
    // Simulate API call to submit the request
    const requestId = Date.now().toString();
    const submissionDate = new Date().toISOString().split('T')[0];
    
    // This would normally be sent to a backend API
    const newRequest = {
      id: requestId,
      type: 'account' as const,
      user: requestData.personalInfo.fullName,
      email: requestData.personalInfo.email,
      description: 'New Account Opening Request',
      status: 'pending' as const,
      date: submissionDate,
      personalInfo: requestData.personalInfo,
      documents: requestData.documents.map(doc => ({
        type: doc.type,
        fileName: doc.file.name,
        size: doc.file.size
      }))
    };

    // Store in localStorage to simulate backend storage
    const existingRequests = JSON.parse(localStorage.getItem('accountRequests') || '[]');
    existingRequests.push(newRequest);
    localStorage.setItem('accountRequests', JSON.stringify(existingRequests));

    console.log('Account request submitted:', newRequest);
  };

  return (
    <AccountRequestContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        requestData,
        updatePersonalInfo,
        updateDocuments,
        updateConfirmation,
        submitRequest
      }}
    >
      {children}
    </AccountRequestContext.Provider>
  );
};
