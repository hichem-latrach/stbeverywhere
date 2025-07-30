
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Lock, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import Header from "@/components/Layout/Header";

type Step = 'identification' | 'verification' | 'newPassword' | 'success';

const rightBgPattern =
  "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#f8f9fb] via-[#f8f9fb] to-[#f3f6fa90]";

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('identification');
  const [formData, setFormData] = useState({
    identifier: '', // Email or CIN
    identifierType: '' as 'email' | 'cin' | '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { toast } = useToast();

  const detectIdentifierType = (value: string): 'email' | 'cin' | '' => {
    if (value.includes('@')) return 'email';
    if (/^\d{8}$/.test(value)) return 'cin';
    return '';
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'identifier':
        const type = detectIdentifierType(value);
        if (!type) return 'Please enter a valid email address or 8-digit CIN';
        if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email format';
        }
        if (type === 'cin' && !/^\d{8}$/.test(value)) {
          return 'CIN must be exactly 8 digits';
        }
        return '';
      case 'verificationCode':
        return !/^\d{6}$/.test(value) ? 'Verification code must be 6 digits' : '';
      case 'newPassword':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return !passwordRegex.test(value) 
          ? 'Password must be 8+ characters with uppercase, lowercase, number, and special character' 
          : '';
      case 'confirmPassword':
        return value !== formData.newPassword ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'identifier' && { identifierType: detectIdentifierType(value) })
    }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleIdentificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateField('identifier', formData.identifier);
    if (error) {
      setErrors({ identifier: error });
      return;
    }

    if (!captchaVerified) {
      setErrors({ captcha: 'Please complete the security verification' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reset Request Processed",
        description: "If an account with this information exists, a reset code has been sent to your registered contact method.",
      });
      setCurrentStep('verification');
    }, 2000);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateField('verificationCode', formData.verificationCode);
    if (error) {
      setErrors({ verificationCode: error });
      return;
    }

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (formData.verificationCode === '123456') {
        toast({
          title: "Code Verified",
          description: "Please set your new password",
        });
        setCurrentStep('newPassword');
      } else {
        setErrors({ verificationCode: 'Invalid verification code. Please try again.' });
      }
    }, 1500);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordError = validateField('newPassword', formData.newPassword);
    const confirmError = validateField('confirmPassword', formData.confirmPassword);
    
    if (passwordError || confirmError) {
      setErrors({
        newPassword: passwordError,
        confirmPassword: confirmError
      });
      return;
    }

    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('success');
    }, 2000);
  };

  const renderIdentificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-12 w-12 text-stb-purple mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Enter your registered email address or CIN number to receive password reset instructions.
        </p>
      </div>
      
      <form onSubmit={handleIdentificationSubmit} className="space-y-6">
        <div>
          <Label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address or CIN Number *
          </Label>
          <Input
            id="identifier"
            type="text"
            value={formData.identifier}
            onChange={(e) => handleInputChange('identifier', e.target.value)}
            placeholder="Enter your email or 8-digit CIN"
            className={`w-full ${errors.identifier ? 'border-red-500' : ''}`}
            required
          />
          {formData.identifierType && (
            <p className="text-sm text-gray-500 mt-1">
              Detected: {formData.identifierType === 'email' ? 'Email Address' : 'CIN Number'}
            </p>
          )}
          {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
        </div>

        {/* Simple CAPTCHA Simulation */}
        <div className="space-y-3">
          <Label className="block text-sm font-medium text-gray-700">
            Security Verification *
          </Label>
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                  {captchaVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <span className="text-sm text-gray-700">I'm not a robot</span>
              </div>
              <button
                type="button"
                onClick={() => setCaptchaVerified(!captchaVerified)}
                className={`px-3 py-1 text-xs rounded ${
                  captchaVerified 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {captchaVerified ? 'Verified' : 'Click to verify'}
              </button>
            </div>
          </div>
          {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha}</p>}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
        >
          {isLoading ? 'Processing...' : 'Send Reset Instructions'}
        </Button>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Security Notice</p>
              <p>
                For your security, we don't confirm whether an account exists. 
                If your information is registered with us, you'll receive reset instructions.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Mail className="h-12 w-12 text-stb-teal mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Messages</h2>
        <p className="text-gray-600 mb-2">
          We've sent a verification code to your registered contact method
        </p>
        <p className="font-medium text-gray-900">
          {formData.identifierType === 'email' ? 'Email Address' : 'Mobile Number'}
        </p>
      </div>
      
      <form onSubmit={handleVerificationSubmit} className="space-y-6">
        <div>
          <Label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code *
          </Label>
          <Input
            id="verificationCode"
            type="text"
            value={formData.verificationCode}
            onChange={(e) => handleInputChange('verificationCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className={`w-full text-center text-lg tracking-widest ${errors.verificationCode ? 'border-red-500' : ''}`}
            maxLength={6}
            required
          />
          {errors.verificationCode && <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || formData.verificationCode.length !== 6}
          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
        
        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={() => {
              toast({
                title: "Code Resent",
                description: "A new verification code has been sent to your registered contact method",
              });
            }}
            className="text-stb-purple hover:text-stb-purple/90 font-medium text-sm"
          >
            Resend Code
          </button>
        </div>

        <div className="text-center">
          <Link 
            to="/support" 
            className="text-stb-purple hover:text-stb-purple/90 text-sm font-medium"
          >
            Need help? Contact STB Support
          </Link>
        </div>
      </form>
    </div>
  );

  const renderNewPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Lock className="h-12 w-12 text-stb-green mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
        <p className="text-gray-600">
          Choose a strong password that you haven't used before
        </p>
      </div>
      
      <form onSubmit={handlePasswordReset} className="space-y-6">
        <div>
          <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password *
          </Label>
          <Input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            placeholder="Enter your new password"
            className={`w-full ${errors.newPassword ? 'border-red-500' : ''}`}
            required
          />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">Password must contain:</p>
            <ul className="text-xs text-gray-500 space-y-0.5 ml-4">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter (A-Z)</li>
              <li>• One lowercase letter (a-z)</li>
              <li>• One number (0-9)</li>
              <li>• One special character (@$!%*?&)</li>
            </ul>
          </div>
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password *
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your new password"
            className={`w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </Button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div>
        <CheckCircle className="h-16 w-16 text-stb-green mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Password Reset Complete</h2>
        <p className="text-gray-600 mb-6">
          Your password has been successfully updated. You can now log in with your new password.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-700 font-medium">
            Your account is now secure with the new password
          </p>
        </div>
      </div>
      
      <Link to="/login">
        <Button className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3">
          Continue to Login
        </Button>
      </Link>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'identification':
        return renderIdentificationStep();
      case 'verification':
        return renderVerificationStep();
      case 'newPassword':
        return renderNewPasswordStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderIdentificationStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* LEFT: Form */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 lg:px-16">
          <div className="max-w-md mx-auto w-full pt-12 pb-8 flex flex-col h-full justify-center">
            {currentStep !== 'success' && (
              <Link 
                to={currentStep === 'identification' ? '/login' : '#'}
                onClick={currentStep !== 'identification' ? (e) => {
                  e.preventDefault();
                  if (currentStep === 'verification') setCurrentStep('identification');
                  if (currentStep === 'newPassword') setCurrentStep('verification');
                } : undefined}
                className="flex items-center text-stb-purple hover:text-stb-purple/90 mb-6 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            )}
            
            {renderStepContent()}
            
            {currentStep === 'identification' && (
              <div className="mt-8 text-center text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-stb-purple hover:text-stb-purple/90 font-medium">
                  Sign In
                </Link>
              </div>
            )}
            
            <div className="mt-16 pt-12 text-xs text-gray-400 text-center">
              © STB Everywhere 2025 - Secure Banking Platform
            </div>
          </div>
        </div>
        
        {/* RIGHT: Image Preview */}
        <div className={`hidden lg:flex lg:w-1/2 justify-center items-start ${rightBgPattern} relative overflow-visible`}>
          <div className="w-[90%] mt-[64px] flex justify-end">
            <img
              src="/img/9bc6ba88-74e5-40ca-ab6b-3b38c829b0ec.png"
              alt="STB Dashboard UI preview"
              className="rounded-2xl shadow-xl border border-[#e5e7eb] object-cover max-w-full"
              style={{
                width: '600px',
                height: 'auto',
                maxHeight: '80vh',
                marginRight: '-60px',
                background: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;