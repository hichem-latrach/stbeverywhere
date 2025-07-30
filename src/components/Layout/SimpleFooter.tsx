import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-12" style={{backgroundColor: 'rgb(15,6,34)', color: 'white'}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">Avenue Habib Bourguiba, Tunis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">+216 70 140 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">stb@stb.com.tn</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                  About STB
                </a>
              </li>
              <li>
                <a href="/about#history" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                  Our History
                </a>
              </li>
              <li>
                <a href="/about#mission" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                  Mission & Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/en/locate-us" className="text-sm text-gray-300 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  Find a Branch
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/en/customer-support" className="text-sm text-gray-300 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/stbbank"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/stb_labanque"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/stbbank"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/stb-bank/posts/?feedView=all"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@STBBank"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2025 STB Bank. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.stb.com.tn/en/privacy-policy" className="text-sm text-gray-300 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <a href="https://www.stb.com.tn/en/terms-conditions" className="text-sm text-gray-300 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
