import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, DollarSign, ListTodo, Layers, Eye, Send, CheckCircle, HelpCircle } from 'lucide-react';

const AddTask = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("dev");
  const [description, setDescription] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [duration, setDuration] = useState("1 week");
  const [skillsText, setSkillsText] = useState("");
  
  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("kajkori_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const categoryLabels = {
    dev: "Software & Dev",
    design: "UI/UX & Design",
    marketing: "Digital Marketing",
    data: "Data & Analytics"
  };

  const handlePostTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !minBudget || !maxBudget) return;

    setIsSubmitting(true);

    // Simulate database post delay
    setTimeout(() => {
      const skillsArray = skillsText
        ? skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : ['General', 'Freelance'];

      const newTask = {
        id: 'task_' + Date.now(),
        title: title.trim(),
        category: category,
        description: description.trim(),
        budget: `$${minBudget} - $${maxBudget}`,
        duration: duration,
        client: user ? user.name : 'Anonymous Client',
        clientRating: 5.0,
        skills: skillsArray,
        bids: 0,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingTasks = JSON.parse(localStorage.getItem('kajkori_tasks') || '[]');
      localStorage.setItem('kajkori_tasks', JSON.stringify([newTask, ...existingTasks]));

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form
      setTitle("");
      setDescription("");
      setMinBudget("");
      setMaxBudget("");
      setSkillsText("");
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/browse-tasks');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow glows */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-3xl -z-10 animate-glow" />
      <div className="absolute bottom-[10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-indigo-400/5 blur-3xl -z-10 animate-glow" />

      <div className="max-w-6xl mx-auto">
        {/* Banner Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Project Creator Studio
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create a New Task
          </h1>
          <p className="text-slate-500 mt-2">
            Provide details about your project to attract competitive bids from professional freelancers.
          </p>
        </div>

        {showSuccess ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-12 text-center shadow-xl shadow-slate-100/50 max-w-2xl mx-auto animate-float-medium">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Posted Successfully!</h2>
            <p className="text-slate-500 mb-6">
              Your task has been broadcast to our freelancer pool. Redirecting you to the task board...
            </p>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 animate-pulse rounded-full" style={{ width: '80%', transition: 'width 2s' }} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Section */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl shadow-slate-100/50">
              <form onSubmit={handlePostTask} className="space-y-6">
                
                {/* Task Title */}
                <div>
                  <label htmlFor="title" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    maxLength={70}
                    placeholder="e.g., Build a Mobile-Responsive Tailwind landing page"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium"
                  />
                </div>

                {/* Grid controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category select */}
                  <div>
                    <label htmlFor="category" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="dev">Software & Dev</option>
                        <option value="design">UI/UX & Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="data">Data & Analytics</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Timeline Duration */}
                  <div>
                    <label htmlFor="duration" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                      Timeline Duration
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="3 days">3 Days</option>
                        <option value="1 week">1 Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="1 month">1 Month</option>
                        <option value="3 months">3 Months+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budget parameters */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                    Project Budget Range (USD)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        min={10}
                        required
                        placeholder="Min Budget"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        min={Number(minBudget) || 10}
                        required
                        placeholder="Max Budget"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills needed */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="skills" className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                      Required Skills
                    </label>
                    <span className="text-[10px] text-slate-400">Comma-separated</span>
                  </div>
                  <input
                    type="text"
                    id="skills"
                    placeholder="e.g., React, CSS, Tailwind CSS, API Integration"
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium"
                  />
                </div>

                {/* Description details */}
                <div>
                  <label htmlFor="desc" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="desc"
                    required
                    rows={6}
                    placeholder="Detail the deliverables, technical guidelines, and developer expectations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-medium resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-650 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  {isSubmitting ? (
                    "Broadcasting Task..."
                  ) : (
                    <>
                      Publish Project <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Live Preview Side (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
                <Eye className="w-4 h-4" />
                Live Card Preview
              </div>

              {/* Mock Job Card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-xl shadow-slate-100/50 hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden group">
                
                {/* Decorative glow line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                    {categoryLabels[category]}
                  </span>
                  <div className="text-[11px] text-slate-400 font-semibold">
                    Posted by <span className="text-slate-700 font-bold">{user ? user.name : 'You'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 truncate">
                  {title || "Untiled Project Studio"}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-5">
                  {description || "Provide a detailed description of your tasks on the form on the left, and watch the card layout update in real time. Freelancers read this description before submitting bids."}
                </p>

                {/* Details list */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 mb-5">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Proposed Budget</span>
                    <span className="text-sm font-extrabold text-emerald-600">
                      {minBudget && maxBudget ? `$${minBudget} - $${maxBudget}` : "TBD"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Duration Time</span>
                    <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {duration}
                    </span>
                  </div>
                </div>

                {/* Skills tags preview */}
                <div className="mb-6">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">Required Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {skillsText ? (
                      skillsText.split(',').map((skill, index) => {
                        const trimmed = skill.trim();
                        if (!trimmed) return null;
                        return (
                          <span key={index} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                            {trimmed}
                          </span>
                        );
                      })
                    ) : (
                      <>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">React</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">Figma</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition duration-200 flex items-center justify-center gap-1 cursor-not-allowed"
                  disabled
                >
                  Apply & Place Bid <span className="text-[10px] text-slate-400">(Preview)</span>
                </button>
              </div>

              {/* Form guidelines card */}
              <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-2xl border border-indigo-100/50 p-5 mt-6">
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-500" /> Posting Guidelines
                </h4>
                <ul className="space-y-1.5 text-xs text-indigo-900/80 leading-relaxed list-disc list-inside">
                  <li>Be descriptive about key expectations.</li>
                  <li>Set realistic budget guidelines.</li>
                  <li>Highlight skills to match correct freelancers.</li>
                </ul>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AddTask;