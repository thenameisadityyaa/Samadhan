// src/pages/ContributionsPage.tsx
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award,
  Star,
  Heart,
  Globe,
  Clock,
  Camera,
  FileText,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export function ContributionsPage() {
  const contributions = [
    {
      id: 1,
      title: "Bangalore Smart City Initiative",
      location: "Bangalore, Karnataka",
      date: "2023",
      category: "Infrastructure",
      description: "Partnered with Bangalore Municipal Corporation to digitize civic issue reporting and resolution process. Implemented real-time tracking system for 500+ daily reports.",
      impact: {
        issuesResolved: 2500,
        citizensReached: 15000,
        responseTime: "24 hours",
        satisfaction: 4.8
      },
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Reduced average resolution time by 60%",
        "Increased citizen engagement by 300%",
        "Achieved 95% issue tracking accuracy"
      ],
      status: "Completed"
    },
    {
      id: 2,
      title: "Delhi Road Safety Campaign",
      location: "New Delhi",
      date: "2023",
      category: "Safety",
      description: "Launched comprehensive road safety reporting system in collaboration with Delhi Traffic Police. Citizens can now report potholes, broken signals, and road hazards instantly.",
      impact: {
        issuesResolved: 1800,
        citizensReached: 25000,
        responseTime: "12 hours",
        satisfaction: 4.6
      },
      images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Prevented 50+ potential accidents",
        "Improved road condition monitoring",
        "Enhanced emergency response coordination"
      ],
      status: "Completed"
    },
    {
      id: 3,
      title: "Mumbai Waste Management Revolution",
      location: "Mumbai, Maharashtra",
      date: "2023",
      category: "Environment",
      description: "Transformed waste collection reporting system for Mumbai's 12 million residents. Implemented GPS tracking for garbage trucks and real-time collection status updates.",
      impact: {
        issuesResolved: 3200,
        citizensReached: 12000000,
        responseTime: "6 hours",
        satisfaction: 4.7
      },
      images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Reduced missed collections by 80%",
        "Improved recycling rates by 40%",
        "Enhanced citizen satisfaction significantly"
      ],
      status: "Completed"
    },
    {
      id: 4,
      title: "Chennai Water Crisis Management",
      location: "Chennai, Tamil Nadu",
      date: "2023",
      category: "Utilities",
      description: "Developed emergency water supply reporting system during Chennai's water crisis. Enabled citizens to report water leaks, quality issues, and supply problems in real-time.",
      impact: {
        issuesResolved: 1200,
        citizensReached: 8000,
        responseTime: "4 hours",
        satisfaction: 4.9
      },
      images: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Prevented water wastage by 30%",
        "Improved emergency response time",
        "Enhanced water quality monitoring"
      ],
      status: "Completed"
    },
    {
      id: 5,
      title: "Pune Smart Parking System",
      location: "Pune, Maharashtra",
      date: "2023",
      category: "Transportation",
      description: "Implemented smart parking management system with real-time availability updates and digital payment integration. Reduced traffic congestion and improved parking efficiency.",
      impact: {
        issuesResolved: 900,
        citizensReached: 20000,
        responseTime: "2 hours",
        satisfaction: 4.5
      },
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Reduced parking search time by 50%",
        "Increased parking revenue by 25%",
        "Improved traffic flow in city center"
      ],
      status: "Completed"
    },
    {
      id: 6,
      title: "Kolkata Street Lighting Upgrade",
      location: "Kolkata, West Bengal",
      date: "2023",
      category: "Infrastructure",
      description: "Deployed smart street lighting management system with automatic fault detection and citizen reporting integration. Enhanced safety and reduced energy consumption.",
      impact: {
        issuesResolved: 1500,
        citizensReached: 18000,
        responseTime: "8 hours",
        satisfaction: 4.6
      },
      images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      ],
      achievements: [
        "Reduced energy consumption by 35%",
        "Improved street safety significantly",
        "Enhanced maintenance efficiency"
      ],
      status: "Completed"
    }
  ];

  const stats = {
    totalProjects: 6,
    totalIssuesResolved: 11100,
    totalCitizensReached: 12000000,
    averageSatisfaction: 4.7,
    citiesServed: 6,
    responseTimeImprovement: "65%"
  };

  const categories = [
    { name: "Infrastructure", count: 2, color: "blue" },
    { name: "Safety", count: 1, color: "red" },
    { name: "Environment", count: 1, color: "green" },
    { name: "Utilities", count: 1, color: "purple" },
    { name: "Transportation", count: 1, color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Our <span className="text-yellow-300">Contributions</span>
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Discover how Samaadhan has transformed civic engagement across India, making cities smarter and communities stronger through technology and citizen participation.
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
                <p className="text-teal-100 font-medium">
                  "Empowering citizens to build better communities, one report at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Overview ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Impact by the Numbers
            </h2>
            <p className="text-lg text-slate-600">
              Our contributions have made a measurable difference in communities across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-teal-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stats.totalProjects}</div>
              <div className="text-slate-600">Projects Completed</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stats.totalIssuesResolved.toLocaleString()}</div>
              <div className="text-slate-600">Issues Resolved</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{(stats.totalCitizensReached / 1000000).toFixed(1)}M</div>
              <div className="text-slate-600">Citizens Reached</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stats.averageSatisfaction}/5</div>
              <div className="text-slate-600">Avg. Satisfaction</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-purple-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stats.citiesServed}</div>
              <div className="text-slate-600">Cities Served</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-orange-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stats.responseTimeImprovement}</div>
              <div className="text-slate-600">Faster Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Category Overview ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Areas of Impact
            </h2>
            <p className="text-lg text-slate-600">
              Our contributions span across multiple sectors, creating comprehensive civic improvements
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="text-center">
                <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-${category.color}-600 font-bold text-lg`}>{category.count}</span>
                </div>
                <div className="font-semibold text-slate-900">{category.name}</div>
                <div className="text-sm text-slate-600">{category.count} project{category.count !== 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Projects Grid ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600">
              Explore our completed projects and their impact on communities across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {contributions.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                {/* Project Images */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-slate-500" size={16} />
                    <span className="text-slate-600 text-sm">{project.location}</span>
                    <span className="text-slate-400">•</span>
                    <Calendar className="text-slate-500" size={16} />
                    <span className="text-slate-600 text-sm">{project.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{project.impact.issuesResolved.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Issues Resolved</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{project.impact.citizensReached.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">Citizens Reached</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{project.impact.responseTime}</div>
                      <div className="text-sm text-slate-600">Avg. Response</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-slate-900">{project.impact.satisfaction}/5</div>
                      <div className="text-sm text-slate-600">Satisfaction</div>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="text-green-500" size={14} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition inline-flex items-center justify-center gap-2">
                    View Case Study
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              What Our Partners Say
            </h2>
            <p className="text-lg text-slate-600">
              Hear from city officials and community leaders about the impact of our contributions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Samaadhan has revolutionized how we handle citizen complaints. The transparency and efficiency have improved our response time by 60%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-sm">MS</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Mayor Sharma</p>
                  <p className="text-slate-500 text-xs">Bangalore Municipal Corporation</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "The platform has transformed our waste management system. Citizens are more engaged and our collection efficiency has improved dramatically."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Akshay Kumar</p>
                  <p className="text-slate-500 text-xs">Mumbai Municipal Corporation</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">
                "Samaadhan's smart parking solution has reduced traffic congestion in our city center by 40%. It's a game-changer for urban mobility."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">VP</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Vikram Patel</p>
                  <p className="text-slate-500 text-xs">Pune City Development Authority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="py-16 bg-teal-500">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make Your City Smarter?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join the growing number of cities that are transforming civic engagement with Samaadhan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-500 font-bold text-lg py-3 px-8 rounded-lg hover:bg-slate-100 transition inline-flex items-center justify-center gap-2">
              Partner with Us
              <ArrowRight size={20} />
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold text-lg py-3 px-8 rounded-lg hover:bg-white hover:text-teal-500 transition">
              View All Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
