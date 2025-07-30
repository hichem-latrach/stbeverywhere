import React from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, Smartphone, Globe, Users, TrendingUp, CreditCard } from 'lucide-react';

export default function TfBankAccount() {
  const services = [
    {
      icon: <Shield className="h-12 w-12 text-stb-purple" />,
      title: "Secured Transactions",
      description: "Advanced security protocols to protect your financial transactions"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-stb-purple" />,
      title: "Mobile Banking",
      description: "Access your account anytime, anywhere with our mobile app"
    },
    {
      icon: <Globe className="h-12 w-12 text-stb-purple" />,
      title: "International Transfers",
      description: "Send and receive money globally with competitive exchange rates"
    },
    {
      icon: <Users className="h-12 w-12 text-stb-purple" />,
      title: "Customer Support",
      description: "24/7 dedicated support team to assist with your banking needs"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-stb-purple" />,
      title: "Investment Options",
      description: "Grow your wealth with our diverse investment products"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-stb-purple" />,
      title: "Multiple Card Types",
      description: "Choose from various debit and credit card options"
    }
  ];

  const benefits = [
    "No monthly maintenance fees",
    "Free online and mobile banking",
    "Competitive interest rates",
    "Access to nationwide ATM network",
    "Personalized financial advice",
    "Priority customer service"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-stb-purple to-stb-teal text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                TF Bank Account
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Experience modern banking with our comprehensive TF Bank Account. 
                Enjoy secure transactions, mobile banking, and personalized financial services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-stb-purple hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  Open Account Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-stb-purple font-semibold px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/img/tf-account-hero.png" 
                alt="TF Bank Account Hero" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Banking Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a comprehensive range of banking services designed to meet your financial needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose TF Bank Account?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our TF Bank Account offers exceptional value with features designed for modern banking needs.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 bg-stb-purple rounded-full flex items-center justify-center mr-4">
                      <ArrowRight className="h-4 w-4 text-white rotate-90" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="bg-stb-purple hover:bg-stb-purple/90 text-white font-semibold px-8 py-3"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src="/img/banking-benefits.png" 
                alt="Banking Benefits" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stb-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Banking Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who trust STB for their banking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-stb-teal hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Open Account Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-stb-teal font-semibold px-8 py-3"
            >
              Visit Branch
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
