
import React from 'react';
import { AccountRequestProvider, useAccountRequest } from '@/contexts/AccountRequestContext';
import PersonalInfoStep from '@/components/account-request/PersonalInfoStep';
import DocumentUploadStep from '@/components/account-request/DocumentUploadStep';
import ReviewStep from '@/components/account-request/ReviewStep';
import Header from '@/components/Layout/Header';

const AccountRequestContent: React.FC = () => {
  const { currentStep } = useAccountRequest();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <DocumentUploadStep />;
      case 3:
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto w-full mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-stb-purple text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    step <= currentStep ? 'text-stb-purple' : 'text-gray-500'
                  }`}
                >
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Documents'}
                  {step === 3 && 'Review'}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step < currentStep ? 'bg-stb-purple' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

const AccountRequest: React.FC = () => {
  return (
    <AccountRequestProvider>
      <AccountRequestContent />
    </AccountRequestProvider>
  );
};

export default AccountRequest;
