import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { HelpCircle, Phone, ChevronDown, ChevronRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  isTyping?: boolean;
}

const Support: React.FC = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: ''
  });
  const [showFAQ, setShowFAQ] = useState(false);
  const [openFAQItem, setOpenFAQItem] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const faqData = [
    {
      question: "What is STB Everywhere?",
      answer: "STB Everywhere is a secure digital banking platform that lets you manage your STB accounts, cards, and transactions from anywhere, anytime."
    },
    {
      question: "How do I open an account?",
      answer: "Click on 'Join STB Everywhere' and follow the simple signup process. You'll need a valid ID and a few personal details."
    },
    {
      question: "Is the platform secure?",
      answer: "Yes, STB Everywhere uses advanced encryption and security protocols to keep your data and transactions safe."
    },
    {
      question: "Can I access all my STB cards in one place?",
      answer: "Absolutely! You can view and manage all your STB cards, including Carte Epargne and Carte Visa, from your dashboard."
    },
    {
      question: "What do I get as a new user?",
      answer: "New customers receive welcome gifts like cash bonuses, digital app access, and more—depending on the account type."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team via the in-app chat or email us directly at support@stbeverywhere.com."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Not at the moment. STB Everywhere is currently accessible via web browser, but a mobile app is in development and coming soon."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ subject: '', message: '', priority: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast({
        title: "Subscription Successful!",
        description: "You've been subscribed to our newsletter.",
      });
      setNewsletterEmail('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600">Get help and support for your STB account.</p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowFAQ(!showFAQ)}>
            <CardHeader className="text-center">
              <HelpCircle className="h-12 w-12 text-stb-teal mx-auto mb-2" />
              <CardTitle className="text-lg">FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">Find answers to common questions</p>
              <Button variant="outline" className="w-full">Browse FAQs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-stb-purple mx-auto mb-2" />
              <CardTitle className="text-lg">Call Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center mb-4">Speak with our support team</p>
              <p className="text-center font-bold text-stb-teal">+216 70 140 000</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        {showFAQ && (
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button
                      onClick={() => setOpenFAQItem(openFAQItem === index ? null : index)}
                      className="flex justify-between items-center w-full text-left py-2"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFAQItem === index ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </button>
                    {openFAQItem === index && (
                      <div className="mt-2 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your issue"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </Label>
                  <Select value={contactForm.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </Label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your issue in detail"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-stb-teal focus:border-transparent outline-none"
                  rows={6}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-stb-purple hover:bg-stb-purple/90 text-white">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default Support;
