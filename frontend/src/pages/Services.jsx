import React from 'react';
import { Code, Smartphone, Cloud, Palette, Wrench, Database } from 'lucide-react';
import { mockData } from '../mock';

const Services = () => {
  const serviceIcons = [Code, Smartphone, Wrench, Database, Cloud, Palette];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT solutions designed to drive your business forward with cutting-edge technology and expert implementation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-teal-500 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-teal-600 mb-2">Key Benefits:</p>
                    <p className="text-sm text-gray-600">{service.benefits}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600">A proven methodology that ensures success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your business needs and goals' },
              { step: '02', title: 'Planning', desc: 'Creating detailed roadmap and architecture' },
              { step: '03', title: 'Development', desc: 'Building with best practices and quality code' },
              { step: '04', title: 'Delivery', desc: 'Launch, support, and continuous improvement' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="text-5xl font-bold text-teal-500/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-teal-200" style={{ width: 'calc(100% - 2rem)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our services can help transform your business.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;