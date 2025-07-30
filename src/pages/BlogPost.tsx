import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const BlogPost: React.FC = () => {
  const { id } = useParams();

  const blogPosts = {
    '1': {
      title: 'STB 82.5 MD in net profit in 2024 despite a 5.2% decrease in GNP',
      content: `The Tunisian Banking Company (STB), a state-owned institution, closed 2024 with a net profit of 82.5 million dinars, despite a decline in profitability and auditor concerns over loan guarantee management.

Auditors flagged the lack of a reliable guarantee database and noted that real guarantees (~2.38 billion dinars) are missing from off-balance-sheet commitments, while total loan guarantees were estimated at 3.016 billion dinars.

Financially, STB saw a 5.2% drop in net banking income to 649.7 million dinars, due to a decline in banking operating income. Net loans fell by 7.1%, and borrowings dropped by 11.9%, but customer deposits increased by 12%, totaling 11.4 billion dinars.

A tax audit covering 2019–2020 led to an initial adjustment of 61.9 million dinars, later settled for 23.4 million following a tax amnesty. The board will propose no dividend distribution for 2024 at the April 2025 general meeting.

Founded in 1957, STB is 83.3% state-owned and has a capital of 776.9 million dinars.`,
      image: '/img/a1.png',
      date: 'June 5, 2025',
      author: 'STB Team',
      category: 'Financial Results'
    },
    '2': {
      title: 'STB Bank improves its profit by more than 60% in 2024 to 82 million dinars',
      content: `STB BANK has just announced that its Board of Directors, during its meeting on April 7, April 2025, approved the financial statements for the fiscal year 2024, which were submitted to the Statutory auditors and reviewed the company's activity report for the fiscal year 2024.

These statements show a profit of 82.5 million dinars, compared to 50.6 million dinars in 2023, representing a growth of around 63%.

The board of directors has decided to convene an Ordinary General Meeting which will be held on April 30, 2025, and to propose the non-distribution of dividends.`,
      image: '/img/a2.png',
      date: 'June 3, 2025',
      author: 'Financial Team',
      category: 'Corporate News'
    },
    '3': {
      title: 'STB issues a call for applications to appoint two Independent Directors',
      content: `STB Bank proposes to appoint, through a call for applications, two Independent Directors to sit on its Board of Directors.

Candidates for the position of Independent Administrator on the Board of Directors of the STB can obtain the terms of reference from the Permanent Secretariat of the Procurement Commission on the 7th floor of the STB headquarters (Office No. B 712) or download from the STB BANK websites (www.stb.com.tn).

The application file must be sent to the STB headquarters by mail under registered mail with acknowledgment of receipt or by express mail or by hand against receipt. The deadline for the submission of application files is set for February 21, 2025 (the stamp of the Central Order Office of the STB being authoritative).`,
      image: '/img/a3.png',
      date: 'June 1, 2025',
      author: 'Corporate Affairs',
      category: 'Governance'
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button className="bg-stb-purple hover:bg-stb-purple/90 text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-stb-purple hover:text-stb-purple/80 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="mb-8">
              <span className="bg-stb-purple/10 text-stb-purple px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-8">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="mr-4">{post.date}</span>
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </div>

            <div className="aspect-video overflow-hidden rounded-2xl mb-12 shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/blog">
                <Button className="bg-stb-purple hover:bg-stb-purple/90 text-white px-8 py-3 font-semibold">
                  View More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
