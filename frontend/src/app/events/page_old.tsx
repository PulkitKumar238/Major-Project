'use client'

import { Calendar, MapPin, Users, Filter, Search, Clock } from 'lucide-react'
import { handleRegisterEvent, handleLearnMore } from '@/utils/eventHandlers'

const events = [
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
    registrationFee: '$300',
    submissionDeadline: 'Feb 15, 2025'
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
    registrationFee: '$200',
    submissionDeadline: 'Mar 1, 2025'
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
    registrationFee: '$150',
    submissionDeadline: 'Mar 15, 2025'
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
    registrationFee: '$100',
    submissionDeadline: 'Apr 1, 2025'
  },
  {
    id: 5,
    title: 'Quantum Computing Research Conference',
    type: 'Conference',
    date: 'July 12-15, 2025',
    location: 'ETH Zurich, Switzerland',
    attendees: '400+',
    deadline: '60 days left',
    category: 'Physics',
    description: 'Cutting-edge research in quantum computing and quantum information science.',
    registrationFee: '$400',
    submissionDeadline: 'Apr 20, 2025'
  },
  {
    id: 6,
    title: 'Bioethics and Society Workshop',
    type: 'Workshop',
    date: 'August 20-22, 2025',
    location: 'University of Toronto, Canada',
    attendees: '180+',
    deadline: '75 days left',
    category: 'Philosophy',
    description: 'Examining ethical implications of modern biotechnology and medical research.',
    registrationFee: '$120',
    submissionDeadline: 'May 10, 2025'
  }
]

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover conferences, workshops, seminars, and symposia from leading institutions worldwide.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="">Event Type</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="symposium">Symposium</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="">Category</option>
              <option value="computer-science">Computer Science</option>
              <option value="medicine">Medicine</option>
              <option value="physics">Physics</option>
              <option value="environmental-science">Environmental Science</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
              <option value="">Location</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="europe">Europe</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.type}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm">{event.category}</span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.deadline}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                    {event.attendees} expected
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Submit by {event.submissionDeadline}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">{event.registrationFee}</span>
                    <span className="text-gray-500 text-sm ml-1">registration</span>
                  </div>
                  <div className="space-x-3">
                    <button 
                      onClick={() => handleLearnMore(event.id, event.title)}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Learn More
                    </button>
                    <button 
                      onClick={() => handleRegisterEvent(event.id, event.title)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
