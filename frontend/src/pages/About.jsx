import React from 'react';
import { Target, Eye, Award, Heart } from 'lucide-react';
import { mockData } from '../mock';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Nexloume Tech</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A trusted technology partner empowering businesses through innovation, expertise, and commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{mockData.about.mission}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{mockData.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Experience & Expertise</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{mockData.about.experience}</p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl font-bold text-teal-600 mb-2">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl font-bold text-teal-600 mb-2">100+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl font-bold text-teal-600 mb-2">15+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtfGVufDB8fHx8MTc2NzEwNzg2NXww&ixlib=rb-4.1.0&q=85"
                alt="Professional Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB0ZWFtfGVufDB8fHx8MTc2NzEwNzg2NXww&ixlib=rb-4.1.0&q=85"
                alt="Team Collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{mockData.about.culture}</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Innovation First</h3>
                    <p className="text-gray-600">We embrace new technologies and methodologies to stay ahead of the curve.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Continuous Learning</h3>
                    <p className="text-gray-600">Regular training, workshops, and certifications to keep our team at the forefront.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="text-teal-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Collaborative Environment</h3>
                    <p className="text-gray-600">We foster teamwork and open communication across all levels.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;