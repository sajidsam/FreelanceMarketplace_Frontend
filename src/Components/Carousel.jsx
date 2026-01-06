import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Circle, CheckCircle, Users, Briefcase, Code, Palette, Megaphone, BarChart, Globe, Shield } from 'lucide-react';

const Carousel = () => {
    // Freelance marketplace images (temporary)
    const carouselImages = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Team Collaboration',
            description: 'Freelancers collaborating on projects remotely',
            icon: <Users className="w-6 h-6" />
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Project Management',
            description: 'Managing freelance projects efficiently',
            icon: <Briefcase className="w-6 h-6" />
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Development Work',
            description: 'Software development and coding projects',
            icon: <Code className="w-6 h-6" />
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Design Projects',
            description: 'Creative design and UI/UX freelance work',
            icon: <Palette className="w-6 h-6" />
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Marketing Services',
            description: 'Digital marketing and advertising freelancers',
            icon: <Megaphone className="w-6 h-6" />
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Data Analysis',
            description: 'Analytics and data science freelance experts',
            icon: <BarChart className="w-6 h-6" />
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Handle next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    };

    // Handle previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    };

    // Handle touch swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        }

        if (isRightSwipe) {
            prevSlide();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, currentSlide]);

    // Marketplace features
    const marketplaceFeatures = [
        { icon: <Users className="w-5 h-5" />, text: "Connect with skilled freelancers" },
        { icon: <Shield className="w-5 h-5" />, text: "Secure payment protection" },
        { icon: <Globe className="w-5 h-5" />, text: "Global talent pool" },
        { icon: <CheckCircle className="w-5 h-5" />, text: "Verified professionals" },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Freelance Marketplace
                    </h1>
                    <p className="text-gray-600 mb-6 max-w-2xl">
                        Discover top talent for your projects or showcase your skills to clients worldwide.
                        Our platform connects businesses with vetted freelancers across all industries.
                    </p>

                    {/* Marketplace Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {marketplaceFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-blue-600">{feature.icon}</div>
                                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Featured Projects</h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                        aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
                                    >
                                        {isAutoPlaying ? (
                                            <Pause className="w-5 h-5 text-gray-700" />
                                        ) : (
                                            <Play className="w-5 h-5 text-gray-700" />
                                        )}
                                    </button>
                                    <div className="text-sm text-gray-600">
                                        Slide {currentSlide + 1} of {carouselImages.length}
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Container */}
                            <div className="relative overflow-hidden rounded-xl">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {carouselImages.map((image) => (
                                        <div key={image.id} className="min-w-full relative">
                                            <div className="h-80 md:h-96 overflow-hidden rounded-xl">
                                                <img
                                                    src={image.url}
                                                    alt={image.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                                        {image.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold">{image.title}</h3>
                                                        <p className="text-white/90">{image.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-800" />
                                </button>
                            </div>

                            {/* Indicators */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {carouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className="p-1"
                                        aria-label={`Go to slide ${index + 1}`}
                                    >
                                        {index === currentSlide ? (
                                            <CheckCircle className="w-6 h-6 text-blue-600" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: "Post a Project", desc: "Describe your needs and budget" },
                                    { step: 2, title: "Review Proposals", desc: "Compare freelancer bids and portfolios" },
                                    { step: 3, title: "Hire the Best", desc: "Select and start working with your chosen freelancer" },
                                    { step: 4, title: "Pay Securely", desc: "Release payment when work is completed" },
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start space-x-3">
                                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                            <p className="mb-6 opacity-90">
                                Join thousands of businesses and freelancers already using our marketplace.
                            </p>
                            <div className="space-y-3">
                                <button className="w-full bg-white text-blue-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    Post a Project
                                </button>
                                <button className="w-full bg-transparent border-2 border-white text-white font-bold py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                                    Become a Freelancer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;