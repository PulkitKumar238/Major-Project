'use client'

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers';
import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus, Search, Wrench, Target, Award } from 'lucide-react';

interface Workshop {
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

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const params: any = {
        eventType: 'workshop',
        limit: 50,
        sortBy: 'startDate',
        sortOrder: 'asc'
      };
      
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'all') params.academicCategory = selectedCategory;
      if (selectedMode !== 'all') params.mode = selectedMode;

      const response = await apiClient.getPublicEvents(params);
      setWorkshops(response.events);
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWorkshops();
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-4">
            <Wrench className="h-10 w-10 mr-4" />
            <h1 className="text-4xl font-bold">Academic Workshops</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Gain hands-on experience and practical skills through interactive workshops led by experts. 
            Perfect for learning new techniques, tools, and methodologies in your field.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Workshops
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by skills, tools, or topic..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Domains</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Research Methods">Research Methods</option>
                <option value="Writing">Academic Writing</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Find Workshops
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hands-on Learning</h3>
            <p className="text-gray-600">Interactive sessions with practical exercises and real-world applications.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Instructors</h3>
            <p className="text-gray-600">Learn from industry professionals and academic experts in their fields.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate</h3>
            <p className="text-gray-600">Receive certificates of completion to enhance your professional profile.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{loading ? '...' : workshops.length}</div>
            <div className="text-gray-600">Available Workshops</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {loading ? '...' : workshops.filter(w => w.mode === 'online').length}
            </div>
            <div className="text-gray-600">Online Sessions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {loading ? '...' : workshops.filter(w => w.mode === 'offline').length}
            </div>
            <div className="text-gray-600">In-Person</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {loading ? '...' : workshops.filter(w => w.mode === 'hybrid').length}
            </div>
            <div className="text-gray-600">Hybrid Format</div>
          </div>
        </div>

        {/* Workshops Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : workshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <div key={workshop._id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Workshop
                      </span>
                      <span className="text-lg">{getModeIcon(workshop.mode)}</span>
                    </div>
                    <button
                      onClick={() => handleSaveForLater(workshop._id, workshop.title)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Save for later"
                    >
                      <BookmarkPlus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{workshop.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{workshop.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{formatDateRange(workshop.startDate, workshop.endDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="font-medium text-green-600">{getDaysLeft(workshop.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{workshop.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{workshop.organizerName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600">
                      {workshop.registrationFee || 'Free'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {workshop.academicCategory}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleLearnMore(workshop._id, workshop.title)}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRegisterEvent(workshop._id, workshop.title, workshop.registrationLink)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      {workshop.registrationLink && <ExternalLink className="h-4 w-4 mr-2" />}
                      Join Workshop
                    </button>
                  </div>
                  
                  {workshop.websiteURL && (
                    <div className="mt-3 pt-3 border-t">
                      <a
                        href={workshop.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Workshop Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workshops found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new workshops</p>
          </div>
        )}
      </div>
    </div>
  );
}
