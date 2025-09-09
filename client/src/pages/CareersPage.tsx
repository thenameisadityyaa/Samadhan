// src/pages/CareersPage.tsx
import { useState } from 'react';
import { 
  Users, 
  Heart, 
  Lightbulb, 
  Globe, 
  Award,
  Star,
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Code,
  Smartphone,
  Database,
  Shield,
  TrendingUp,
  Coffee,
  Home,
  DollarSign,
  BookOpen,
  Zap,
  Target,
  CheckCircle,
  ExternalLink,
  Send
} from 'lucide-react';

export function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null as File | null,
    coverLetter: '',
    portfolio: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-15 LPA",
      posted: "2 days ago",
      description: "We're looking for a passionate full-stack developer to join our engineering team and help build the next generation of civic engagement platforms.",
      requirements: [
        "3+ years of experience with React, Node.js, and TypeScript",
        "Strong knowledge of databases (PostgreSQL, MongoDB)",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Familiarity with DevOps practices and CI/CD pipelines",
        "Excellent problem-solving and communication skills"
      ],
      responsibilities: [
        "Develop and maintain web applications using modern technologies",
        "Collaborate with cross-functional teams to deliver high-quality software",
        "Participate in code reviews and technical discussions",
        "Contribute to architectural decisions and system design",
        "Mentor junior developers and share knowledge"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Stock Options"],
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-6 years",
      salary: "₹12-20 LPA",
      posted: "1 week ago",
      description: "Lead product strategy and execution for our civic engagement platform, working closely with engineering, design, and business teams.",
      requirements: [
        "4+ years of product management experience in B2B SaaS",
        "Strong analytical and data-driven decision making skills",
        "Experience with user research and customer interviews",
        "Knowledge of agile development methodologies",
        "Excellent communication and stakeholder management skills"
      ],
      responsibilities: [
        "Define product roadmap and strategy",
        "Work with engineering teams to deliver features on time",
        "Conduct user research and gather customer feedback",
        "Analyze product metrics and make data-driven decisions",
        "Collaborate with sales and marketing teams"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Stock Options"],
      skills: ["Product Management", "Analytics", "User Research", "Agile", "SaaS"]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-12 LPA",
      posted: "3 days ago",
      description: "Create intuitive and beautiful user experiences for our civic engagement platform, making complex government processes simple for citizens.",
      requirements: [
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or Adobe Creative Suite",
        "Strong portfolio showcasing user-centered design",
        "Experience with user research and usability testing",
        "Knowledge of design systems and accessibility standards"
      ],
      responsibilities: [
        "Design user interfaces and user experiences",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design specifications",
        "Collaborate with developers to ensure design implementation",
        "Maintain and evolve our design system"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Design Tools"],
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Pune, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹10-18 LPA",
      posted: "5 days ago",
      description: "Build and maintain our cloud infrastructure, ensuring high availability and scalability of our civic engagement platform.",
      requirements: [
        "3+ years of DevOps/Infrastructure experience",
        "Strong knowledge of AWS, Docker, and Kubernetes",
        "Experience with CI/CD pipelines and automation",
        "Knowledge of monitoring and logging tools",
        "Scripting skills (Python, Bash, or similar)"
      ],
      responsibilities: [
        "Design and implement cloud infrastructure",
        "Automate deployment and scaling processes",
        "Monitor system performance and troubleshoot issues",
        "Ensure security and compliance standards",
        "Collaborate with development teams on infrastructure needs"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Stock Options"],
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python"]
    },
    {
      id: 5,
      title: "Business Development Manager",
      department: "Sales",
      location: "Chennai, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-15 LPA + Commission",
      posted: "1 week ago",
      description: "Drive business growth by building relationships with government agencies and municipal corporations across India.",
      requirements: [
        "3+ years of B2B sales experience, preferably in government sector",
        "Strong network in government and municipal organizations",
        "Excellent communication and presentation skills",
        "Experience with CRM systems and sales processes",
        "Understanding of government procurement processes"
      ],
      responsibilities: [
        "Identify and pursue new business opportunities",
        "Build relationships with key government stakeholders",
        "Prepare proposals and presentations for clients",
        "Negotiate contracts and close deals",
        "Collaborate with product and engineering teams"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Commission", "Travel Allowance"],
      skills: ["B2B Sales", "Government Relations", "CRM", "Proposal Writing", "Negotiation"]
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "Analytics",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹9-16 LPA",
      posted: "4 days ago",
      description: "Analyze civic engagement data to provide insights that help cities make better decisions and improve citizen services.",
      requirements: [
        "2+ years of data science experience",
        "Strong programming skills in Python or R",
        "Experience with machine learning and statistical analysis",
        "Knowledge of SQL and data visualization tools",
        "Experience with big data technologies (Spark, Hadoop)"
      ],
      responsibilities: [
        "Analyze civic engagement and city data",
        "Build predictive models for urban planning",
        "Create data visualizations and dashboards",
        "Collaborate with product teams on data-driven features",
        "Present insights to government stakeholders"
      ],
      benefits: ["Health Insurance", "Flexible Work Hours", "Learning Budget", "Stock Options"],
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"]
    }
  ];

  const companyValues = [
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and open communication to achieve great things together."
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Every line of code we write and every feature we build makes a real difference in people's lives."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We encourage creative thinking and embrace new technologies to solve complex civic challenges."
    },
    {
      icon: Globe,
      title: "Diversity",
      description: "We celebrate different perspectives and backgrounds, creating an inclusive environment for all."
    }
  ];

  const benefits = [
    {
      icon: Home,
      title: "Remote Work",
      description: "Work from anywhere in India with flexible hours"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Industry-leading compensation with performance bonuses"
    },
    {
      icon: BookOpen,
      title: "Learning & Development",
      description: "₹50,000 annual budget for courses, conferences, and books"
    },
    {
      icon: Shield,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family"
    },
    {
      icon: Coffee,
      title: "Wellness Program",
      description: "Mental health support, gym memberships, and wellness activities"
    },
    {
      icon: Award,
      title: "Stock Options",
      description: "Ownership in the company with equity participation"
    }
  ];

  const handleInputChange = (field: string, value: string | File) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    alert('Application submitted successfully! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Work with <span className="text-yellow-300">Us</span>
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Join our mission to transform civic engagement across India. Be part of a team that's building technology to make cities smarter and communities stronger.
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
                <p className="text-teal-100 font-medium">
                  "Build the future of civic technology with passionate people who care about making a difference."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Work With Us ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Work at <span className="text-teal-500">Samaadhan</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We're not just building software – we're creating tools that empower citizens and transform how governments serve their communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-teal-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Benefits Section ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Perks & Benefits
            </h2>
            <p className="text-lg text-slate-600">
              We believe in taking care of our team so they can do their best work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-teal-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Open Positions ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600">
              Join our growing team and help us build the future of civic engagement
            </p>
          </div>
          
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase size={16} />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap size={16} />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={16} />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {job.posted}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                        className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition inline-flex items-center gap-2"
                      >
                        {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                        <ArrowRight size={16} />
                      </button>
                      <button className="border border-teal-500 text-teal-500 px-6 py-2 rounded-lg hover:bg-teal-50 transition">
                        Apply Now
                      </button>
                    </div>
                  </div>
                  
                  {selectedJob === job.id && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle className="text-green-500 mt-1" size={14} />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Responsibilities:</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle className="text-blue-500 mt-1" size={14} />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold text-slate-900 mb-3">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, index) => (
                            <span key={index} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Application Form ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Apply Now
            </h2>
            <p className="text-lg text-slate-600">
              Ready to join our team? Fill out the application form below
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={applicationForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Position Applied For *
                  </label>
                  <select
                    required
                    value={applicationForm.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  required
                  value={applicationForm.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resume/CV *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleInputChange('resume', e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={applicationForm.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  rows={4}
                  placeholder="Tell us why you want to work at Samaadhan..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Portfolio/GitHub (Optional)
                </label>
                <input
                  type="url"
                  value={applicationForm.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  placeholder="https://github.com/yourusername or portfolio URL"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition inline-flex items-center gap-2"
                >
                  <Send size={16} />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Culture Section ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Culture
            </h2>
            <p className="text-lg text-slate-600">
              We're building more than just a company – we're creating a community of passionate people
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Collaborative Environment</h3>
              <p className="text-slate-600">
                We believe in open communication, shared knowledge, and working together to achieve common goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Growth Opportunities</h3>
              <p className="text-slate-600">
                Continuous learning, skill development, and career advancement opportunities for every team member.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Meaningful Impact</h3>
              <p className="text-slate-600">
                Every project you work on directly improves the lives of citizens and strengthens communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="py-16 bg-teal-500">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            We're always looking for talented people who share our mission. Send us your resume and let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-500 font-bold text-lg py-3 px-8 rounded-lg hover:bg-slate-100 transition inline-flex items-center justify-center gap-2">
              Send Your Resume
              <ExternalLink size={20} />
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold text-lg py-3 px-8 rounded-lg hover:bg-white hover:text-teal-500 transition">
              Contact HR Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
