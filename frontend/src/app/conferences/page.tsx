'use client'

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers';
import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus, Search, Filter } from 'lucide-react';

interface Conference {
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

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    setLoading(true);
    try {
      const params: any = {
        eventType: 'conference',
        limit: 50,
        sortBy: 'startDate',
        sortOrder: 'asc'
      };
      
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'all') params.academicCategory = selectedCategory;
      if (selectedMode !== 'all') params.mode = selectedMode;

      const response = await apiClient.getPublicEvents(params);
      setConferences(response.events);
    } catch (error) {
      console.error('Failed to fetch conferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchConferences();
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
      case 'online': return '💻';
      case 'offline': return '🏢';
      case 'hybrid': return '🔄';
      default: return '📍';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">Academic Conferences</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Connect with leading researchers and industry experts at prestigious academic conferences worldwide. 
            Share your research, learn from peers, and advance your academic career.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Conferences
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, topic, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Field
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Fields</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Business">Business</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Conferences
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{loading ? '...' : conferences.length}</div>
            <div className="text-gray-600">Available Conferences</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {loading ? '...' : conferences.filter(c => c.mode === 'online').length}
            </div>
            <div className="text-gray-600">Online Events</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {loading ? '...' : conferences.filter(c => c.mode === 'offline').length}
            </div>
            <div className="text-gray-600">In-Person Events</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {loading ? '...' : conferences.filter(c => c.mode === 'hybrid').length}
            </div>
            <div className="text-gray-600">Hybrid Events</div>
          </div>
        </div>

        {/* Conferences Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : conferences.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {conferences.map((conference) => (
              <div key={conference._id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Conference
                      </span>
                      <span className="text-lg">{getModeIcon(conference.mode)}</span>
                    </div>
                    <button
                      onClick={() => handleSaveForLater(conference._id, conference.title)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Save for later"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{conference.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{formatDateRange(conference.startDate, conference.endDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="font-medium text-green-600">{getDaysLeft(conference.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 md:col-span-2">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{conference.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{conference.organizerName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Fee: {conference.registrationFee || 'Free'}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{conference.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleLearnMore(conference._id, conference.title)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleRegisterEvent(conference._id, conference.title, conference.registrationLink)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                    >
                      {conference.registrationLink && <ExternalLink className="h-4 w-4 mr-2" />}
                      Register Now
                    </button>
                  </div>
                  
                  {conference.websiteURL && (
                    <div className="mt-3 pt-3 border-t">
                      <a
                        href={conference.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conferences found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new conferences</p>
          </div>
        )}
      </div>
    </div>
  );
}
