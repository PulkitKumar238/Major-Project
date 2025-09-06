'use client'

import { ArrowRight, Mail, Bell, Calendar } from 'lucide-react'
import { handleCreateAccount } from '@/utils/eventHandlers'

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Don't Miss Out on Your Next 
            <br className="hidden md:block" />
            Academic Opportunity
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of researchers, students, and faculty members who stay ahead 
            of the curve with AcademicHub's comprehensive event notifications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Commented out newsletter subscription for now
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2 w-full sm:w-auto">
              <Mail className="h-5 w-5" />
              <span>Subscribe to Newsletter</span>
            </button>
            */}
            <button 
              onClick={handleCreateAccount}
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="text-blue-100 text-sm">
            ✓ Free to join  ✓ Instant notifications  ✓ Personalized recommendations
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Smart Notifications
            </h3>
            <p className="text-gray-600">
              Get personalized alerts for events matching your research interests and academic profile.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Event Calendar
            </h3>
            <p className="text-gray-600">
              Sync events to your calendar and never miss important deadlines or registration dates.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Direct Registration
            </h3>
            <p className="text-gray-600">
              Quick links to official registration pages and submission portals for seamless applications.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Advance Your Academic Career?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start discovering opportunities that match your research interests and academic goals.
          </p>
          <button 
            onClick={handleCreateAccount}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  )
}
