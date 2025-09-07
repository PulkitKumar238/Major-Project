'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../lib/api';
import Link from 'next/link';
import { 
  Calendar, 
  BookMarked, 
  UserCheck, 
  Plus, 
  TrendingUp, 
  Clock,
  MapPin,
  Users,
  GraduationCap,
  Building2
} from 'lucide-react';

interface UserEvent {
  _id: string;
  title: string;
  eventType: string;
  startDate: string;
  location: string;
  status: string;
}

interface DashboardStats {
  registeredEvents: number;
  savedEvents: number;
  submittedEvents: number;
  upcomingEvents: number;
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    registeredEvents: 0,
    savedEvents: 0,
    submittedEvents: 0,
    upcomingEvents: 0
  });
  const [recentEvents, setRecentEvents] = useState<UserEvent[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated) return;

      try {
        setLoadingData(true);
        
        // Fetch user profile with saved/registered events
        const profileResponse = await apiClient.getUserProfile();
        
        // Fetch user's submitted events
        const submittedResponse = await apiClient.getUserEvents({ limit: 5 });
        
        // Fetch recent registered events
        const registeredResponse = await apiClient.getRegisteredEvents({ limit: 5 });

        setStats({
          registeredEvents: profileResponse.user.registeredEvents?.length || 0,
          savedEvents: profileResponse.user.savedEvents?.length || 0,
          submittedEvents: submittedResponse.pagination?.totalEvents || 0,
          upcomingEvents: registeredResponse.pagination?.totalEvents || 0
        });

        setRecentEvents(registeredResponse.registeredEvents || []);

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'conference': return '🎯';
      case 'workshop': return '🛠️';
      case 'seminar': return '📚';
      case 'symposium': return '🎪';
      case 'webinar': return '💻';
      default: return '📅';
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your academic events and discover new opportunities
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-1" />
                {user?.institution}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 mr-1" />
                {user?.userType === 'teacher' ? 'Faculty' : 'Student'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/events" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Browse Events</p>
                  <p className="text-sm text-gray-500">Discover new events</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/saved" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <BookMarked className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Saved Events</p>
                  <p className="text-sm text-gray-500">View saved events</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/registered" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">My Registrations</p>
                  <p className="text-sm text-gray-500">Registered events</p>
                </div>
              </div>
            </Link>

            <Link href="/submit" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Plus className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Submit Event</p>
                  <p className="text-sm text-gray-500">Add new event</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.registeredEvents}</p>
                <p className="text-sm text-gray-600">Registered Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookMarked className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.savedEvents}</p>
                <p className="text-sm text-gray-600">Saved Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.submittedEvents}</p>
                <p className="text-sm text-gray-600">Submitted Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
                <p className="text-sm text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Registered Events */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <Link href="/dashboard/registered" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {loadingData ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentEvents.length > 0 ? (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event._id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="text-2xl mt-1">{getEventTypeIcon(event.eventType)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(event.startDate)}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getEventTypeColor(event.eventType)}`}>
                          {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No upcoming events</p>
                  <Link href="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                    Browse events to register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Event Insights</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">This Month</span>
                  </div>
                  <span className="text-sm text-gray-600">{recentEvents.length} events</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <BookMarked className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Saved Items</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.savedEvents} events</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Registrations</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.registeredEvents} total</span>
                </div>

                {user?.userType === 'teacher' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Plus className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">Submitted</span>
                    </div>
                    <span className="text-sm text-gray-600">{stats.submittedEvents} events</span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t">
                <Link href="/dashboard/profile" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block">
                  Manage Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
