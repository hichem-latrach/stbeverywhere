import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Star, 
  Users, 
  Building, 
  Crown,
  ArrowRight,
  CreditCard,
  Smartphone,
  PiggyBank,
  Shield
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const Pricing: React.FC = () => {
  const plans = [
    {
      id: 'basic',
      name: 'STB Basic',
      description: 'Perfect for students and young professionals starting their financial journey',
      price: '0',
      currency: 'DT',
      period: 'month',
      popular: false,
      icon: Users,
      features: [
        { name: 'Free account opening', included: true },
        { name: 'Mobile banking app', included: true },
        { name: 'Online banking portal', included: true },
        { name: 'Debit card included', included: true },
        { name: '3 free ATM withdrawals/month', included: true },
        { name: 'Basic customer support', included: true },
        { name: 'Account alerts', included: true },
        { name: 'Checkbook (first 25 free)', included: true },
        { name: 'International transfers', included: false },
        { name: 'Investment tools', included: false },
        { name: 'Premium support', included: false },
        { name: 'Personal financial advisor', included: false }
      ],
      limitations: [
        'Minimum balance required: 50 DT',
        'Limited international features',
        'Standard support hours only'
      ],
      cta: 'Open Free Account'
    },
    {
      id: 'premium',
      name: 'STB Premium',
      description: 'Comprehensive banking for professionals and families with growing needs',
      price: '15',
      currency: 'DT',
      period: 'month',
      popular: true,
      icon: Star,
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Unlimited ATM withdrawals', included: true },
        { name: 'International transfers', included: true },
        { name: 'Premium credit card', included: true },
        { name: 'Investment tools access', included: true },
        { name: 'Priority customer support', included: true },
        { name: 'Financial planning tools', included: true },
        { name: 'Travel insurance', included: true },
        { name: 'Overdraft protection', included: true },
        { name: 'Personal financial advisor', included: false },
        { name: 'Concierge services', included: false },
        { name: 'Private banking access', included: false }
      ],
      limitations: [
        'Minimum balance required: 500 DT',
        'Monthly fee waived with 2000 DT balance'
      ],
      cta: 'Upgrade to Premium'
    },
    {
      id: 'business',
      name: 'STB Business',
      description: 'Tailored solutions for small and medium enterprises',
      price: '45',
      currency: 'DT',
      period: 'month',
      popular: false,
      icon: Building,
      features: [
        { name: 'Business account opening', included: true },
        { name: 'Multiple user access', included: true },
        { name: 'Business credit cards', included: true },
        { name: 'Merchant payment processing', included: true },
        { name: 'Payroll management', included: true },
        { name: 'Business loans access', included: true },
        { name: 'Cash flow analytics', included: true },
        { name: 'Dedicated business advisor', included: true },
        { name: 'International trade services', included: true },
        { name: 'Custom reporting', included: true },
        { name: 'API integrations', included: true },
        { name: 'Enterprise security features', included: true }
      ],
      limitations: [
        'Minimum balance required: 2000 DT',
        'Transaction limits based on business type'
      ],
      cta: 'Start Business Banking'
    },
    {
      id: 'wealth',
      name: 'STB Wealth',
      description: 'Exclusive private banking for high-net-worth individuals',
      price: 'Custom',
      currency: '',
      period: '',
      popular: false,
      icon: Crown,
      features: [
        { name: 'Everything in Premium', included: true },
        { name: 'Personal financial advisor', included: true },
        { name: 'Investment portfolio management', included: true },
        { name: 'Private banking services', included: true },
        { name: 'Concierge services', included: true },
        { name: 'Exclusive events access', included: true },
        { name: 'Family office services', included: true },
        { name: 'Estate planning', included: true },
        { name: 'Tax optimization', included: true },
        { name: 'Global banking network', included: true },
        { name: 'Precious metals trading', included: true },
        { name: '24/7 dedicated support', included: true }
      ],
      limitations: [
        'Minimum relationship balance: 100,000 DT',
        'By invitation or application only'
      ],
      cta: 'Apply for Wealth'
    }
  ];

  const additionalServices = [
    {
      name: 'International Wire Transfer',
      price: '25 DT',
      description: 'Send money worldwide with competitive exchange rates'
    },
    {
      name: 'Certified Check',
      price: '5 DT',
      description: 'Official bank-guaranteed payment document'
    },
    {
      name: 'Account Statement (Paper)',
      price: '3 DT',
      description: 'Monthly paper statements delivered to your address'
    },
    {
      name: 'Replacement Debit Card',
      price: '10 DT',
      description: 'Emergency card replacement and delivery'
    },
    {
      name: 'Stop Payment Order',
      price: '8 DT',
      description: 'Stop payment on checks or automatic payments'
    },
    {
      name: 'Foreign Currency Exchange',
      price: '0.5%',
      description: 'Competitive rates for currency exchange services'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch between plans?',
      answer: 'Yes, you can upgrade or downgrade your account type at any time. Changes take effect at the beginning of your next billing cycle.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparency. All fees are clearly outlined in your account agreement. The only additional charges are for optional services you choose to use.'
    },
    {
      question: 'What happens if I go below the minimum balance?',
      answer: 'If your account falls below the minimum balance, a monthly maintenance fee may apply. We\'ll always notify you before applying any fees.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students with valid enrollment verification can access STB Premium features at Basic account pricing.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stb-purple to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
              Choose the banking plan that fits your lifestyle. No hidden fees, 
              no surprises—just straightforward pricing for exceptional banking services.
            </p>
            <Button size="lg" variant="secondary" className="text-stb-purple">
              Compare All Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic banking to comprehensive wealth management, we have a solution for every financial need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  className={`relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'border-2 border-stb-purple shadow-lg scale-105' 
                      : 'border hover:border-stb-purple/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-stb-purple hover:bg-stb-purple/90 px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-stb-purple/10 rounded-full mx-auto mb-4">
                      <Icon className="h-8 w-8 text-stb-purple" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    
                    <div className="text-center">
                      {plan.price === 'Custom' ? (
                        <div className="text-3xl font-bold text-gray-900">Custom Pricing</div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-lg text-gray-600 ml-1">{plan.currency}</span>
                          {plan.period && (
                            <span className="text-gray-600 ml-1">/{plan.period}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular 
                          ? 'bg-stb-purple hover:bg-stb-purple/90' 
                          : ''
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>

                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-300 mr-3 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Important Notes:</h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="text-xs text-gray-500">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optional services to enhance your banking experience when you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <Badge variant="secondary" className="text-stb-purple bg-stb-purple/10">
                      {service.price}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose STB?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the benefits that set us apart from traditional banking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 text-stb-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Digital First</h3>
                <p className="text-gray-600 text-sm">
                  Advanced mobile and online banking with cutting-edge features.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-stb-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600 text-sm">
                  Advanced encryption and fraud protection for peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <CreditCard className="h-12 w-12 text-stb-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
                <p className="text-gray-600 text-sm">
                  Transparent pricing with no surprise charges or hidden costs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <PiggyBank className="h-12 w-12 text-stb-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Competitive Rates</h3>
                <p className="text-gray-600 text-sm">
                  High-yield savings and competitive loan rates to grow your wealth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our pricing and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-stb-purple">
                Open Account Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-stb-purple">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
