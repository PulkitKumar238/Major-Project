'use client'

import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus, Wrench } from 'lucide-react'
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers'

const workshops = [
  {
    id: 1,
    title: 'Hands-on Medical Innovation Workshop',
    date: 'May 8-10, 2025',
    location: 'Harvard Medical School, Massachusetts, USA',
    attendees: '150+',
    deadline: '30 days left',
    category: 'Medicine',
    description: 'Intensive hands-on workshop exploring cutting-edge medical technologies, surgical techniques, and treatment innovations. Includes practical sessions with medical devices.',
    registrationFee: '$150',
    submissionDeadline: 'Mar 15, 2025',
    website: 'https://medinnovation.harvard.edu',
    organizer: 'Harvard Medical Innovation Lab',
    duration: '3 days',
    skillLevel: 'Intermediate to Advanced'
  },
  {
    id: 2,
    title: 'Data Science and Machine Learning Bootcamp',
    date: 'June 20-22, 2025',
    location: 'MIT, Cambridge, Massachusetts, USA',
    attendees: '200+',
    deadline: '45 days left',
    category: 'Computer Science',
    description: 'Comprehensive workshop covering data analysis, machine learning algorithms, and practical implementation using Python and R. Perfect for researchers new to data science.',
    registrationFee: '$200',
    submissionDeadline: 'Apr 1, 2025',
    website: 'https://datascience.mit.edu',
    organizer: 'MIT Computer Science & AI Lab',
    duration: '3 days',
    skillLevel: 'Beginner to Intermediate'
  },
  {
    id: 3,
    title: 'Sustainable Architecture Design Workshop',
    date: 'August 15-17, 2025',
    location: 'University of California, Berkeley, USA',
    attendees: '120+',
    deadline: '75 days left',
    category: 'Architecture',
    description: 'Learn sustainable design principles, green building technologies, and environmental impact assessment. Includes CAD software training and real project work.',
    registrationFee: '$180',
    submissionDeadline: 'May 10, 2025',
    website: 'https://sustainable-arch.berkeley.edu',
    organizer: 'UC Berkeley School of Architecture',
    duration: '3 days',
    skillLevel: 'All Levels'
  }
]

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Wrench className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Academic Workshops</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Hands-on learning experiences and skill-building sessions led by experts in their fields. Perfect for practical knowledge and networking.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshops Grid */}
        <div className="grid grid-cols-1 gap-8">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Workshop
                      </span>
                      <span className="text-gray-600 text-sm font-medium">{workshop.category}</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        {workshop.skillLevel}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {workshop.title}
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {workshop.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {workshop.deadline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-semibold">{workshop.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-semibold">{workshop.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Attendees</div>
                      <div className="font-semibold">{workshop.attendees}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold">{workshop.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Wrench className="h-5 w-5 mr-3 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-500">Submit by</div>
                      <div className="font-semibold">{workshop.submissionDeadline}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Registration Fee:</span>
                      <span className="ml-2 text-green-600 font-semibold">{workshop.registrationFee}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Organizer:</span>
                      <span className="ml-2 text-gray-700">{workshop.organizer}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Website:</span>
                      <a href={workshop.website} className="ml-2 text-blue-600 hover:text-blue-800 flex items-center">
                        Visit Site <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleRegisterEvent(workshop.id, workshop.title, workshop.website)}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Register for Workshop</span>
                  </button>
                  <button 
                    onClick={() => handleSaveForLater(workshop.id, workshop.title)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Save for Later</span>
                  </button>
                  <button 
                    onClick={() => handleLearnMore(workshop.id, workshop.title)}
                    className="flex-1 border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Benefits */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Attend Our Workshops?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Hands-on Learning</h4>
              <p className="text-gray-600 text-sm">Practical exercises and real-world applications of theoretical concepts.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Instructors</h4>
              <p className="text-gray-600 text-sm">Learn from industry leaders and renowned academics in their fields.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Schedule</h4>
              <p className="text-gray-600 text-sm">Intensive format designed to fit into busy academic schedules.</p>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Loading more workshops... This would fetch additional workshops from the API.')}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Load More Workshops
          </button>
        </div>
      </div>
    </main>
  )
}
