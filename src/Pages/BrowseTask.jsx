import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Calendar, Users, DollarSign, Briefcase, Plus, Send, X, Star, CheckCircle } from 'lucide-react';

const BrowseTask = () => {
  const [searchParams] = useSearchParams();
  
  // Search parameters from URL
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const defaultTasks = [
    {
      id: 'task_1',
      title: 'Tailwind CSS Expert for Core UI Refactor',
      category: 'design',
      description: 'We need an expert to redesign our legacy SaaS dashboard using Tailwind CSS. The layout must support light/dark modes and contain custom micro-animations.',
      budget: '$500 - $800',
      minVal: 500,
      duration: '1 week',
      client: 'Apex Analytics',
      clientRating: 4.9,
      skills: ['Tailwind CSS', 'Figma', 'React', 'CSS Transitions'],
      bids: 11,
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: 'task_2',
      title: 'Node.js REST API with Express and MongoDB',
      category: 'dev',
      description: 'Looking for a backend engineer to design a highly scalable microservice API. Needs JWT auth, file upload features, and integration with AWS S3.',
      budget: '$1,200 - $1,800',
      minVal: 1200,
      duration: '3 weeks',
      client: 'EtherFlow',
      clientRating: 4.8,
      skills: ['Node.js', 'Express', 'MongoDB', 'JWT', 'AWS S3'],
      bids: 6,
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
      id: 'task_3',
      title: 'Google Ads & Retargeting Specialist',
      category: 'marketing',
      description: 'We need an experienced digital marketer to optimize our search and display campaigns. Must show previous portfolios demonstrating a 3x+ ROAS.',
      budget: '$600 - $900',
      minVal: 600,
      duration: '2 weeks',
      client: 'Lumina Shop',
      clientRating: 5.0,
      skills: ['Google Ads', 'Retargeting', 'Copywriting', 'Analytics'],
      bids: 15,
      createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
    },
    {
      id: 'task_4',
      title: 'Automated Financial Data Scraping Pipeline',
      category: 'data',
      description: 'Build a Python scraping script that pulls stock market metrics hourly and writes them to a PostgreSQL instance. Needs clean documentation.',
      budget: '$400 - $700',
      minVal: 400,
      duration: '5 days',
      client: 'Quantum Capital',
      clientRating: 4.7,
      skills: ['Python', 'BeautifulSoup', 'PostgreSQL', 'Cron jobs'],
      bids: 19,
      createdAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
    }
  ];

  // Core state
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxBudgetFilter, setMaxBudgetFilter] = useState(5000);
  
  // Bidding modal state
  const [selectedTask, setSelectedTask] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [proposal, setProposal] = useState("");
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [isBiddingSubmit, setIsBiddingSubmit] = useState(false);

  // Initialize and load tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem('kajkori_tasks');
    if (!storedTasks) {
      localStorage.setItem('kajkori_tasks', JSON.stringify(defaultTasks));
      setTasks(defaultTasks);
    } else {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Sync category and search query when URL searchParams update
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  const categoryLabels = {
    all: "All Fields",
    dev: "Software & Dev",
    design: "UI/UX & Design",
    marketing: "Digital Marketing",
    data: "Data & Analytics"
  };

  const handleOpenBidModal = (task) => {
    setSelectedTask(task);
    setBidAmount("");
    setDeliveryDays("");
    setProposal("");
    setBidSubmitted(false);
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    if (!bidAmount || !deliveryDays || !proposal.trim()) return;

    setIsBiddingSubmit(true);

    // Simulate bid submission server response
    setTimeout(() => {
      const storedTasks = JSON.parse(localStorage.getItem('kajkori_tasks') || '[]');
      const updatedTasks = storedTasks.map(t => {
        if (t.id === selectedTask.id) {
          return { ...t, bids: (t.bids || 0) + 1 };
        }
        return t;
      });

      // Save updated tasks list
      localStorage.setItem('kajkori_tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);

      // Save this bid to freelancer's workspace registry
      const existingBids = JSON.parse(localStorage.getItem('kajkori_my_bids') || '[]');
      const newBid = {
        bidId: 'bid_' + Date.now(),
        taskId: selectedTask.id,
        taskTitle: selectedTask.title,
        taskCategory: selectedTask.category,
        budget: selectedTask.budget,
        bidAmount: `$${bidAmount}`,
        deliveryDays: deliveryDays,
        proposal: proposal.trim(),
        status: 'Pending Approval',
        clientName: selectedTask.client,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('kajkori_my_bids', JSON.stringify([newBid, ...existingBids]));

      setIsBiddingSubmit(false);
      setBidSubmitted(true);
      
      // Auto close after success
      setTimeout(() => {
        setSelectedTask(null);
      }, 1500);
    }, 1200);
  };

  // Filter Tasks dynamically
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;

    // Parse max budget from task string for filter (e.g., "$500 - $800" -> 800)
    let taskMaxVal = 1000;
    if (task.budget) {
      const parts = task.budget.replace(/[\$,]/g, '').split('-');
      if (parts.length > 1) {
        taskMaxVal = parseInt(parts[1].trim(), 10);
      } else {
        taskMaxVal = parseInt(parts[0].trim(), 10);
      }
    }
    const matchesBudget = taskMaxVal <= maxBudgetFilter;

    return matchesSearch && matchesCategory && matchesBudget;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Glow elements */}
      <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-emerald-400/5 blur-3xl -z-10 animate-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/5 blur-3xl -z-10 animate-glow" />

      <div className="max-w-7xl mx-auto">
        
        {/* Banner */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse Active Tasks
            </h1>
            <p className="text-slate-500 mt-1">
              Explore freelance jobs, bid with custom pricing, and secure your next assignment.
            </p>
          </div>
          
          {/* Quick Stats counter */}
          <div className="flex gap-4 p-2 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
            <div className="px-4 py-2 text-center">
              <span className="text-sm font-extrabold text-emerald-600 block">{filteredTasks.length}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Matched Tasks</span>
            </div>
            <span className="w-px bg-slate-200" />
            <div className="px-4 py-2 text-center">
              <span className="text-sm font-extrabold text-slate-800 block">
                {tasks.reduce((acc, curr) => acc + (curr.bids || 0), 0)}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Proposals</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left panel: Filters (Sticky) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-xl shadow-slate-100/50">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5 pb-3 border-b border-slate-100">
                <Filter className="w-4 h-4 text-emerald-500" /> Search Filters
              </h2>

              {/* Keyword Search */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Keyword Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search titles, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Category selector buttons */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Category</label>
                <div className="flex flex-col gap-1.5">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === key
                          ? "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-600 pl-4"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase">Max Budget</label>
                  <span className="text-xs font-bold text-emerald-600">${maxBudgetFilter}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={maxBudgetFilter}
                  onChange={(e) => setMaxBudgetFilter(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                  <span>$200</span>
                  <span>$5,000</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right panel: Task listings */}
          <div className="lg:col-span-3 space-y-6">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-xl shadow-slate-100/50">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Tasks Matched</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Try adjusting your search criteria, widening your budget filter, or resetting the category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 border-t-2 hover:border-t-emerald-500 relative"
                  >
                    <div>
                      {/* Badge header */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                          {categoryLabels[task.category] || task.category}
                        </span>
                        
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span className="font-bold text-xs">{task.clientRating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-1 hover:text-emerald-600 transition-colors">
                        {task.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                        {task.description}
                      </p>

                      {/* Details row */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 text-xs">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Estimated Budget</span>
                          <span className="font-extrabold text-emerald-600">{task.budget}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Timeline Duration</span>
                          <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" /> {task.duration}
                          </span>
                        </div>
                      </div>

                      {/* Required skills tags */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-1">
                          {task.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-medium transition cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer buttons info */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{task.bids || 0} proposals</span>
                      </div>
                      
                      <button
                        onClick={() => handleOpenBidModal(task)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition duration-200 flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Interactive bidding popup modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 md:p-8 w-full max-w-lg relative animate-scale-up">
            
            <button
              onClick={() => setSelectedTask(null)}
              className="p-1 rounded-lg hover:bg-slate-100 absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {bidSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Proposal Submitted!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your bid has been successfully saved to your workspace registry. The client will be notified.
                </p>
              </div>
            ) : (
              <>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Place Proposal Bid</span>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug mt-1 mb-2">
                  {selectedTask.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                  <span>Client: <span className="font-bold text-slate-800">{selectedTask.client}</span></span>
                  <span className="h-3 w-px bg-slate-200" />
                  <span>Client Budget: <span className="font-bold text-emerald-600">{selectedTask.budget}</span></span>
                </div>

                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Bid rate */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Your Bid Rate (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          required
                          min={10}
                          placeholder="e.g., 650"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-850 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-semibold"
                        />
                      </div>
                    </div>

                    {/* Delivery timeline */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Delivery Time</label>
                      <select
                        required
                        value={deliveryDays}
                        onChange={(e) => setDeliveryDays(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs appearance-none cursor-pointer"
                      >
                        <option value="">Select duration...</option>
                        <option value="1 day">1 Day</option>
                        <option value="3 days">3 Days</option>
                        <option value="1 week">1 Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="1 month">1 Month</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover letter */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Cover Letter Proposal</label>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="Explain briefly why you are the ideal talent for this task..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-850 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-semibold resize-none"
                    />
                  </div>

                  {/* Submit proposal */}
                  <button
                    type="submit"
                    disabled={isBiddingSubmit}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-98 cursor-pointer"
                  >
                    {isBiddingSubmit ? "Submitting Bid..." : "Submit Proposal"} <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default BrowseTask;