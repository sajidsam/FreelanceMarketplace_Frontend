import { FaBriefcase, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      
      
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info*/}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaBriefcase className="text-emerald-500 text-2xl" />
            <h2 className="text-xl font-bold text-white">
              Kaj<span className="text-emerald-500">Kori</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            A trusted freelancing marketplace to post tasks, hire talent,
            and get work done efficiently.
          </p>
        </div>

        {/* Marketplace */}
        <div>
          <h3 className="text-white font-semibold mb-4">Marketplace</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">Browse Tasks</li>
            <li className="hover:text-emerald-400 cursor-pointer">Post a Task</li>
            <li className="hover:text-emerald-400 cursor-pointer">My Tasks</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">About Us</li>
            <li className="hover:text-emerald-400 cursor-pointer">Careers</li>
            <li className="hover:text-emerald-400 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-emerald-400 cursor-pointer">Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-sm text-slate-400">
            {new Date().getFullYear()} KajKori. All rights reserved.
          </p>

          <div className="flex gap-4 text-lg">
            <FaFacebook className="hover:text-emerald-400 cursor-pointer transition" />
            <FaTwitter className="hover:text-emerald-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-emerald-400 cursor-pointer transition" />
            <FaGithub className="hover:text-emerald-400 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
