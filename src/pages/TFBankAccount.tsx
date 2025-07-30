import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Globe, 
  CreditCard, 
  DollarSign, 
  Shield, 
  Zap, 
  ArrowRight,
  Check,
  Star,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const TFBankAccount: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'International Banking',
      description: 'Access your account from anywhere in the world with full international banking capabilities.'
    },
    {
      icon: CreditCard,
      title: 'Premium Cards',
      description: 'Exclusive TF Bank credit and debit cards with enhanced benefits and rewards.'
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency Support',
      description: 'Hold and manage multiple currencies with competitive exchange rates.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Advanced security measures including biometric authentication and fraud monitoring.'
    },
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Lightning-fast transfers between TF Bank accounts and international payments.'
    },
    {
      icon: Building,
      title: 'Business Solutions',
      description: 'Specialized business banking services for companies with international operations.'
    }
  ];

  const benefits = [
    'Priority customer support with dedicated TF Bank specialists',
    'Waived fees on international transfers and currency exchanges',
    'Exclusive access to TF Bank investment products',
    'Concierge services for travel and lifestyle needs',
    'Premium mobile app with advanced features',
    'Access to TF Bank lounges and exclusive events'
  ];

  const accountTypes = [
    {
      name: 'TF Personal',
      description: 'Individual accounts for personal banking needs',
      minBalance: '1,000 USD',
      monthlyFee: '25 USD',
      features: [
        'Multi-currency accounts',
        'International transfers',
        'Premium debit card',
        'Mobile banking app',
        'Basic investment tools'
      ]
    },
    {
      name: 'TF Premium',
      description: 'Enhanced services for high-net-worth individuals',
      minBalance: '25,000 USD',
      monthlyFee: '50 USD',
      features: [
        'Everything in TF Personal',
        'Personal relationship manager',
        'Investment advisory services',
        'Concierge services',
        'Premium credit cards'
      ]
    },
    {
      name: 'TF Business',
      description: 'Comprehensive solutions for international businesses',
      minBalance: '10,000 USD',
      monthlyFee: '75 USD',
      features: [
        'Business checking accounts',
        'Trade finance services',
        'Multi-user access',
        'Corporate cards',
        'Cash management solutions'
      ]
    }
  ];

  const locations = [
    {
      country: 'Tunisia',
      city: 'Tunis',
      address: 'Avenue Habib Bourguiba, Tunis 1000',
      phone: '+216 71 123 456',
      email: 'tunis@tfbank.com'
    },
    {
      country: 'France',
      city: 'Paris',
      address: '123 Rue de Rivoli, 75001 Paris',
      phone: '+33 1 42 123 456',
      email: 'paris@tfbank.com'
    },
    {
      country: 'United Kingdom',
      city: 'London',
      address: '456 King\'s Road, London SW3 4LY',
      phone: '+44 20 7123 4567',
      email: 'london@tfbank.com'
    },
    {
      country: 'Germany',
      city: 'Frankfurt',
      address: 'Zeil 123, 60313 Frankfurt am Main',
      phone: '+49 69 123 456',
      email: 'frankfurt@tfbank.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stb-purple via-purple-700 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Exclusive Banking Services
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  TF Bank Account
                </h1>
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
                  Experience premium international banking with TF Bank - your gateway to 
                  sophisticated financial services across Tunisia, Europe, and beyond.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" className="text-stb-purple">
                    Open TF Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-stb-purple">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-24 w-24 text-white mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
                      <p className="text-white/80">Banking without borders</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-12 w-12 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TF Bank?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the premium features and services that make TF Bank the preferred choice 
              for international banking and sophisticated financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-stb-purple/20">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple/10 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-stb-purple" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Account Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the TF Bank account that best suits your personal or business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {accountTypes.map((account, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{account.name}</CardTitle>
                  <p className="text-gray-600 mb-4">{account.description}</p>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stb-purple mb-2">{account.monthlyFee}</div>
                    <div className="text-sm text-gray-500">Monthly fee</div>
                    <div className="text-sm text-gray-500 mt-1">Min. balance: {account.minBalance}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-6 bg-stb-purple hover:bg-stb-purple/90">
                    Open Account
                  </Button>
                  <ul className="space-y-3">
                    {account.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Exclusive Benefits</h2>
                <p className="text-xl text-gray-600 mb-8">
                  TF Bank account holders enjoy premium benefits and services designed to enhance 
                  your banking experience and support your international lifestyle.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-8 bg-stb-purple hover:bg-stb-purple/90">
                  Learn More About Benefits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-stb-purple/10 to-blue-100 rounded-3xl p-8">
                  <div className="h-full bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-20 bg-gradient-to-r from-stb-purple to-blue-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
                        <CreditCard className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Premium TF Card</h3>
                      <p className="text-gray-600">Exclusive design with global acceptance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Presence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our TF Bank locations worldwide for personalized service and expert financial advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {locations.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-stb-purple mr-2" />
                    <CardTitle className="text-lg">{location.city}</CardTitle>
                  </div>
                  <Badge variant="secondary">{location.country}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{location.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{location.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Opening your TF Bank account is simple and straightforward. Follow these steps to get started.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Your Account</h3>
                <p className="text-gray-600">
                  Select the TF Bank account type that best fits your personal or business needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Submit Application</h3>
                <p className="text-gray-600">
                  Complete our secure online application or visit any TF Bank location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Start Banking</h3>
                <p className="text-gray-600">
                  Once approved, receive your premium TF Bank cards and start enjoying exclusive benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-stb-purple to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience TF Bank?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied customers who trust TF Bank for their international banking needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-stb-purple">
                Open TF Account Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-stb-purple">
                Contact TF Specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TFBankAccount;
