'use client'

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers';
import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus, Search, MessageSquare, Video, Mic } from 'lucide-react';

interface Seminar {
  _id: string;
  title: string;
  eventType: string;
  academicCategory: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  mode: string;
  venueInstitution: string;
  organizerName: string;
  contactEmail: string;
  websiteURL?: string;
  registrationLink?: string;
  registrationFee: string;
  createdBy: {
    firstName: string;
    lastName: string;
    institution: string;
  };
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    setLoading(true);
    try {
      const params: any = {
        eventType: 'seminar',
        limit: 50,
        sortBy: 'startDate',
        sortOrder: 'asc'
      };
      
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'all') params.academicCategory = selectedCategory;
      if (selectedMode !== 'all') params.mode = selectedMode;

      const response = await apiClient.getPublicEvents(params);
      setSeminars(response.events);
    } catch (error) {
      console.error('Failed to fetch seminars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchSeminars();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return formatDate(startDate);
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'offline': return <Mic className="h-4 w-4" />;
      case 'hybrid': return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getDaysLeft = (startDate: string) => {
    const today = new Date();
    const eventDate = new Date(startDate);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Event passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffHours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} hours`;
    }
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-10 w-10 mr-4" />
            <h1 className="text-4xl font-bold">Academic Seminars</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Engage in focused discussions and presentations on specialized topics. Learn from experts, 
            share insights, and stay updated with the latest developments in your field.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Seminars
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, speaker, or subject..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Area
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Subjects</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Business">Business</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Natural Sciences">Natural Sciences</option>
                <option value="Humanities">Humanities</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Formats</option>
                <option value="online">Online</option>
                <option value="offline">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Find Seminars
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Speakers</h3>
            <p className="text-gray-600">Listen to leading academics and industry professionals share their expertise.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Discussions</h3>
            <p className="text-gray-600">Engage in Q&A sessions and network with fellow researchers and students.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Focused Topics</h3>
            <p className="text-gray-600">Deep dive into specific subjects with concentrated, informative sessions.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{loading ? '...' : seminars.length}</div>
            <div className="text-gray-600">Available Seminars</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {loading ? '...' : seminars.filter(s => s.mode === 'online').length}
            </div>
            <div className="text-gray-600">Online Sessions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {loading ? '...' : seminars.filter(s => s.mode === 'offline').length}
            </div>
            <div className="text-gray-600">In-Person</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {loading ? '...' : seminars.filter(s => s.mode === 'hybrid').length}
            </div>
            <div className="text-gray-600">Hybrid Format</div>
          </div>
        </div>

        {/* Seminars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : seminars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {seminars.map((seminar) => (
              <div key={seminar._id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Seminar
                      </span>
                      <div className="text-purple-600">{getModeIcon(seminar.mode)}</div>
                    </div>
                    <button
                      onClick={() => handleSaveForLater(seminar._id, seminar.title)}
                      className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                      title="Save for later"
                    >
                      <BookmarkPlus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{seminar.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{seminar.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{formatDate(seminar.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="font-medium text-purple-600">{getDaysLeft(seminar.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{seminar.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{seminar.organizerName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{getDuration(seminar.startDate, seminar.endDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Fee</p>
                      <p className="font-semibold text-purple-600">{seminar.registrationFee || 'Free'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleLearnMore(seminar._id, seminar.title)}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRegisterEvent(seminar._id, seminar.title, seminar.registrationLink)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      {seminar.registrationLink && <ExternalLink className="h-4 w-4 mr-2" />}
                      Join Seminar
                    </button>
                  </div>
                  
                  {seminar.websiteURL && (
                    <div className="mt-3 pt-3 border-t">
                      <a
                        href={seminar.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Seminar Details
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No seminars found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new seminars</p>
          </div>
        )}
      </div>
    </div>
  );
}
