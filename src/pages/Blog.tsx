import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import Header from '@/components/Layout/Header';
import SimpleFooter from '../components/Layout/SimpleFooter';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "STB 82.5 MD in net profit in 2024 despite a 5.2% decrease in GNP",
      excerpt: "The Tunisian Banking Company (STB), a state-owned institution, closed 2024 with a net profit of 82.5 million dinars, despite a decline in profitability and auditor concerns over loan guarantee management.",
      author: "STB Team",
      date: "June 5, 2025",
      readTime: "5 min",
      category: "Financial Results",
      image: "/img/a1.png"
    },
    {
      id: 2,
      title: "STB Bank improves its profit by more than 60% in 2024 to 82 million dinars",
      excerpt: "STB BANK has just announced significant growth in its financial performance for 2024, with the Board of Directors approving statements showing remarkable profit growth.",
      author: "Financial Team",
      date: "June 3, 2025",
      readTime: "4 min",
      category: "Corporate News",
      image: "/img/a2.png"
    },
    {
      id: 3,
      title: "STB issues a call for applications to appoint two Independent Directors",
      excerpt: "STB Bank proposes to appoint, through a call for applications, two Independent Directors to sit on its Board of Directors, reflecting the bank's commitment to good governance.",
      author: "Corporate Affairs",
      date: "June 1, 2025",
      readTime: "3 min",
      category: "Governance",
      image: "/img/a3.png"
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
              Latest News & Updates
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Stay informed with the latest news, financial updates, and corporate announcements from STB Bank.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Featured Article
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed with our most important corporate announcement.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-stb-purple/20 shadow-xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto">
                    <img 
                      src={blogPosts[1].image} 
                      alt={blogPosts[1].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="bg-stb-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                        {blogPosts[1].category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-4 leading-tight">{blogPosts[1].title}</h3>
                    <p className="text-gray-700 mb-6">{blogPosts[1].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span className="mr-4">{blogPosts[1].date}</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{blogPosts[1].readTime}</span>
                    </div>
                    <Link to={`/blog/${blogPosts[1].id}`}>
                      <Button className="bg-stb-purple hover:bg-stb-purple/90 text-white px-6 py-3 font-semibold">
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              All Articles
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our latest corporate news, financial results, and important announcements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="text-center border-2 hover:border-stb-purple transition-colors shadow-lg">
                <CardContent className="p-8">
                  <div className="aspect-video w-full mx-auto mb-6 rounded-2xl overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='14'%3E" + post.title + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <span className="bg-stb-purple/10 text-stb-purple px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-700 mb-6">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button 
                      className="bg-stb-purple hover:bg-stb-purple/90 text-white px-6 py-3 font-semibold"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Blog;
