import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Mail, Lock, User, ShieldCheck, Sparkles, Star, Users } from 'lucide-react';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) return;

    setIsSubmitting(true);

    // Simulate server auth request delay
    setTimeout(() => {
      const userSession = {
        name: isSignUp ? name : email.split('@')[0],
        email: email,
        avatar: ""
      };

      // Set user session in localStorage
      localStorage.setItem("kajkori_user", JSON.stringify(userSession));
      
      // Dispatch an event to update Navbar state
      window.dispatchEvent(new Event("auth-change"));

      setIsSubmitting(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-3xl animate-glow" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-3xl animate-glow" style={{ animationDelay: '3s' }} />

      {/* Floating back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 backdrop-blur-md px-3.5 py-2 rounded-xl transition hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      {/* Auth Card wrapper */}
      <div className="w-full max-w-5xl bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[550px] backdrop-blur-xl">
        
        {/* Left Side: Marketing and Testimonial Panel */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-950/80 via-emerald-900/40 to-slate-900 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Abstract glows */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Briefcase className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Kaj<span className="text-emerald-400">Kori</span>
              </span>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" /> KajKori Professional Portal
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Join the elite ecosystem of builders and creators.
            </h2>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Post high-priority tasks, browse global developer proposals, and handle milestones with secure escrow payouts.
            </p>

            <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Vetted talent database
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Secure escrow payment protection
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Dedicated live task messaging dashboard
              </li>
            </ul>
          </div>

          {/* Micro testimonial */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 relative z-10">
            <div className="flex items-center gap-1.5 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed mb-3">
              "KajKori changed how we hire remote contractors. We posted a React task and had a vetted developer working within two hours."
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Marcus Thorne, CTO at EtherFlow
            </div>
          </div>

        </div>

        {/* Right Side: Interactive glassmorphic form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-950/20">
          
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {isSignUp ? "Register in seconds to start hiring or bidding." : "Enter your credentials to access your workspace."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="e.g., alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-xs font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-650 text-white font-bold text-xs transition duration-200 shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                "Processing Portal..."
              ) : (
                isSignUp ? "Register & Enter Dashboard" : "Sign In & Enter Dashboard"
              )}
            </button>
          </form>

          {/* Toggle link */}
          <div className="mt-8 text-center text-xs">
            <span className="text-slate-500">
              {isSignUp ? "Already have an account?" : "Don't have an account yet?"}
            </span>{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SignIn;
