'use client'

import { Calendar, MapPin, Users, Clock, ExternalLink, BookmarkPlus, MessageSquare } from 'lucide-react'
import { handleRegisterEvent, handleLearnMore, handleSaveForLater } from '@/utils/eventHandlers'

const seminars = [
  {
    id: 1,
    title: 'Digital Humanities and Technology Integration',
    date: 'June 5-6, 2025',
    location: 'MIT, Cambridge, Massachusetts, USA',
    attendees: '200+',
    deadline: '45 days left',
    category: 'Digital Humanities',
    description: 'Exploring the intersection of technology and humanities research. Discussions on digital archives, computational text analysis, and virtual reality in historical studies.',
    registrationFee: '$100',
    submissionDeadline: 'Apr 1, 2025',
    website: 'https://digital-humanities.mit.edu',
    organizer: 'MIT Digital Humanities Lab',
    format: 'Hybrid (In-person & Online)',
    speakers: ['Dr. Jane Smith', 'Prof. Michael Johnson', 'Dr. Sarah Williams']
  },
  {
    id: 2,
    title: 'Bioethics and Modern Medicine',
    date: 'August 20-22, 2025',
    location: 'University of Toronto, Canada',
    attendees: '180+',
    deadline: '75 days left',
    category: 'Philosophy & Medicine',
    description: 'Examining ethical implications of modern biotechnology, genetic engineering, and AI in healthcare. Panel discussions with leading bioethicists and medical professionals.',
    registrationFee: '$120',
    submissionDeadline: 'May 10, 2025',
    website: 'https://bioethics.utoronto.ca',
    organizer: 'University of Toronto Bioethics Center',
    format: 'In-person',
    speakers: ['Dr. Robert Chen', 'Prof. Lisa Anderson', 'Dr. David Kim']
  },
  {
    id: 3,
    title: 'Climate Science and Policy Implications',
    date: 'September 12-13, 2025',
    location: 'University of Cambridge, UK',
    attendees: '250+',
    deadline: '95 days left',
    category: 'Environmental Science',
    description: 'Latest research in climate science and its policy implications. Featuring discussions on carbon capture, renewable energy policy, and international climate agreements.',
    registrationFee: 'Free',
    submissionDeadline: 'June 15, 2025',
    website: 'https://climate-policy.cam.ac.uk',
    organizer: 'Cambridge Climate Research Institute',
    format: 'Hybrid (In-person & Online)',
    speakers: ['Prof. Emma Thompson', 'Dr. James Wilson', 'Dr. Maria Rodriguez']
  }
]

export default function SeminarsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Academic Seminars</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Engaging discussions and presentations on cutting-edge research topics. Join scholarly conversations that shape the future of academia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Seminars Grid */}
        <div className="grid grid-cols-1 gap-8">
          {seminars.map((seminar) => (
            <div key={seminar.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Seminar
                      </span>
                      <span className="text-gray-600 text-sm font-medium">{seminar.category}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {seminar.format}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {seminar.title}
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {seminar.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {seminar.deadline}
                    </span>
                  </div>
                </div>

                {/* Speakers Section */}
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Featured Speakers</h4>
                  <div className="flex flex-wrap gap-2">
                    {seminar.speakers.map((speaker, index) => (
                      <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border">
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-semibold">{seminar.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-semibold">{seminar.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-500">Expected Attendees</div>
                      <div className="font-semibold">{seminar.attendees}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <div className="text-sm text-gray-500">Submit by</div>
                      <div className="font-semibold">{seminar.submissionDeadline}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Registration Fee:</span>
                      <span className={`ml-2 font-semibold ${seminar.registrationFee === 'Free' ? 'text-green-600' : 'text-blue-600'}`}>
                        {seminar.registrationFee}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Organizer:</span>
                      <span className="ml-2 text-gray-700">{seminar.organizer}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Website:</span>
                      <a href={seminar.website} className="ml-2 text-blue-600 hover:text-blue-800 flex items-center">
                        Visit Site <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleRegisterEvent(seminar.id, seminar.title, seminar.website)}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Join Seminar</span>
                  </button>
                  <button 
                    onClick={() => handleSaveForLater(seminar.id, seminar.title)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Save for Later</span>
                  </button>
                  <button 
                    onClick={() => handleLearnMore(seminar.id, seminar.title)}
                    className="flex-1 border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seminar Benefits */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Benefits of Attending Seminars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Discussions</h4>
              <p className="text-gray-600 text-sm">Engage in meaningful conversations with leading researchers and academics.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Networking</h4>
              <p className="text-gray-600 text-sm">Connect with peers and potential collaborators in your field of interest.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Latest Research</h4>
              <p className="text-gray-600 text-sm">Stay updated with the most recent developments and findings in your area.</p>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Loading more seminars... This would fetch additional seminars from the API.')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Load More Seminars
          </button>
        </div>
      </div>
    </main>
  )
}
