import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Building2,
  Users,
  MessageSquare,
  Send
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import SimpleFooter from '../components/Layout/SimpleFooter';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    subject: '',
    message: '',
    agreeToTerms: false
  });

  const countryCodeOptions = [
    { value: '+216', label: '+216 (Tunisia)' },
    { value: '+33', label: '+33 (France)' },
    { value: '+1', label: '+1 (USA/Canada)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+49', label: '+49 (Germany)' },
    { value: '+39', label: '+39 (Italy)' },
    { value: '+34', label: '+34 (Spain)' },
    { value: '+41', label: '+41 (Switzerland)' },
    { value: '+971', label: '+971 (UAE)' },
    { value: '+966', label: '+966 (Saudi Arabia)' }
  ];

  const subjectOptions = [
    { value: 'appointment', label: 'Appointment' },
    { value: 'sponsorship', label: 'Sponsorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'internship', label: 'Internship Request' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to our Terms & Privacy Policy to continue.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      countryCode: '',
      phoneNumber: '',
      subject: '',
      message: '',
      agreeToTerms: false
    });
  };

  const officeInfo = {
    headquarters: {
      name: "STB Headquarters",
      address: "Avenue Habib Bourguiba, 1000 Tunis, Tunisia",
      phone: "+216 71 340 000",
      email: "contact@stb.com.tn",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM"
    },
    branches: [
      {
        name: "STB Downtown Branch",
        address: "Avenue de la Liberté, 1002 Tunis, Tunisia",
        lat: 36.8008,
        lng: 10.1817
      },
      {
        name: "STB Business Center",
        address: "Les Berges du Lac, 1053 Tunis, Tunisia", 
        lat: 36.8419,
        lng: 10.2281
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stb-purple to-[#3B5BA7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in Touch with STB
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              We're here to help you with all your banking needs. Reach out to us for appointments, 
              partnerships, or any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple/10 rounded-full mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-stb-purple" />
                </div>
                <CardTitle className="text-2xl mb-2">Contact Form</CardTitle>
                <p className="text-gray-600 text-sm">All fields marked with * are required</p>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="h-12 focus:ring-stb-purple focus:border-stb-purple"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12 focus:ring-stb-purple focus:border-stb-purple"
                      />
                    </div>
                  </div>

                  {/* Phone Number with Country Code */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="countryCode" className="text-sm font-medium">
                        Country Code *
                      </Label>
                      <Select 
                        value={formData.countryCode} 
                        onValueChange={(value) => handleInputChange('countryCode', value)}
                        required
                      >
                        <SelectTrigger className="h-12 bg-white focus:ring-stb-purple focus:border-stb-purple">
                          <SelectValue placeholder="Select code" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60 z-50">
                          {countryCodeOptions.map((option) => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                              className="hover:bg-stb-purple/10 focus:bg-stb-purple/10 bg-white"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phoneNumber" className="text-sm font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        required
                        className="h-12 focus:ring-stb-purple focus:border-stb-purple"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleInputChange('subject', value)}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white focus:ring-stb-purple focus:border-stb-purple">
                        <SelectValue placeholder="Select the subject of your inquiry" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                        {subjectOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="hover:bg-stb-purple/10 focus:bg-stb-purple/10 bg-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={6}
                      className="resize-none focus:ring-stb-purple focus:border-stb-purple"
                    />
                  </div>

                  {/* Terms & Privacy Policy */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      required
                      className="mt-1 data-[state=checked]:bg-stb-purple data-[state=checked]:border-stb-purple"
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <a href="/terms" className="text-stb-purple hover:underline font-medium">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-stb-purple hover:underline font-medium">
                        Privacy Policy
                      </a>
                      *
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-stb-purple hover:bg-stb-purple/90 text-white font-semibold text-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send My Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Headquarters Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Headquarters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find us at our main office or contact us directly for any assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Office Information */}
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-stb-purple/10 rounded-full mr-4">
                      <Building2 className="h-6 w-6 text-stb-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{officeInfo.headquarters.name}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-stb-purple mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">{officeInfo.headquarters.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-stb-purple mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{officeInfo.headquarters.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-stb-purple mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{officeInfo.headquarters.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-stb-purple mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Business Hours</p>
                        <p className="text-gray-600">{officeInfo.headquarters.hours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Building Image */}
              <div className="relative h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/img/cbd83a76-cadd-4dd1-b431-0b51789651f1.png"
                  alt="STB Headquarters Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Agencies Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Our Locations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Locate our branches near you for in-person banking services.
              </p>
            </div>

            {/* Map Image Link */}
            <Card className="overflow-hidden shadow-xl">
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Agencies</h3>
                <a href="https://www.stb.com.tn/fr/reseau-stb/nos-agences/" target="_blank" rel="noopener noreferrer" className="block">
                  <img 
                    src="/img/1194a7f0-7502-4eb5-b432-777167f36107.png"
                    alt="STB Agencies Map" 
                    className="w-full max-w-4xl rounded-lg hover:opacity-80 transition-opacity mx-auto"
                  />
                </a>
                <p className="text-gray-600 mt-4">Click the map to view all our agency locations</p>
              </div>

              {/* Branch List */}
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {officeInfo.branches.map((branch, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-stb-purple mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{branch.name}</h4>
                        <p className="text-sm text-gray-600">{branch.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stb-purple text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Open your STB account today and experience the future of banking in Tunisia.
            </p>
            <div className="flex justify-center">
              <a href="/signup">
                <Button size="lg" className="bg-white text-stb-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                  Start Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Contact;
