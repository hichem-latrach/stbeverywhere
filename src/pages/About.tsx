import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Globe, Users, Building2, Clock, TrendingUp } from 'lucide-react';
import Header from '@/components/Layout/Header';
import SimpleFooter from '../components/Layout/SimpleFooter';

const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security',
      description: 'Your data is protected by highly reliable protocols and bank-grade security measures.'
    },
    {
      icon: Zap,
      title: 'Simplicity',
      description: 'A clear, intuitive, and accessible interface designed for everyone.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Services available 24/7, both in Tunisia and abroad, wherever you are.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'A constantly evolving platform with cutting-edge banking technology.'
    }
  ];

  const keyFigures = [
    {
      icon: Users,
      number: '120,000+',
      description: 'Active users of STB Everywhere'
    },
    {
      icon: Building2,
      number: '160+',
      description: 'STB branches across Tunisia'
    },
    {
      icon: Clock,
      number: '24/7',
      description: 'Access to your accounts and services'
    },
    {
      icon: TrendingUp,
      number: '93%',
      description: 'Customer satisfaction rate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              About STB Everywhere
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Discover who we are, our mission, and our commitment to providing exceptional digital banking services to all Tunisians.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-stb-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-stb-purple" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To offer all Tunisians, wherever they are, a simple, smart, and secure banking experience through a reliable digital platform that puts customers first.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-stb-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-stb-purple" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-6">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become a leading player in inclusive digital banking, combining technological innovation with human proximity and exceptional customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide everything we do at STB Everywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-stb-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-stb-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Key Figures
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Numbers that demonstrate our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFigures.map((figure, index) => {
              const Icon = figure.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-stb-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-stb-purple" />
                    </div>
                    <h3 className="text-3xl font-bold text-stb-purple mb-2">{figure.number}</h3>
                    <p className="text-gray-700">{figure.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stb-purple text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join STB Everywhere?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join the digital banking revolution today. Simple. Fast. Secure.
            </p>
            <div className="flex justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-stb-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <SimpleFooter />
    </div>
  );
};

export default About;
