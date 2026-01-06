import { Link, NavLink } from "react-router-dom";
import { FaBriefcase, FaUserCircle } from "react-icons/fa";

const navClass = ({ isActive }) => {
  return isActive
    ? "text-emerald-500 font-semibold cursor-pointer transition"
    : "text-slate-600 hover:text-emerald-500 cursor-pointer transition";
};

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link to='/'>
         <div className="flex items-center gap-2">
        <FaBriefcase className="text-emerald-500 text-2xl" />
        <span className="text-xl font-bold text-slate-900">
          Kaj<span className="text-emerald-500">Kori</span>
        </span>
      </div>

      </Link>
   
      {/* Navigation */}
      <ul className="flex gap-8 font-medium">
        <li>
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-task" className={navClass}>
            Add Task
          </NavLink>
        </li>

        <li>
          <NavLink to="/browse-tasks" className={navClass}>
            Browse Tasks
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-tasks" className={navClass}>
            My Tasks
          </NavLink>
        </li>
      </ul>

      {/* Auth & Profile */}
      <div className="flex items-center gap-4">
        <button className="text-slate-600 hover:text-emerald-500 transition hidden">
          Login
        </button>

        <Link to='/sign-up'>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
          Sign Up
        </button>
        </Link>
        

        <FaUserCircle className="text-3xl text-slate-500 cursor-pointer hover:text-emerald-500 transition" />
      </div>
    </nav>
  );
};

export default Navbar;
