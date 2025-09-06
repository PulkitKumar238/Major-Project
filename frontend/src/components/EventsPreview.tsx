'use client'

import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react'
import { handleRegisterEvent, handleLearnMore } from '@/utils/eventHandlers'

const featuredEvents = [
  {
    id: 1,
    title: 'International Conference on Artificial Intelligence',
    type: 'Conference',
    date: 'March 15-17, 2025',
    location: 'Stanford University, CA',
    attendees: '500+',
    deadline: '15 days left',
    category: 'Computer Science',
    description: 'Leading researchers presenting latest developments in AI and machine learning.',
    image: '/api/placeholder/400/200',
    featured: true
  },
  {
    id: 2,
    title: 'Climate Change Research Symposium',
    type: 'Symposium',
    date: 'April 22-24, 2025',
    location: 'Oxford University, UK',
    attendees: '300+',
    deadline: '22 days left',
    category: 'Environmental Science',
    description: 'Interdisciplinary discussions on climate science and sustainability solutions.',
    image: '/api/placeholder/400/200'
  },
  {
    id: 3,
    title: 'Medical Innovation Workshop',
    type: 'Workshop',
    date: 'May 8-10, 2025',
    location: 'Harvard Medical School, MA',
    attendees: '150+',
    deadline: '30 days left',
    category: 'Medicine',
    description: 'Hands-on workshop exploring cutting-edge medical technologies and treatments.',
    image: '/api/placeholder/400/200'
  },
  {
    id: 4,
    title: 'Digital Humanities Seminar',
    type: 'Seminar',
    date: 'June 5-6, 2025',
    location: 'MIT, Cambridge, MA',
    attendees: '200+',
    deadline: '45 days left',
    category: 'Digital Humanities',
    description: 'Exploring the intersection of technology and humanities research.',
    image: '/api/placeholder/400/200'
  }
]

export default function EventsPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Academic Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover upcoming conferences, workshops, and seminars from leading institutions worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                event.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`flex flex-col ${event.featured ? 'lg:flex-row' : ''}`}>
                {/* Event Image */}
                <div className={`relative ${event.featured ? 'lg:w-1/2' : 'w-full'} h-48 ${event.featured ? 'lg:h-auto' : ''} bg-gradient-to-br from-blue-100 to-purple-100`}>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.deadline}
                    </span>
                  </div>
                  {event.featured && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured Event
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className={`p-6 ${event.featured ? 'lg:w-1/2' : 'w-full'}`}>
                  <div className="mb-3">
                    <span className="text-blue-600 text-sm font-semibold">{event.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} expected attendees
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleLearnMore(event.id, event.title)}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                    <button 
                      onClick={() => handleRegisterEvent(event.id, event.title)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      Register Interest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            View All Events
          </button>
        </div>
      </div>
    </section>
  )
}
