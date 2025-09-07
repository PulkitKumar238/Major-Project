'use client'

import { Search, Calendar, Globe, Bell, Filter, Bookmark } from 'lucide-react'
import { handleCreateAccount } from '../utils/eventHandlers'

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Advanced search filters to find events by subject area, date, location, and academic level.',
    color: 'text-blue-600'
  },
  {
    icon: Calendar,
    title: 'Chronological Listing',
    description: 'Events organized in chronological order to help you plan and prepare well in advance.',
    color: 'text-green-600'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Comprehensive database covering local, national, and international academic events.',
    color: 'text-purple-600'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get notified about events matching your research interests and academic profile.',
    color: 'text-orange-600'
  },
  {
    icon: Filter,
    title: 'Subject Categories',
    description: 'Browse events by specific academic disciplines and research areas.',
    color: 'text-red-600'
  },
  {
    icon: Bookmark,
    title: 'Save & Track',
    description: 'Bookmark interesting events and track deadlines for submissions and registrations.',
    color: 'text-indigo-600'
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AcademicHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop wasting time searching across multiple platforms. Our comprehensive portal 
            brings all academic opportunities to one place, making discovery effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Explore Academic Opportunities?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers, students, and faculty members who trust AcademicHub 
              to stay updated with the latest academic events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCreateAccount}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Exploring
              </button>
              <button 
                onClick={handleCreateAccount}
                className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
