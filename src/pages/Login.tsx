import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';
import Header from "@/components/Layout/Header";

const rightBgPattern =
  "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#f8f9fb] via-[#f8f9fb] to-[#f3f6fa90]";

type LoginStep = 'credentials' | 'mfa' | 'locked';

const Login: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<LoginStep>('credentials');
  const [formData, setFormData] = useState({
    identifier: '', // Email or CIN
    password: '',
    rememberMe: false,
    mfaCode: '',
    mfaMethod: 'sms' as 'sms' | 'email'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [identifierType, setIdentifierType] = useState<'email' | 'cin' | ''>('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const detectIdentifierType = (value: string): 'email' | 'cin' | '' => {
    if (value.includes('@')) return 'email';
    if (/^\d{8}$/.test(value)) return 'cin';
    return '';
  };

  const handleIdentifierChange = (value: string) => {
    setFormData(prev => ({ ...prev, identifier: value }));
    setIdentifierType(detectIdentifierType(value));
    setErrors(prev => ({ ...prev, identifier: '' }));
  };

  const validateCredentials = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email address or CIN is required';
    } else {
      const type = detectIdentifierType(formData.identifier);
      if (!type) {
        newErrors.identifier = 'Please enter a valid email address or 8-digit CIN';
      } else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)) {
        newErrors.identifier = 'Invalid email format';
      } else if (type === 'cin' && !/^\d{8}$/.test(formData.identifier)) {
        newErrors.identifier = 'CIN must be exactly 8 digits';
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (captchaRequired && !captchaVerified) {
      newErrors.captcha = 'Please complete the security verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCredentials()) return;

    setIsLoading(true);

    try {
      // Simulate credential validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo: reject if password is "wrong"
      if (formData.password === 'wrong') {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        if (newFailedAttempts >= 3) {
          setCurrentStep('locked');
          toast({
            title: "Account Temporarily Locked",
            description: "Too many failed attempts. Please try again in 15 minutes.",
            variant: "destructive"
          });
        } else {
          if (newFailedAttempts >= 2) {
            setCaptchaRequired(true);
          }
          setErrors({ general: 'Invalid Username/Password' });
          toast({
            title: "Login Failed",
            description: `Invalid credentials. ${3 - newFailedAttempts} attempts remaining.`,
            variant: "destructive"
          });
        }
      } else {
        // Successful credential validation - proceed to MFA
        setCurrentStep('mfa');
        toast({
          title: "Credentials Verified",
          description: "Please complete two-factor authentication",
        });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const sendMFACode = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Verification Code Sent",
      description: `A security code has been sent to your registered ${formData.mfaMethod === 'sms' ? 'mobile number' : 'email address'}`,
    });
  };

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^\d{6}$/.test(formData.mfaCode)) {
      setErrors({ mfaCode: 'Please enter a valid 6-digit code' });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo: accept "123456"
      if (formData.mfaCode === '123456') {
        const result = await login(formData.identifier, formData.password);
        if (result.success) {
          toast({
            title: "Welcome back!",
            description: "Login successful. Redirecting to your dashboard.",
          });
          navigate(result.redirectTo);
        }
      } else {
        setErrors({ mfaCode: 'Invalid verification code' });
      }
    } catch (error) {
      setErrors({ mfaCode: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCredentialsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <img
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
          alt="STB Logo"
          className="w-8 h-8 mx-auto mb-3"
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your STB account securely</p>
      </div>

      <form onSubmit={handleCredentialsSubmit} className="space-y-6">
        <div>
          <Label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address or CIN Number *
          </Label>
          <Input
            id="identifier"
            type="text"
            value={formData.identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            placeholder="Enter your email or 8-digit CIN"
            className={`w-full ${errors.identifier ? 'border-red-500' : ''}`}
            required
          />
          {identifierType && (
            <p className="text-sm text-gray-500 mt-1">
              Detected: {identifierType === 'email' ? 'Email Address' : 'CIN Number'}
            </p>
          )}
          {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              className={`w-full pr-10 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* CAPTCHA */}
        {captchaRequired && (
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
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
              }
            />
            <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me for 7 days
            </Label>
          </div>
          <Link 
            to="/forgot-password" 
            className="text-sm text-stb-purple hover:text-stb-purple/90 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {formData.rememberMe && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700">
                Only use "Remember me" on your personal devices. Do not select this option on public or shared computers.
              </p>
            </div>
          </div>
        )}

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
        >
          {isLoading ? 'Verifying...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <span className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-stb-purple hover:text-stb-purple/90 font-medium">
              Sign Up
            </Link>
          </span>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Secure Banking Access</p>
              <p>
                Your connection is encrypted and protected by advanced security measures. 
                For your safety, always verify you're on the official STB website.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const renderMFAStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-12 w-12 text-stb-teal mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-600 mb-4">
          For your security, please complete the second authentication step
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, mfaMethod: 'sms' }));
              sendMFACode();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
              formData.mfaMethod === 'sms'
                ? 'bg-stb-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Phone className="h-4 w-4" />
            <span>SMS</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, mfaMethod: 'email' }));
              sendMFACode();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
              formData.mfaMethod === 'email'
                ? 'bg-stb-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </button>
        </div>

        <form onSubmit={handleMFASubmit} className="space-y-4">
          <div>
            <Label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code *
            </Label>
            <Input
              id="mfaCode"
              type="text"
              value={formData.mfaCode}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                mfaCode: e.target.value.replace(/\D/g, '').slice(0, 6) 
              }))}
              placeholder="Enter 6-digit code"
            className={`w-full text-center text-lg tracking-widest ${errors.mfaCode ? 'border-red-500' : 'border-gray-200'}`}
              maxLength={6}
              required
            />
            {errors.mfaCode && <p className="text-red-500 text-sm mt-1">{errors.mfaCode}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading || formData.mfaCode.length !== 6}
            className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3"
          >
            {isLoading ? 'Verifying...' : 'Verify & Sign In'}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={sendMFACode}
            className="text-stb-purple hover:text-stb-purple/90 font-medium text-sm"
          >
            Resend Code
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setCurrentStep('credentials')}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );

  const renderLockedStep = () => (
    <div className="space-y-6 text-center">
      <div>
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Temporarily Locked</h2>
        <p className="text-gray-600 mb-6">
          Your account has been temporarily locked due to multiple failed login attempts.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="space-y-2 text-sm text-red-700">
          <p className="font-medium">Security Lockout Active</p>
          <p>Please wait 15 minutes before attempting to log in again.</p>
          <p>If you continue to experience issues, please contact STB Support.</p>
        </div>
      </div>

      <div className="space-y-3">
        <Link to="/forgot-password">
          <Button variant="outline" className="w-full">
            Reset Password
          </Button>
        </Link>
        
        <Link to="/support">
          <Button variant="outline" className="w-full">
            Contact STB Support
          </Button>
        </Link>
        
        <button
          onClick={() => {
            setCurrentStep('credentials');
            setFailedAttempts(0);
            setCaptchaRequired(false);
            setCaptchaVerified(false);
            setErrors({});
          }}
          className="w-full text-stb-purple hover:text-stb-purple/90 text-sm font-medium py-2"
        >
          Try Again (Demo)
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'credentials':
        return renderCredentialsStep();
      case 'mfa':
        return renderMFAStep();
      case 'locked':
        return renderLockedStep();
      default:
        return renderCredentialsStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* LEFT: Form */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 lg:px-16">
          <div className="max-w-md mx-auto w-full pt-12 pb-8 flex flex-col h-full justify-center">
            {renderCurrentStep()}
            
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

export default Login;