// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  ChevronDown,
  Play,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Heart
} from 'lucide-react';
import { useState } from 'react';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="text-slate-800">
      {/* ===== Top Banner ===== */}
      <div className="bg-yellow-400 text-slate-900 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm font-medium">
            Complete your profile to get the most out of Samaadhan. Add your name, email, and location to start reporting issues.
          </p>
          <Link to="/profile" className="bg-slate-900 text-white px-4 py-1 rounded text-sm font-medium hover:bg-slate-800 transition">
            Complete Profile
          </Link>
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Report Local Issues.<br />
                <span className="text-teal-500">Make Your City Better.</span>
        </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Samaadhan helps citizens report, and track local civic issues like potholes, broken lights, and garbage collection problems. Join thousands making their communities better.
        </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
                  to="/report"
                  className="brand-btn text-white font-bold text-lg py-3 px-8 rounded-md transition inline-flex items-center justify-center"
          >
                  Get Started
          </Link>
                <button className="bg-white text-slate-700 font-bold text-lg py-3 px-8 rounded-md border-2 border-brand hover:bg-slate-100 transition inline-flex items-center justify-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <span className="font-medium">4.8/5 from 2,500+ users</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-200">
                <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">VIX</span>
                    </div>
                    <p className="text-slate-600 font-medium">Live Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to <span className="text-teal-500">improve your community</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Samaadhan provides a comprehensive platform for citizens and city workers to collaborate on local issues and build stronger communities together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Report Issues */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <Camera className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Report Issues</h3>
              <p className="text-slate-600 mb-6">
                Easily report problems with photos, location data, and detailed descriptions to help city workers understand and address issues quickly.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Photo uploads
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Map integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Categorized issues
                </li>
              </ul>
            </div>

            {/* Track Progress */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Track Progress</h3>
              <p className="text-slate-600 mb-6">
                Follow report status with real-time updates and insights. Stay informed about the progress of issues in your community.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Real-time updates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Status notifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Resolution timeline
                </li>
              </ul>
            </div>

            {/* Community Voting */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Community Voting</h3>
              <p className="text-slate-600 mb-6">
                Upvote issues to prioritize community concerns. Your voice helps determine which issues get the most attention.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Issue upvoting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Trending issues
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-teal-500" size={16} />
                  Community feedback
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple process, <span className="text-teal-500">powerful results</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Samaadhan makes it easy to report issues and track their resolution in just a few simple steps. Join thousands of citizens making their communities better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Report an Issue</h3>
              <p className="text-slate-600">
                Take a photo, mark the location on the map, and add a detailed description of the problem you've encountered.
              </p>
        </div>
        
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">City Review</h3>
              <p className="text-slate-600">
                City workers review and prioritize issues based on community impact and available resources.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Track Resolution</h3>
            <p className="text-slate-600">
                Follow your report's progress with real-time updates and see the positive change in your community.
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
              Trusted by <span className="text-teal-500">communities everywhere</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See what citizens and city workers are saying about Samaadhan and how it's transforming communities across the nation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm">
                "I reported a pothole on my street and it was fixed within a week. The ability to track progress kept me informed the whole time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-sm">AP</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Aarav Patel</p>
                  <p className="text-slate-500 text-xs">Resident, Bangalore</p>
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
              <p className="text-slate-600 mb-4 text-sm">
                "As a City worker, Samaadhan has transformed how we manage local issues. The dashboard makes it easy to prioritize and track our work."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Akshay Prakash</p>
                  <p className="text-slate-500 text-xs">Public Works, Delhi</p>
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
              <p className="text-slate-600 mb-4 text-sm">
                "The transparency and speed of resolution through Samaadhan has restored my faith in local government. Highly recommend to every citizen."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">MS</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Meera Sharma</p>
                  <p className="text-slate-500 text-xs">Teacher, Chennai</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm">
                "Our community engagement has increased by 300% since implementing Samaadhan. Citizens feel heard and empowered to make real change."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">RS</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Rahul Singh</p>
                  <p className="text-slate-500 text-xs">City Manager, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently <span className="text-teal-500">Asked Questions</span>
            </h2>
            <p className="text-lg text-slate-600">
              Find answers to commonly asked questions about Samaadhan platform features and services.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is Samaadhan?",
                answer: "Samaadhan is a civic engagement platform that helps citizens report local issues like potholes, broken streetlights, and garbage collection problems. It connects citizens with city workers to improve communities together.",
                popular: true
              },
              {
                question: "How do I report an issue?",
                answer: "Simply take a photo of the issue, mark its location on the map, add a description, and submit. It takes less than 2 minutes to make a difference in your community."
              },
              {
                question: "Is Samaadhan free to use?",
                answer: "Yes, Samaadhan is completely free for citizens to use. There are no hidden fees or premium features. We believe civic engagement should be accessible to everyone.",
                popular: true
              },
              {
                question: "How can I track the status of my report?",
                answer: "Once you submit a report, you'll receive real-time updates via email and can check the status anytime on the platform. You'll be notified when the issue is reviewed, in progress, and resolved."
              },
              {
                question: "Can I vote on issues reported by others?",
                answer: "Yes! You can upvote issues that matter to you. Community voting helps prioritize which issues get the most attention from city workers.",
                popular: true
              }
            ].map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    {faq.popular && (
                      <span className="bg-teal-100 text-teal-600 text-xs px-2 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== App Download Section ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Ready to improve your community?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Download the Samaadhan app today and start making a difference in your neighborhood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md transition inline-flex items-center justify-center">
                  Download for iOS
                </button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-md transition inline-flex items-center justify-center">
                  Download for Android
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 inline-block">
                <div className="w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">VIX</span>
                    </div>
                    <p className="text-slate-600 text-sm">QR Code</p>
                  </div>
                </div>
                <p className="font-semibold text-slate-900">Samaadhan App on Mobile</p>
                <p className="text-slate-600 text-sm">Scan to Download</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VIX</span>
                </div>
                <span className="text-xl font-bold">Samaadhan</span>
              </div>
              <p className="text-slate-300 mb-4">Civic Engagement Platform</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering citizens through technology. Stay informed, make better decisions, and engage with civic life.
              </p>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">Connect with us</h3>
              <div className="flex gap-3">
                <Facebook className="text-slate-400 hover:text-white cursor-pointer" size={20} />
                <Twitter className="text-slate-400 hover:text-white cursor-pointer" size={20} />
                <Linkedin className="text-slate-400 hover:text-white cursor-pointer" size={20} />
                <Instagram className="text-slate-400 hover:text-white cursor-pointer" size={20} />
                <Youtube className="text-slate-400 hover:text-white cursor-pointer" size={20} />
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p>support@civix.com</p>
                <p>+1 800 123-4567</p>
                <p>Bangalore, India</p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Samaadhan</h3>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="text-slate-400 hover:text-white block">About Us</Link>
                <Link to="/careers" className="text-slate-400 hover:text-white block">Careers</Link>
                <Link to="/press" className="text-slate-400 hover:text-white block">Press</Link>
                <Link to="/blog" className="text-slate-400 hover:text-white block">Blog</Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-slate-700 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="font-semibold mb-4">Subscribe to get updates on new features</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md font-medium transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2023 Samaadhan. All rights reserved. • Made with <Heart className="inline text-red-500" size={14} /> for better civic engagement.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-slate-400 hover:text-white">Terms</Link>
              <Link to="/accessibility" className="text-slate-400 hover:text-white">Accessibility</Link>
              <span className="text-slate-400">Built by Kandil</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}