                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          // src/pages/AboutPage.tsx
import { 
  Target, 
  Users, 
  Shield, 
  Lightbulb, 
  Heart, 
  Award,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="text-slate-800">
      {/* ===== Hero Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              About <span className="text-teal-500">Samadhan</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We're on a mission to bridge the gap between citizens and local government, creating stronger, more responsive communities through technology and civic engagement.
            </p>
            <div className="flex justify-center">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 max-w-2xl">
                <p className="text-slate-700 font-medium">
                  "Empowering citizens to make their voices heard and their communities better, one report at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission & Vision Section ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our <span className="text-teal-500">Mission</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To create a transparent, efficient, and responsive platform that connects citizens with their local government, enabling faster resolution of community issues and fostering civic participation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-teal-500 mt-1" size={20} />
                  <p className="text-slate-600">Democratize civic engagement through technology</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-teal-500 mt-1" size={20} />
                  <p className="text-slate-600">Increase transparency in local governance</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-teal-500 mt-1" size={20} />
                  <p className="text-slate-600">Build stronger, more connected communities</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="text-teal-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  A world where every citizen has a direct line to their local government, where community issues are resolved quickly and transparently, and where civic engagement is not just encouraged but made effortless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-teal-500">Values</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              These core values guide everything we do at Samadhan and shape how we serve our communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Transparency */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Transparency</h3>
              <p className="text-slate-600">
                We believe in open communication and clear visibility into how community issues are being addressed.
              </p>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Community</h3>
              <p className="text-slate-600">
                Every voice matters. We're building tools that amplify citizen voices and strengthen community bonds.
              </p>
            </div>

            {/* Innovation */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Innovation</h3>
              <p className="text-slate-600">
                We leverage cutting-edge technology to solve age-old problems in civic engagement and governance.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-orange-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Impact</h3>
              <p className="text-slate-600">
                We measure success by the positive change we create in communities and the lives we improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Story Section ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our <span className="text-teal-500">Story</span>
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Samadhan was born from a simple observation: too many community issues go unreported or unresolved because the process is complicated, time-consuming, and lacks transparency.
                </p>
                <p>
                  Our founders, having experienced the frustration of reporting issues in their own neighborhoods, decided to create a solution that would make civic engagement as simple as posting on social media.
                </p>
                <p>
                  Today, Samadhan serves thousands of citizens across multiple cities, helping them report issues, track progress, and see real change in their communities. We're proud to be part of the civic tech movement that's transforming how citizens and governments interact.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">By the Numbers</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-teal-600" size={20} />
                    </div>
                    <span className="font-semibold text-slate-900">Issues Resolved</span>
                  </div>
                  <span className="text-2xl font-bold text-teal-600">2,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <span className="font-semibold text-slate-900">Active Users</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">1,200+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Globe className="text-green-600" size={20} />
                    </div>
                    <span className="font-semibold text-slate-900">Cities Served</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">15+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="text-purple-600" size={20} />
                    </div>
                    <span className="font-semibold text-slate-900">Satisfaction Rate</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Our <span className="text-teal-500">Team</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're a passionate group of technologists, civic enthusiasts, and community advocates working together to make local governance more accessible and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 font-bold text-xl">HK</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Himanshu Kumar</h3>
              <p className="text-teal-600 font-medium mb-3">Founder & CEO</p>
              <p className="text-slate-600 text-sm">
                Passionate about civic technology and community engagement. Former city planner with 10+ years of experience in urban development.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">AS</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aditya sharma</h3>
              <p className="text-teal-600 font-medium mb-3">CTO</p>
              <p className="text-slate-600 text-sm">
                Full-stack developer and civic tech enthusiast. Leads our technical team in building scalable, user-friendly solutions.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">AG</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Abhipsha giri</h3>
              <p className="text-teal-600 font-medium mb-3">Head of Community</p>
              <p className="text-slate-600 text-sm">
                Community engagement specialist with a background in public policy. Ensures our platform serves citizens effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What People Say <span className="text-teal-500">About Us</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Hear from citizens and city officials who have experienced the impact of Samadhan firsthand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm italic">
                "Samadhan has revolutionized how we handle citizen complaints. The transparency and efficiency have improved our response time by 60%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-sm">MS</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Mayor Sharma</p>
                  <p className="text-slate-500 text-xs">City of Bangalore</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm italic">
                "Finally, a platform that makes it easy to report issues and see them get resolved. My neighborhood has never looked better!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Anita Kumar</p>
                  <p className="text-slate-500 text-xs">Resident, Delhi</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm italic">
                "The team at Samadhan truly understands the needs of both citizens and city workers. Their platform has made our job so much easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">VP</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Vikram Patel</p>
                  <p className="text-slate-500 text-xs">Public Works Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Call to Action Section ===== */}
      <section className="py-20 bg-teal-500">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-teal-100 mb-8 leading-relaxed">
            Join thousands of citizens who are already using Samadhan to improve their communities. Your voice matters, and your actions create change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-500 font-bold text-lg py-3 px-8 rounded-md hover:bg-slate-100 transition inline-flex items-center justify-center gap-2">
              Get Started Today
              <ArrowRight size={20} />
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold text-lg py-3 px-8 rounded-md hover:bg-white hover:text-teal-500 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
