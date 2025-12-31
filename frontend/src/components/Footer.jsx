import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-white">{mockData.company.name}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{mockData.company.tagline}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-teal-500" />
                <span className="text-sm">{mockData.company.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-teal-500" />
                <span className="text-sm">{mockData.company.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-teal-500" />
                <span className="text-sm">{mockData.company.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-teal-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-sm hover:text-teal-500 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-sm hover:text-teal-500 transition-colors">Projects</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-teal-500 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-teal-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href={mockData.company.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2025 {mockData.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;