import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Briefcase, User, LogOut, Menu, X, PlusCircle, Search, Compass, FolderKanban, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("kajkori_theme") || "light");
  const navigate = useNavigate();

  // Load theme and configure document class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("kajkori_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Load user from localStorage on mount and periodically to keep in sync
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("kajkori_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Set up an event listener for custom auth events or storage changes
    window.addEventListener("storage", checkUser);
    window.addEventListener("auth-change", checkUser);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("auth-change", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kajkori_user");
    setUser(null);
    setIsDropdownOpen(false);
    // Dispatch auth-change event to other components
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const navClass = ({ isActive }) => {
    return `relative py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? "text-emerald-600 font-semibold"
        : "text-slate-600 dark:text-slate-350 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-y-[-1px]"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/55 transition-all duration-300 transform group-hover:rotate-6">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 dark:from-white dark:via-slate-200 dark:to-emerald-400 bg-clip-text text-transparent">
              Kaj<span className="text-emerald-600 dark:text-emerald-400">Kori</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              <li>
                <NavLink to="/" className={navClass}>
                  {({ isActive }) => (
                    <>
                      <Compass className="w-4 h-4" />
                      Home
                      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-task" className={navClass}>
                  {({ isActive }) => (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      Add Task
                      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/browse-tasks" className={navClass}>
                  {({ isActive }) => (
                    <>
                      <Search className="w-4 h-4" />
                      Browse Tasks
                      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-tasks" className={navClass}>
                  {({ isActive }) => (
                    <>
                      <FolderKanban className="w-4 h-4" />
                      My Workspace
                      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />}
                    </>
                  )}
                </NavLink>
              </li>
            </ul>

            {/* Separator line */}
            <span className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

            {/* User Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-650 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4.5 h-4.5" />
                ) : (
                  <Sun className="w-4.5 h-4.5 text-amber-400" />
                )}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-450 flex items-center justify-center font-bold text-sm">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-50 transition-all transform origin-top-right">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/my-tasks"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                      >
                        <FolderKanban className="w-4 h-4" />
                        My Workspace
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition px-3 py-1.5"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme Mobile"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {user && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              <Compass className="w-5 h-5 text-slate-400" />
              Explore Home
            </NavLink>
            <NavLink
              to="/add-task"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              <PlusCircle className="w-5 h-5 text-slate-400" />
              Post a Task
            </NavLink>
            <NavLink
              to="/browse-tasks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              <Search className="w-5 h-5 text-slate-400" />
              Browse Tasks
            </NavLink>
            <NavLink
              to="/my-tasks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              <FolderKanban className="w-5 h-5 text-slate-400" />
              My Workspace
            </NavLink>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-700 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-base font-medium hover:bg-emerald-700 shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
