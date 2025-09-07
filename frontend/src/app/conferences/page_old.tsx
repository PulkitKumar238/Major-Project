'use client'

import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus } from 'lucide-react'
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers'

const conferences = [
  {
    id: 1,
    title: 'International Conference on Artificial Intelligence and Machine Learning',
    date: 'March 15-17, 2025',
    location: 'Stanford University, California, USA',
    attendees: '500+',
    deadline: '15 days left',
    category: 'Computer Science',
    description: 'Join leading researchers and industry experts to explore the latest breakthroughs in AI and ML. Features keynote speakers, technical sessions, and networking opportunities.',
    registrationFee: '$300',
    submissionDeadline: 'Feb 15, 2025',
    website: 'https://ai-ml-conf.stanford.edu',
    organizer: 'Stanford AI Lab'
  },
  {
    id: 2,
    title: 'Quantum Computing Research Conference',
    date: 'July 12-15, 2025',
    location: 'ETH Zurich, Switzerland',
    attendees: '400+',
    deadline: '60 days left',
    category: 'Physics',
    description: 'Cutting-edge research in quantum computing and quantum information science. Featuring demonstrations of quantum algorithms and hardware.',
    registrationFee: '$400',
    submissionDeadline: 'Apr 20, 2025',
    website: 'https://quantum-conf.ethz.ch',
    organizer: 'ETH Quantum Research Center'
  },
  {
    id: 3,
    title: 'International Conference on Renewable Energy',
    date: 'September 8-10, 2025',
    location: 'University of Oxford, UK',
    attendees: '350+',
    deadline: '90 days left',
    category: 'Environmental Science',
    description: 'Exploring sustainable energy solutions and environmental impact. Focus on solar, wind, and emerging renewable technologies.',
    registrationFee: '$250',
    submissionDeadline: 'June 1, 2025',
    website: 'https://renewable-energy.ox.ac.uk',
    organizer: 'Oxford Environmental Institute'
  }
]

export default function ConferencesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Conferences</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover major conferences where researchers present their findings and connect with peers from around the world.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Conferences Grid */}
        <div className="grid grid-cols-1 gap-8">
          {conferences.map((conference) => (
            <div key={conference.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Conference
                      </span>
                      <span className="text-gray-600 text-sm">{conference.category}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {conference.title}
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {conference.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {conference.deadline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-semibold">{conference.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-semibold">{conference.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <div className="font-semibold">{conference.attendees} expected</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <div className="font-semibold">Submit by {conference.submissionDeadline}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Registration Fee:</span>
                      <span className="ml-2 text-green-600 font-semibold">{conference.registrationFee}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Organizer:</span>
                      <span className="ml-2 text-gray-700">{conference.organizer}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Website:</span>
                      <a href={conference.website} className="ml-2 text-blue-600 hover:text-blue-800 flex items-center">
                        Visit Site <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleRegisterEvent(conference.id, conference.title, conference.website)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Register Now</span>
                  </button>
                  <button 
                    onClick={() => handleSaveForLater(conference.id, conference.title)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Save for Later</span>
                  </button>
                  <button 
                    onClick={() => handleLearnMore(conference.id, conference.title)}
                    className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Loading more conferences... This would fetch additional events from the API.')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Load More Conferences
          </button>
        </div>
      </div>
    </main>
  )
}
