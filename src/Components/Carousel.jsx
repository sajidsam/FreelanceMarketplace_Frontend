import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Landmark, Calendar, Users, Heart, Star, Sparkles } from 'lucide-react';

const Carousel = () => {
    // Premium Mock Gigs/Tasks for Carousel
    const featuredTasks = [
        {
            id: 1,
            title: 'Modern SaaS Dashboard UI/UX Design',
            category: 'UI/UX & Design',
            budget: '$850 - $1,200',
            duration: '2 weeks',
            client: 'Veloce Studio',
            clientRating: 4.9,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            skills: ['Figma', 'SaaS', 'Design System', 'Wireframing'],
            bids: 14
        },
        {
            id: 2,
            title: 'React / Next.js Developer for Web3 Platform',
            category: 'Software & Dev',
            budget: '$2,500 - $4,000',
            duration: '1 month',
            client: 'EtherFlow',
            clientRating: 4.8,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            skills: ['Next.js', 'Tailwind', 'Ethers.js', 'TypeScript'],
            bids: 9
        },
        {
            id: 3,
            title: 'Growth Marketing Campaign for AI Mobile App',
            category: 'Digital Marketing',
            budget: '$1,500 - $2,000',
            duration: '3 weeks',
            client: 'Optima AI',
            clientRating: 5.0,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            skills: ['Google Ads', 'SEO', 'Copywriting', 'Analytics'],
            bids: 22
        },
        {
            id: 4,
            title: 'Python Scripts for Automated Financial Data Scraping',
            category: 'Data & Analytics',
            budget: '$600 - $800',
            duration: '5 days',
            client: 'Quantum Capital',
            clientRating: 4.7,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            skills: ['Python', 'Pandas', 'Scrapy', 'CSV'],
            bids: 18
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === featuredTasks.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredTasks.length - 1 : prev - 1));
    };

    // Auto-play loop
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 4500);
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentSlide]);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl shadow-slate-100/50">
            {/* Header section inside widget */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                    <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                        Featured High-Value Jobs
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Trending Client Postings
                    </h2>
                </div>
                
                {/* Control switches */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                    >
                        {isAutoPlaying ? (
                            <>
                                <Pause className="w-3.5 h-3.5 text-slate-500" /> Autoplay ON
                            </>
                        ) : (
                            <>
                                <Play className="w-3.5 h-3.5 text-slate-500" /> Autoplay OFF
                            </>
                        )}
                    </button>
                    
                    <div className="flex gap-1">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                            aria-label="Prev job"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                            aria-label="Next job"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider window */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {featuredTasks.map((task) => (
                        <div key={task.id} className="min-w-full p-4 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
                            {/* Graphic Side */}
                            <div className="lg:w-2/5 relative rounded-xl overflow-hidden min-h-[220px] md:min-h-[280px]">
                                <img
                                    src={task.image}
                                    alt={task.title}
                                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                                
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-xs font-semibold">
                                        <Users className="w-3.5 h-3.5" />
                                        {task.bids} Bids Received
                                    </div>
                                    <div className="flex items-center gap-1 bg-emerald-500 px-2.5 py-1 rounded-md text-xs font-bold shadow-lg shadow-emerald-950/30">
                                        Active
                                    </div>
                                </div>
                            </div>

                            {/* Job Details Side */}
                            <div className="lg:w-3/5 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                                            {task.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                            <span className="text-slate-800 font-bold">{task.client}</span>
                                            <span className="h-3 w-px bg-slate-200" />
                                            <div className="flex items-center gap-0.5 text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-amber-500" />
                                                <span className="font-bold text-xs">{task.clientRating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight leading-tight hover:text-emerald-600 transition-colors mb-4">
                                        {task.title}
                                    </h3>

                                    {/* Financial details row */}
                                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-200/60 mb-6">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Budget</span>
                                            <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{task.budget}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Project Timeline</span>
                                            <p className="text-lg font-extrabold text-slate-800 mt-0.5 flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-slate-500" /> {task.duration}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tech skills tags */}
                                    <div>
                                        <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Required Skills</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {task.skills.map((skill) => (
                                                <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-200/50 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200/60">
                                    <a
                                        href="/browse-tasks"
                                        className="flex-grow py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                                    >
                                        View Details
                                    </a>
                                    <a
                                        href="/browse-tasks"
                                        className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-1.5 active:scale-95"
                                    >
                                        Place Instant Bid
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider dots indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {featuredTasks.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === currentSlide 
                                ? "w-8 bg-emerald-600 shadow-sm" 
                                : "w-2.5 bg-slate-200 hover:bg-slate-350"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;