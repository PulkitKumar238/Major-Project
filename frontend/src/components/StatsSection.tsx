import { TrendingUp, Users, Globe, BookOpen } from 'lucide-react'

const stats = [
  {
    icon: BookOpen,
    number: '10,000+',
    label: 'Academic Events',
    description: 'Comprehensive database of conferences, workshops, and seminars',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    number: '100k+',
    label: 'Active Researchers',
    description: 'Students, faculty, and researchers using our platform',
    color: 'text-purple-600'
  },
  {
    icon: Globe,
    number: '50+',
    label: 'Countries',
    description: 'Global coverage of academic events worldwide',
    color: 'text-green-600'
  },
  {
    icon: TrendingUp,
    number: '95%',
    label: 'Success Rate',
    description: 'Users successfully finding relevant academic opportunities',
    color: 'text-orange-600'
  }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Academic Community
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the growing community of researchers, students, and faculty members 
            who rely on AcademicHub for their academic networking needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-200">
                  {stat.label}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Making Academic Discovery Effortless
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Comprehensive Coverage:</strong> From local university seminars to international conferences
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Smart Filtering:</strong> Find events by subject area, academic level, and location
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Real-time Updates:</strong> Stay informed about deadlines, changes, and new opportunities
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h4 className="text-xl font-semibold mb-4">What Our Users Say</h4>
            <blockquote className="text-gray-300 italic mb-4">
              "AcademicHub has transformed how I discover research conferences. I no longer miss important deadlines or opportunities in my field."
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">DR</span>
              </div>
              <div>
                <div className="font-semibold">Dr. Sarah Rodriguez</div>
                <div className="text-gray-400 text-sm">Professor, Computer Science</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
