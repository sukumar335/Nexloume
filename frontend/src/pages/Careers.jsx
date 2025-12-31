import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Briefcase, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: '',
    coverLetter: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/jobs`);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job listings');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, position: job.title });
    window.scrollTo({ top: document.getElementById('application-form').offsetTop - 100, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/careers/apply`, formData);
      toast.success(response.data.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        resume: '',
        coverLetter: ''
      });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of an innovative team that's shaping the future of technology. Explore exciting opportunities and grow your career with Nexloume Tech.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600">Benefits and perks that make Nexloume Tech a great place to work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Growth Opportunities', desc: 'Continuous learning, training programs, and career advancement paths' },
              { title: 'Flexible Work', desc: 'Remote-friendly culture with flexible hours and work-life balance' },
              { title: 'Innovative Projects', desc: 'Work on cutting-edge technologies and impactful projects' },
              { title: 'Competitive Salary', desc: 'Market-leading compensation and comprehensive benefits package' },
              { title: 'Collaborative Culture', desc: 'Supportive team environment that values diversity and inclusion' },
              { title: 'Modern Tech Stack', desc: 'Latest tools, technologies, and infrastructure to work with' }
            ].map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600">Find your perfect role and apply today</p>
          </div>
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading job listings...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No job openings available at the moment. Check back soon!</p>
              </div>
            ) : (
              jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-teal-500 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin size={18} className="text-teal-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock size={18} className="text-teal-600" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Briefcase size={18} className="text-teal-600" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-8">
                    <button
                      onClick={() => handleApply(job)}
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Submit Your Application</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL *</label>
                <input
                  type="url"
                  name="resume"
                  required
                  value={formData.resume}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="https://linkedin.com/in/johndoe or Google Drive link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
                <textarea
                  name="coverLetter"
                  required
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit for this role..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
                {!submitting && <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;