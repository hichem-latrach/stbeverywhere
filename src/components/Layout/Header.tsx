
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 safe-area-top">
      <div className="container-responsive flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 min-w-0">
          <img 
            src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
            alt="STB Logo" 
            className="w-10 h-10"
          />
          <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            <span className="block lg:hidden">STB</span>
            <span className="hidden lg:block">STB Everywhere</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-stb-teal transition-colors font-medium">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-stb-teal transition-colors font-medium">About</Link>
          <Link to="/products" className="text-gray-600 hover:text-stb-teal transition-colors font-medium">Products</Link>
          <Link to="/blog" className="text-gray-600 hover:text-stb-teal transition-colors font-medium">Blog</Link>
          <Link to="/contact" className="text-gray-600 hover:text-stb-teal transition-colors font-medium">Contact</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-600 hover:text-stb-teal font-medium touch-target">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-stb-purple hover:bg-stb-purple/90 text-white font-semibold touch-target">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile/Tablet) */}
        <button
          className="lg:hidden flex items-center justify-center touch-target p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-stb-teal z-50"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-7 w-7 text-gray-900" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 flex lg:hidden">
          <div className="relative bg-white w-4/5 max-w-xs h-full shadow-xl slide-in-right flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <Link to="/" className="flex items-center space-x-2 min-w-0" onClick={() => setMobileMenuOpen(false)}>
        <img 
              src="/img/4e0d3bb2-c1b3-412e-acf3-7e1903dcfa0b.png"
          alt="STB Logo" 
          className="w-8 h-8"
        />
                <span className="text-lg font-bold text-gray-900 truncate">STB</span>
              </Link>
              <button
                className="touch-target p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-stb-teal"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-7 w-7 text-gray-900" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-4 py-6">
              <Link to="/" className="py-2 text-gray-700 font-medium rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="py-2 text-gray-700 font-medium rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/products" className="py-2 text-gray-700 font-medium rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/blog" className="py-2 text-gray-700 font-medium rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="py-2 text-gray-700 font-medium rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
            <div className="flex flex-col gap-3 px-4 mt-auto pb-8">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-gray-600 hover:text-stb-teal font-medium touch-target">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-stb-purple hover:bg-stb-purple/90 text-white font-semibold touch-target">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
          {/* Backdrop click closes menu */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
