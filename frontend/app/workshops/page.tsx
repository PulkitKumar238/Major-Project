'use client'

import { Wrench } from 'lucide-react';

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Academic Workshops
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Participate in hands-on learning experiences and skill-building sessions led by experts.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              Workshop listings will be available soon. Check back later for updates.
            </p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Submit a Workshop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
