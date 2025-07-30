import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stb-teal text-white py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Contact Us */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Would you like to get in touch with us? Our customer service representatives are always at your disposal. You can contact us directly by email, phone, or mail.
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Address:</strong> Rue Hedi Nouira, 1001 Tunis</p>
                <p><strong>Phone:</strong> +216 70 140 000</p>
                <p><strong>Fax:</strong> +216 70 140 333</p>
                <p><strong>Email:</strong> stb@stb.com.tn</p>
                <p><strong>Website:</strong> www.stb.com.tn</p>
              </div>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Map</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.stb.com.tn/fr/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/entreprises/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Company
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/cartes-bancaires-comptes/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Accounts & Cards
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/faq/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/contact/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.stb.com.tn/fr/documents-en-ligne/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Online Documents
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/bourse-et-change/cours-de-change/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Stock Market & Exchange Rates
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/category/presse/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/mentions-reglementaires/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Legal Notices
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.stb.com.tn/fr/la-banque-en-bref/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  About STB
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/reseau-stb/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  STB Network
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/en/branches-stb/our-atm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  ATM Network
                </a>
              </li>
              <li>
                <a href="https://www.stb.com.tn/fr/reseau-stb/espace-libre-service/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Self-Service Area
                </a>
              </li>
            </ul>
          </div>

          {/* Our Agencies Map */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-center">Our Agencies</h3>
            <a href="https://www.stb.com.tn/fr/reseau-stb/nos-agences/" target="_blank" rel="noopener noreferrer" className="block">
              <img 
                src="/img/1194a7f0-7502-4eb5-b432-777167f36107.png"
                alt="STB Agencies Map" 
                className="w-full max-w-2xl rounded-lg hover:opacity-80 transition-opacity mx-auto"
              />
            </a>
          </div>

          {/* Contact and Social Media */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.stb.com.tn/fr/contact/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://www.stb.com.tn/fr/reseau-stb/nos-agences/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    Our Agencies
                  </a>
                </li>
                <li>
                  <a href="https://www.stb.com.tn/fr/actualites/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://www.facebook.com/stbbank" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/stbbank" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://x.com/stb_labanque" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/stb-bank" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stb-teal/30 pt-8 text-center">
          <p className="text-white/60">© 2025 STB Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
