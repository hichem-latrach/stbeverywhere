import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight,
  Check,
  Star,
  Smartphone,
  Send,
  Building2,
  Landmark
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import SimpleFooter from '../components/Layout/SimpleFooter';

const Products: React.FC = () => {
  const products = [
    {
      id: 'digicarte',
      title: 'DigiCarte',
      subtitle: 'Manage your bank cards remotely',
      description: 'DigiCarte is a free application, developed by STB, that allows you to manage your various bank cards remotely.',
      icon: CreditCard,
      category: 'Digital Banking',
      featured: true,
      features: [
        'Get information about all your STB cards',
        'Track your electronic payment transactions (EFTPOS, ATMs)',
        'Check your remaining limit after each withdrawal transaction',
        'Temporarily increase your limits',
        'Block or unblock your card remotely',
        'View and delegate your prepaid cards',
        'Top up prepaid cards from your checking account',
        'Manage your expenses',
        'Get a travel certificate without going to the branch',
        'Geolocate STB ATMs'
      ],
      benefits: [
        'Complete card management remotely',
        'Enhanced security and control',
        'National and international services',
        'Available for individuals and businesses'
      ],
      eligibility: 'DigiCarte is available to both individuals and businesses.',
      image: '/img/digicarte.png',
      downloadUrl: 'https://play.google.com/store/apps/details?id=app.stb.digicarte&hl=en&pli=1'
    },
    {
      id: 'digiepargne',
      title: 'DigiEpargne',
      subtitle: 'Monitor your savings account anytime',
      description: 'DigiEpargne is a simple, free-to-download application that allows you to monitor your savings account at any time.',
      icon: PiggyBank,
      category: 'Savings & Investment',
      featured: true,
      features: [
        'Check your savings account balance in real time',
        'Track the latest transactions in your savings account',
        'View your savings account statement',
        'Save excess funds from your checking account',
        'Freeze and unfreeze your savings account'
      ],
      benefits: [
        'Real-time account monitoring',
        'Easy savings management',
        'Enhanced account security',
        'Available for individuals and businesses'
      ],
      eligibility: 'DigiEpargne is available to both individuals and businesses with a savings account.',
      image: '/img/digiepargne.png',
      downloadUrl: 'https://play.google.com/store/apps/details?id=app.stb.digiepargne&hl=en'
    },
    {
      id: 'stbnet',
      title: 'STBNet',
      subtitle: 'E/M-banking solution for remote account management',
      description: 'With our E/M-banking solution, you can access your accounts and perform all the transactions you want from anywhere with STBNet\'s remote banking solutions.',
      icon: Globe,
      category: 'Digital Banking',
      featured: true,
      features: [
        'Manage your accounts remotely via the Internet',
        'Access from PC, tablet, and mobile device',
        'Accessible 24/7',
        'Simple, fast, and secure',
        'Complete transaction capabilities'
      ],
      benefits: [
        '24/7 account access',
        'Multi-device compatibility',
        'Secure remote banking',
        'Complete transaction management'
      ],
      eligibility: 'STBNet is intended for any individual or legal entity holder of an account opened with STB.',
      image: '/img/stbnet.png',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.pixelstrade.stb&hl=fr'
    },
    {
      id: 'digitransfert',
      title: 'DigiTransfert',
      subtitle: 'Manage school transfer transactions remotely',
      description: 'DigiTransfert is a mobile application that can be downloaded free of charge and allows you to manage school transfer transactions remotely and securely.',
      icon: Send,
      category: 'Transfer Services',
      featured: false,
      features: [
        'View all details related to your school file',
        'Simulate the transfer cost',
        'Order the transfer remotely',
        'Receive a copy of the Swift account instantly',
        'Receive alerts on the file status',
        'Track movements made related to your school file',
        'Track the tracking of your completed file'
      ],
      benefits: [
        'Remote transfer management',
        'Real-time file tracking',
        'Instant notifications',
        'Secure transaction processing'
      ],
      eligibility: 'DigiTransfert is intended for anyone responsible for the school file of a Tunisian or foreign resident student studying abroad.',
      image: '/img/digitransfert.png',
      downloadUrl: 'https://play.google.com/store/apps/details?id=app.stb.digitransfert&hl=en'
    },
    {
      id: 'digiopa',
      title: 'DigiOPA',
      subtitle: 'Manage and track all your OPA files',
      description: 'DigiOPA is a free downloadable mobile application that allows you to manage and track all your OPA files per account.',
      icon: TrendingUp,
      category: 'Investment Services',
      featured: false,
      features: [
        'View all the details related to your takeover bid files by account',
        'Instantly receive the funds arrival notification and the negotiation email',
        'View and download files (CX5 repatriation certificate, client notification, copy of SWIFT, credit notification, account allocation, etc.)',
        'View and track all stages of the takeover bid file processing'
      ],
      benefits: [
        'Complete OPA file management',
        'Real-time notifications',
        'Document access and download',
        'Process tracking'
      ],
      eligibility: 'DigiOPA is accessible to any natural person residing in Tunisia, or any Tunisian or foreign legal entity for its establishments in Tunisia.',
      image: '/img/digiopa.png',
      downloadUrl: 'https://play.google.com/store/apps/details?id=app.stb.digiopa&hl=en'
    },
    {
      id: 'digiopd',
      title: 'DigiOPD',
      subtitle: 'Track and manage your OPD files',
      description: 'DigiOPD is a simple, free-to-download application that allows you to track and manage your OPD files.',
      icon: Building2,
      category: 'Transfer Services',
      featured: false,
      features: [
        'View all details related to your OPD files by account',
        'View and download files (transaction notices, SWIFT copies, etc.)',
        'View and track all steps of the OPD file',
        'Track the issued transfer transaction'
      ],
      benefits: [
        'Complete OPD file management',
        'Document access and download',
        'Transaction tracking',
        'Process monitoring'
      ],
      eligibility: 'DigiOPD is accessible to any individual residing in Tunisia, or any Tunisian or foreign legal entity for its establishments in Tunisia.',
      image: '/img/digiopd.png',
      downloadUrl: 'https://apps.apple.com/us/app/digiopd/id1527251583'
    },
    {
      id: 'digicredit',
      title: 'DigiCredit',
      subtitle: 'Track your loans and applications',
      description: 'DigiCrédit is a simple, free-to-download application from the Play Store or Apple Store that allows you to track your loans (old and current applications).',
      icon: Landmark,
      category: 'Credit Solutions',
      featured: false,
      features: [
        'Simulate a loan',
        'Conduct an eligibility assessment',
        'Transparently track the various decision-making stages',
        'Track outstanding loans',
        'View past and remaining installments'
      ],
      benefits: [
        'Loan simulation and assessment',
        'Transparent application tracking',
        'Complete loan management',
        'Installment monitoring'
      ],
      eligibility: 'DigiCrédit is available to anyone wishing to apply for a loan or who has an existing loan with STB.',
      image: '/img/digicredit.png',
      downloadUrl: 'https://apps.apple.com/tn/app/digicr%C3%A9dit/id1534115739'
    }
  ];

  // Set all products as featured for simplicity
  const allProducts = products.map(product => ({ ...product, featured: true }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              STB Digital Products & Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Discover our comprehensive suite of digital banking solutions designed to simplify your financial life and provide secure, convenient access to all your banking needs.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Our Digital Banking Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Access all STB services through our innovative mobile and web applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.id} className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg h-full flex flex-col">
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="aspect-square w-full max-w-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='12'%3E" + product.title + "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-black mb-3">{product.title}</h3>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    
                    <div className="mb-6 flex-grow">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-left">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-stb-purple text-lg">✓</span>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 mt-auto">
                      <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Button 
                          className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white px-6 py-3 font-semibold"
                        >
                          Download Now
                        </Button>
                      </a>
                      <p className="text-xs text-gray-600">{product.eligibility}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose STB Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Choose STB Products?</h2>
            <p className="text-xl opacity-90 mb-12">
              Experience the difference with our award-winning products and services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                <p className="text-gray-300">
                  Cutting-edge technology and features that keep you ahead of the curve.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security Guaranteed</h3>
                <p className="text-gray-300">
                  Bank-grade security measures to protect your financial information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple rounded-full mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-300">
                  Round-the-clock customer support whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stb-purple text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join millions of satisfied customers and experience the future of banking today.
            </p>
            <div className="flex justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-white text-stb-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                  Contact Us
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

export default Products;
