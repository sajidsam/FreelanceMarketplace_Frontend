import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Sparkles, Code, Palette, Megaphone, BarChart, ShieldCheck, Zap, Star, Users, CheckCircle, TrendingUp, ArrowRight, Clock, Briefcase, Award, Quote } from 'lucide-react';
import Carousel from '../Components/Carousel';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredTasks, setFeaturedTasks] = useState([]);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse-tasks?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/browse-tasks');
    }
  };

  // Load and sort featured tasks by deadline (most recent first)
  useEffect(() => {
    const storedTasks = localStorage.getItem('kajkori_tasks');
    if (storedTasks) {
      const allTasks = JSON.parse(storedTasks);
      const sorted = allTasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setFeaturedTasks(sorted);
    }
  }, []);

  const categories = [
    { id: 'dev', name: 'Software & Dev', count: '1,240 Tasks', icon: <Code className="w-6 h-6 text-emerald-500" />, bg: 'from-emerald-500/5 to-teal-500/5', border: 'hover:border-emerald-500/40' },
    { id: 'design', name: 'UI/UX & Design', count: '850 Tasks', icon: <Palette className="w-6 h-6 text-indigo-500" />, bg: 'from-indigo-500/5 to-purple-500/5', border: 'hover:border-indigo-500/40' },
    { id: 'marketing', name: 'Digital Marketing', count: '620 Tasks', icon: <Megaphone className="w-6 h-6 text-rose-500" />, bg: 'from-rose-500/5 to-orange-500/5', border: 'hover:border-rose-500/40' },
    { id: 'data', name: 'Data & Analytics', count: '410 Tasks', icon: <BarChart className="w-6 h-6 text-blue-500" />, bg: 'from-blue-500/5 to-cyan-500/5', border: 'hover:border-blue-500/40' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/10 blur-3xl -z-10 animate-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/10 blur-3xl -z-10 animate-glow" style={{ animationDelay: '3s' }} />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-6 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering the Future of Remote Work
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1] mb-6">
            Find elite talent. Build your projects <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">effortlessly.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            KajKori is a premium freelance marketplace that connects skilled builders with visionary businesses. Post a task in minutes and receive competitive bids.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-white shadow-xl shadow-slate-100 border border-slate-100 backdrop-blur-md">
              <div className="relative flex-grow flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="What task do you need completed today? (e.g., React Dev, UI Redesign)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 bg-transparent outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-100 hover:shadow-emerald-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                Search Tasks
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500">
              <span>Popular searches:</span>
              {['React', 'Logo Design', 'SEO', 'Data Scraping'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate(`/browse-tasks?search=${encodeURIComponent(tag)}`);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-6 border-t border-slate-200/60">
            {[
              { val: "$2.4M+", label: "Total Earnings" },
              { val: "48K+", label: "Completed Projects" },
              { val: "99.4%", label: "Job Success Rate" },
              { val: "15 Min", label: "Avg. Hiring Time" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 bg-gradient-to-r from-slate-950 to-slate-750 bg-clip-text text-transparent">{stat.val}</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-16 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Top Services
              </h2>
              <p className="text-slate-500 mt-2">
                Browse our active database of jobs across trending specialized industries.
              </p>
            </div>
            <Link
              to="/browse-tasks"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              See all categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/browse-tasks?category=${cat.id}`)}
                className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/20 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-400/40 group"
              >
                <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-emerald-100/90 font-medium">
                  {cat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tasks Section - Sorted by Deadline */}
      <section className="py-16 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Tasks by Deadline
              </h2>
              <p className="text-slate-500 mt-2">
                Discover the most urgent projects posted by our clients. Tasks sorted by deadline.
              </p>
            </div>
            <Link
              to="/browse-tasks"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              View all tasks &rarr;
            </Link>
          </div>

          {featuredTasks.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-12 text-center">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No tasks available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/60 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/50 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                      {task.category === 'dev' ? 'Software & Dev' :
                       task.category === 'design' ? 'UI/UX & Design' :
                       task.category === 'marketing' ? 'Digital Marketing' : 'Data & Analytics'}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="text-xs font-bold">{task.clientRating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 leading-snug">
                    {task.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-100/50 rounded-lg mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Budget</span>
                      <span className="font-bold text-emerald-600">{task.budget}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Duration</span>
                      <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {task.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {task.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded bg-slate-200/60 text-slate-700 text-[10px] font-medium">
                          {skill}
                        </span>
                      ))}
                      {task.skills.length > 3 && (
                        <span className="px-2 py-1 rounded bg-slate-200/60 text-slate-600 text-[10px] font-medium">
                          +{task.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5" />
                      <span>{task.bids || 0} proposals</span>
                    </div>
                    <Link
                      to="/browse-tasks"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all active:scale-95"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-16 bg-slate-900 text-white rounded-t-[2.5rem] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Why work on KajKori?
            </h2>
            <p className="text-slate-400">
              We provide a safe, high-speed, and seamless ecosystem for project completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
                title: "Escrow Payment Protection",
                desc: "Funds are locked safely in escrow. Release payments to your freelancer only after you review and approve the submitted work."
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-400" />,
                title: "Instant Collaboration",
                desc: "Chat, assign milestones, and review source files directly in our unified dashboard. Keep work files organized in one place."
              },
              {
                icon: <Users className="w-8 h-8 text-sky-400" />,
                title: "Vetted Tech Experts",
                desc: "Check ratings, verified portfolios, and client testimonials before hiring. Sleep easy knowing your project is in elite hands."
              }
            ].map((feat, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-2xl relative group hover:border-emerald-500/20 transition-all duration-300">
                <div className="mb-4">{feat.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-100">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action Banner Split */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-emerald-900/20 border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">For Clients</span>
                <h3 className="text-2xl md:text-3xl font-extrabold mt-3 mb-4 text-white">Find the perfect expert for your task</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Tell us what you need done. Get competitive offers from top designers, software developers, writers, and marketers in minutes.
                </p>
              </div>
              <Link
                to="/add-task"
                className="w-fit px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center gap-1.5 hover:translate-x-1"
              >
                Post a Project Now &rarr;
              </Link>
            </div>

            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-950/60 to-slate-800/20 border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">For Freelancers</span>
                <h3 className="text-2xl md:text-3xl font-extrabold mt-3 mb-4 text-white">Earn money doing what you love</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Build your professional profile, browse high-paying tasks, bid with custom proposals, and enjoy guaranteed payment protections.
                </p>
              </div>
              <Link
                to="/browse-tasks"
                className="w-fit px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-1.5 hover:translate-x-1"
              >
                Find Freelance Work &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How KajKori Works
            </h2>
            <p className="text-lg text-slate-600">
              Get your projects done in 4 simple steps. Whether you're hiring or freelancing, our platform makes collaboration seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                step: 1,
                title: "Post Your Task",
                desc: "Describe your project, set budget & timeline. It takes just 5 minutes to get started.",
                icon: <Briefcase className="w-6 h-6" />
              },
              {
                step: 2,
                title: "Receive Proposals",
                desc: "Get bids from vetted professionals. Review portfolios, ratings & past client reviews.",
                icon: <Users className="w-6 h-6" />
              },
              {
                step: 3,
                title: "Collaborate & Work",
                desc: "Chat with freelancers, share files, and track progress in our unified dashboard.",
                icon: <Zap className="w-6 h-6" />
              },
              {
                step: 4,
                title: "Release Payment",
                desc: "Release funds safely via escrow after approving the completed work. Dispute resolution included.",
                icon: <CheckCircle className="w-6 h-6" />
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 h-full flex flex-col text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 mx-auto">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {item.desc}
                  </p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Real results from real people. See how KajKori users are achieving their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I posted my design project and got 12 proposals within hours. The quality was exceptional and I saved 40% compared to traditional agencies.",
                author: "Sarah Chen",
                role: "Startup Founder",
                company: "TechVenture Labs",
                rating: 5,
                type: "Client"
              },
              {
                quote: "KajKori changed my freelance career. I've earned $45,000 in 6 months working on diverse projects. The payment protection gives me peace of mind.",
                author: "Marcus Johnson",
                role: "Full-Stack Developer",
                company: "Independent Freelancer",
                rating: 5,
                type: "Freelancer"
              },
              {
                quote: "The escrow system is brilliant. I hired a React expert for my web app and knew my money was safe. The final product exceeded expectations.",
                author: "Emma Wilson",
                role: "Product Manager",
                company: "Digital Solutions Inc",
                rating: 5,
                type: "Client"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex gap-2 mb-4">
                  <Quote className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                </div>

                <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.company}</p>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                      {testimonial.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel />
      </section>

    </div>
  );
};

export default Home;
