'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '../../lib/api';
import { handleRegisterEvent, handleLearnMore } from '../../utils/eventHandlers';
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter, Search } from 'lucide-react';

interface Event {
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState('startDate');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get initial filters from URL params
    const search = searchParams.get('search') || '';
    const eventType = searchParams.get('eventType') || 'all';
    const location = searchParams.get('location') || '';
    const mode = searchParams.get('mode') || 'all';
    
    setSearchQuery(search);
    setSelectedType(eventType);
    setSelectedLocation(location);
    setSelectedMode(mode);
  }, [searchParams]);

  useEffect(() => {
    fetchEvents();
  }, [currentPage, selectedType, selectedLocation, selectedMode, sortBy]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: 12,
        sortBy,
        sortOrder: 'asc'
      };
      
      if (searchQuery) params.search = searchQuery;
      if (selectedType !== 'all') params.eventType = selectedType;
      if (selectedLocation) params.location = selectedLocation;
      if (selectedMode !== 'all') params.mode = selectedMode;

      const response = await apiClient.getPublicEvents(params);
      setEvents(response.events);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchEvents();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'conference': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'symposium': return 'bg-orange-100 text-orange-800';
      case 'webinar': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return '💻';
      case 'offline': return '🏢';
      case 'hybrid': return '🔄';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Events</h1>
          <p className="text-gray-600">Discover and participate in academic conferences, workshops, seminars, and more</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Events
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or organizer..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="symposium">Symposium</option>
                <option value="webinar">Webinar</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Filter by city, country, or institution..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        {/* Results Summary */}
        {pagination && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {((pagination.currentPage - 1) * 12) + 1} to {Math.min(pagination.currentPage * 12, pagination.totalEvents)} of {pagination.totalEvents} events
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="startDate">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="createdAt">Sort by Recently Added</option>
            </select>
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                    </span>
                    <span className="text-lg">{getModeIcon(event.mode)}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{event.organizerName}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleLearnMore(event._id, event.title)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleRegisterEvent(event._id, event.title, event.registrationLink)}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      {event.registrationLink && <ExternalLink className="h-4 w-4 mr-2" />}
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(pagination.totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrentPage = page === currentPage;
              const shouldShow = page === 1 || page === pagination.totalPages || Math.abs(page - currentPage) <= 2;
              
              if (!shouldShow) {
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                    isCurrentPage
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
