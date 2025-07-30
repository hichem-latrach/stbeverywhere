import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp,
  TrendingDown 
} from 'lucide-react';

const Home: React.FC = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

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

  const features = [
    { title: '30K+', subtitle: 'Active Users' },
    { title: '15K+', subtitle: 'Satisfied Customers' },
  ];

  const welcomeGifts = [
    { 
      title: 'Compte Chèque/Courant',
      features: ['10DT Welcome Gift', 'Visa Electron Card', 'DigiCarte Application'],
      buttonText: 'Get started',
      variant: 'outline' as const
    },
    { 
      title: 'Compte Epargne',
      features: ['10DT Welcome Gift', 'Booklet', 'DigiEpargne Application'],
      buttonText: 'Get started',
      variant: 'default' as const
    }
  ];

  const latestNews = [
    {
      id: '1',
      title: 'STB 82.5 MD in net profit in 2024 despite a 5.2% decrease in GNP',
      description: 'The Tunisian Banking Company (STB), a state-owned institution, closed 2024 with a net profit of 82.5 million dinars.',
      date: 'June 5, 2025',
      image: '/img/84348e9f-fe44-44b6-9528-c6bad2f4e2a9.png'
    },
    {
      id: '2',
      title: 'STB Bank improves its profit by more than 60% in 2024 to 82 million dinars',
      description: 'STB BANK has just announced significant growth in its financial performance for 2024.',
      date: 'June 3, 2025',
      image: '/img/ba4b7ad0-1d8d-4a67-8b2c-f5f6d5545acf.png'
    },
    {
      id: '3',
      title: 'STB issues a call for applications to appoint two Independent Directors',
      description: 'STB Bank proposes to appoint, through a call for applications, two Independent Directors.',
      date: 'June 1, 2025',
      image: '/img/cbd83a76-cadd-4dd1-b431-0b51789651f1.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Your Trusted Digital Banking Platform
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12">
              Access your accounts, manage cards, and securely transfer funds with real-time updates for a seamless banking experience.
            </p>
            {/* Two buttons: stack on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-16 w-full">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-base sm:text-lg font-medium">
                  Access My Account
                </Button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-stb-purple hover:bg-stb-purple/90 text-white px-8 py-4 text-base sm:text-lg font-medium">
                  Join STB Everywhere
                </Button>
              </Link>
            </div>
            {/* Dashboard Interface Image */}
            <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="/img/3192c780-9333-459a-8b16-069d99da19fb.png"
                alt="STB Dashboard Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Bank Cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Access All Your STB Cards and Banking Services Anytime, Anywhere
            </h2>
            <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Experience seamless banking with STB Everywhere. Manage your accounts, cards, and transactions with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="text-center border-2">
                    <CardContent className="p-6">
                      <div className="text-2xl sm:text-3xl font-bold text-stb-teal mb-2">{feature.title}</div>
                      <div className="text-gray-600 text-sm sm:text-base">{feature.subtitle}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <form className="space-y-4" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-stb-teal focus:border-transparent outline-none text-sm sm:text-base"
                />
                <Button type="submit" className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white py-3 font-semibold text-sm sm:text-base">
                  Get Started
                </Button>
              </form>
            </div>
            {/* Bank Cards Display */}
            <div className="relative aspect-video w-full h-full max-h-80">
              <img
                src="/img/11615c61-ee8f-4559-a751-3f1d59180dab.png"
                alt="STB Bank Cards - Visa Platinum and Mastercard Travel"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Gifts Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Welcome Gifts for New STB Customers
            </h2>
            <p className="text-base sm:text-xl text-gray-700">
              Upon opening an account with STB Everywhere, enjoy our exclusive gifts designed to get you started quickly!
            </p>
          </div>
          {/* Service Icons Row */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <img 
              src="/img/832e6b8d-db7f-40ff-af23-b101a147dd7f.png"
              alt="STB Banking Services Icons" 
              className="max-w-4xl w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {welcomeGifts.map((service, index) => (
              <Card key={index} className="text-center border-2 hover:border-stb-teal transition-colors shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">{service.title}</h3>
                  <div className="mb-8">
                    <p className="text-gray-700 mb-4">Included with this account:</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center space-x-2">
                          <span className="text-stb-green text-lg">✓</span>
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/signup">
                    <Button 
                      variant={service.variant}
                      className={service.variant === 'default' ? 'bg-stb-purple hover:bg-stb-purple/90 text-white px-8 py-3 font-semibold text-sm sm:text-base' : 'border-stb-teal text-stb-teal hover:bg-stb-teal hover:text-white px-8 py-3 font-semibold text-sm sm:text-base'}
                    >
                      {service.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discover the Latest from STB Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Discover the Latest from STB
            </h2>
            <p className="text-base sm:text-xl text-gray-700">
              Stay updated with our latest news, features, and banking innovations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-2">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs sm:text-sm text-stb-teal font-medium mb-2">{news.date}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-3">{news.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-4">{news.description}</p>
                  <Link to={`/blog/${news.id}`}>
                    <Button variant="outline" className="text-stb-teal border-stb-teal hover:bg-stb-teal hover:text-white font-semibold text-sm sm:text-base">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-stb-purple py-12 sm:py-16">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-base sm:text-xl text-white/80 mb-8">
              Subscribe to our newsletter for the latest banking insights and product updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none text-sm sm:text-base"
                required
              />
              <Button type="submit" className="bg-white text-stb-purple hover:bg-gray-100 px-6 py-3 font-semibold text-sm sm:text-base">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
