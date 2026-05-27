import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Mail, Send, Github, Linkedin, Twitter, Facebook, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-slate-900 border border-emerald-500/20 p-8 md:p-12 mb-16">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join the KajKori community
              </h3>
              <p className="text-slate-300 max-w-md text-sm md:text-base leading-relaxed">
                Stay updated with the latest remote freelance opportunities, tips, and platform updates delivered straight to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer shadow-lg shadow-emerald-950/50"
                >
                  {subscribed ? (
                    "Subscribed!"
                  ) : (
                    <>
                      Subscribe <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-xs text-slate-500 mt-3 text-center sm:text-left">
                We value your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          
          {/* Decorative radial blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 translate-x-20 -translate-y-20" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-emerald-950/60 rounded-xl border border-emerald-500/20">
                <Briefcase className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-xl font-bold text-white">
                Kaj<span className="text-emerald-500">Kori</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A premium and secure freelance ecosystem designed to connect outstanding global talent with visionary businesses.
            </p>
          </div>

          {/* Marketplace links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/browse-tasks" className="hover:text-emerald-400 transition flex items-center gap-1 group">
                  Browse Jobs <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/add-task" className="hover:text-emerald-400 transition flex items-center gap-1 group">
                  Post a Project <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/my-tasks" className="hover:text-emerald-400 transition flex items-center gap-1 group">
                  Workspace <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Press & Media</a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">Security Help Center</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} KajKori Inc. Designed with premium aesthetics.
          </p>

          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white transition duration-200" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white transition duration-200" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white transition duration-200" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white transition duration-200" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
