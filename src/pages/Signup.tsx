
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Upload, Check, X, Phone, Mail } from 'lucide-react';
import Header from "@/components/Layout/Header";

const rightBgPattern =
  "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#f8f9fb] via-[#f8f9fb] to-[#f3f6fa90]";

interface DocumentUpload {
  file: File | null;
  preview: string | null;
  error: string | null;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cinNumber: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    isExistingCustomer: false,
    existingAccountNumber: '',
    otpMethod: 'mobile' as 'mobile' | 'email',
    otp: '',
    agreedToTerms: false
  });

  const [documents, setDocuments] = useState({
    cinFront: { file: null, preview: null, error: null } as DocumentUpload,
    cinBack: { file: null, preview: null, error: null } as DocumentUpload,
    selfie: { file: null, preview: null, error: null } as DocumentUpload
  });

  const [currentStep, setCurrentStep] = useState<'info' | 'otp' | 'documents' | 'success'>('info');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'cinNumber':
        return !/^\d{8}$/.test(value) ? 'CIN must be 8 digits' : '';
      case 'dateOfBirth':
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age < 18 ? 'Must be at least 18 years old' : '';
      case 'mobileNumber':
        return !/^\+216\d{8}$/.test(value) ? 'Invalid Tunisian mobile format (+216xxxxxxxx)' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return !passwordRegex.test(value) 
          ? 'Password must be 8+ characters with uppercase, lowercase, number, and special character' 
          : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'otp':
        return !/^\d{6}$/.test(value) ? 'OTP must be 6 digits' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileUpload = (type: keyof typeof documents, file: File) => {
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedTypes.includes(file.type)) {
      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], error: 'Only JPG, PNG, or PDF files allowed' }
      }));
      return;
    }

    if (file.size > maxSize) {
      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], error: 'File size must be less than 5MB' }
      }));
      return;
    }

    // Create preview for images
    const reader = new FileReader();
    reader.onload = (e) => {
      setDocuments(prev => ({
        ...prev,
        [type]: {
          file,
          preview: file.type.startsWith('image/') ? e.target?.result as string : null,
          error: null
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const sendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to your ${formData.otpMethod === 'mobile' ? 'mobile number' : 'email'}`,
    });
  };

  const verifyOTP = async () => {
    if (formData.otp === '123456') { // Demo OTP
      toast({
        title: "OTP Verified",
        description: "Phone number verified successfully",
      });
      setCurrentStep('documents');
    } else {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP code' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'info') {
      // Validate all required fields
      const requiredFields = ['firstName', 'lastName', 'cinNumber', 'dateOfBirth', 'mobileNumber', 'email', 'password', 'confirmPassword'];
      const newErrors: Record<string, string> = {};
      
      requiredFields.forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) newErrors[field] = error;
      });

      if (!formData.agreedToTerms) {
        newErrors.terms = 'You must agree to the terms and conditions';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setCurrentStep('otp');
      await sendOTP();
    }
  };

  const finalizeRegistration = async () => {
    setIsLoading(true);
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    setCurrentStep('success');
  };

  const renderPersonalInfoStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <img
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
          alt="STB Logo"
          className="w-8 h-8 mx-auto mb-3"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Secure account registration for STB customers</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="cinNumber">CIN Number *</Label>
          <Input
            id="cinNumber"
            type="text"
            value={formData.cinNumber}
            onChange={(e) => handleInputChange('cinNumber', e.target.value)}
            placeholder="Enter your 8-digit CIN number"
            maxLength={8}
            className={errors.cinNumber ? 'border-red-500' : ''}
          />
          {errors.cinNumber && <p className="text-red-500 text-sm mt-1">{errors.cinNumber}</p>}
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <Input
            id="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            placeholder="+216xxxxxxxx"
            className={errors.mobileNumber ? 'border-red-500' : ''}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Existing Customer Check */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="existingCustomer"
            checked={formData.isExistingCustomer}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, isExistingCustomer: checked as boolean }))
            }
          />
          <Label htmlFor="existingCustomer">Are you an existing STB customer?</Label>
        </div>

        {formData.isExistingCustomer && (
          <div>
            <Label htmlFor="existingAccountNumber">Existing Account Number or RIB</Label>
            <Input
              id="existingAccountNumber"
              type="text"
              value={formData.existingAccountNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, existingAccountNumber: e.target.value }))}
              placeholder="Enter your account number or RIB"
            />
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Password Setup
        </h3>
        
        <div>
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, agreedToTerms: checked as boolean }))
            }
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            I agree to the{' '}
            <Link to="/terms" target="_blank" className="text-stb-purple hover:underline">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy" target="_blank" className="text-stb-purple hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
      >
        {isLoading ? 'Processing...' : 'Continue to Verification'}
      </Button>

      <div className="text-center">
        <span className="text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-stb-purple hover:text-stb-purple/80 font-medium">
            Log In
          </Link>
        </span>
      </div>
    </form>
  );

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {formData.otpMethod === 'mobile' ? (
            <Phone className="h-12 w-12 text-stb-teal" />
          ) : (
            <Mail className="h-12 w-12 text-stb-teal" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Identity</h2>
        <p className="text-gray-600 mb-2">
          We sent a verification code to your {formData.otpMethod === 'mobile' ? 'mobile number' : 'email'}
        </p>
        <p className="font-medium text-gray-900">
          {formData.otpMethod === 'mobile' ? formData.mobileNumber : formData.email}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, otpMethod: 'mobile' }))}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              formData.otpMethod === 'mobile'
                ? 'bg-stb-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            SMS
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, otpMethod: 'email' }))}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              formData.otpMethod === 'email'
                ? 'bg-stb-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Email
          </button>
        </div>

        <div>
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            value={formData.otp}
            onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className={`text-center text-lg tracking-widest ${errors.otp ? 'border-red-500' : ''}`}
            maxLength={6}
          />
          {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
        </div>

        <Button
          onClick={verifyOTP}
          disabled={formData.otp.length !== 6}
          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
        >
          Verify Code
        </Button>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={sendOTP}
              className="text-stb-purple hover:text-stb-purple/90 font-medium"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Documents</h2>
        <p className="text-gray-600">Please upload the required documents for account verification</p>
      </div>

      <div className="space-y-6">
        {/* CIN Front */}
        <div>
          <Label className="text-base font-medium">CIN Front Side *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-stb-purple transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('cinFront', e.target.files[0])}
              className="hidden"
              id="cinFront"
            />
            <label htmlFor="cinFront" className="cursor-pointer">
              {documents.cinFront.file ? (
                <div className="space-y-2">
                  <Check className="h-8 w-8 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-green-600">{documents.cinFront.file.name}</p>
                  {documents.cinFront.preview && (
                    <img src={documents.cinFront.preview} alt="CIN Front" className="max-h-20 mx-auto" />
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload CIN front side</p>
                  <p className="text-xs text-gray-500">JPG, PNG, or PDF (max 5MB)</p>
                </div>
              )}
            </label>
          </div>
          {documents.cinFront.error && <p className="text-red-500 text-sm mt-1">{documents.cinFront.error}</p>}
        </div>

        {/* CIN Back */}
        <div>
          <Label className="text-base font-medium">CIN Back Side *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-stb-purple transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('cinBack', e.target.files[0])}
              className="hidden"
              id="cinBack"
            />
            <label htmlFor="cinBack" className="cursor-pointer">
              {documents.cinBack.file ? (
                <div className="space-y-2">
                  <Check className="h-8 w-8 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-green-600">{documents.cinBack.file.name}</p>
                  {documents.cinBack.preview && (
                    <img src={documents.cinBack.preview} alt="CIN Back" className="max-h-20 mx-auto" />
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload CIN back side</p>
                  <p className="text-xs text-gray-500">JPG, PNG, or PDF (max 5MB)</p>
                </div>
              )}
            </label>
          </div>
          {documents.cinBack.error && <p className="text-red-500 text-sm mt-1">{documents.cinBack.error}</p>}
        </div>

        {/* Selfie */}
        <div>
          <Label className="text-base font-medium">Selfie Photo *</Label>
          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-stb-purple transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('selfie', e.target.files[0])}
              className="hidden"
              id="selfie"
            />
            <label htmlFor="selfie" className="cursor-pointer">
              {documents.selfie.file ? (
                <div className="space-y-2">
                  <Check className="h-8 w-8 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-green-600">{documents.selfie.file.name}</p>
                  {documents.selfie.preview && (
                    <img src={documents.selfie.preview} alt="Selfie" className="max-h-20 mx-auto" />
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload your selfie</p>
                  <p className="text-xs text-gray-500">Clear photo of your face (JPG or PNG, max 5MB)</p>
                </div>
              )}
            </label>
          </div>
          {documents.selfie.error && <p className="text-red-500 text-sm mt-1">{documents.selfie.error}</p>}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => setCurrentStep('otp')}
          variant="outline"
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={finalizeRegistration}
          disabled={!documents.cinFront.file || !documents.cinBack.file || !documents.selfie.file || isLoading}
          className="flex-1 bg-stb-purple hover:bg-stb-purple/90 text-white"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div>
        <Check className="h-16 w-16 text-stb-green mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Created Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your account has been created and is pending verification. You will receive a notification 
          once your documents are reviewed by our team.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <div className="flex items-center justify-center space-x-2">
          <Check className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-700 font-medium">
            Registration completed successfully
          </p>
        </div>
      </div>
      
      <Button 
        onClick={() => navigate('/login')}
        className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
      >
        Continue to Login
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'info':
        return renderPersonalInfoStep();
      case 'otp':
        return renderOTPStep();
      case 'documents':
        return renderDocumentsStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderPersonalInfoStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* LEFT: Form */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 lg:px-16">
          <div className="max-w-md w-full mx-auto py-8">
            {/* Progress Indicator */}
            {currentStep !== 'success' && (
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  {['info', 'otp', 'documents'].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step ? 'bg-stb-purple text-white' :
                        ['info', 'otp', 'documents'].indexOf(currentStep) > index ? 'bg-green-500 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {['info', 'otp', 'documents'].indexOf(currentStep) > index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < 2 && (
                        <div className={`w-8 h-1 rounded ${
                          ['info', 'otp', 'documents'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {renderCurrentStep()}
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

export default Signup;