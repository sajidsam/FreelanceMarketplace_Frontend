import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderKanban, CheckCircle2, AlertCircle, Clock, Star, ArrowUpRight, DollarSign, Users, Award, ShieldAlert } from 'lucide-react';

const MyTask = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('freelancer'); // 'freelancer' or 'client'
  const [myBids, setMyBids] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  // Load state from localStorage
  useEffect(() => {
    const checkState = () => {
      const storedUser = localStorage.getItem("kajkori_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }

      // Load client postings
      const storedTasks = JSON.parse(localStorage.getItem('kajkori_tasks') || '[]');
      setMyTasks(storedTasks);

      // Load freelancer bids
      const storedBids = JSON.parse(localStorage.getItem('kajkori_my_bids') || '[]');
      setMyBids(storedBids);
    };

    checkState();
    window.addEventListener("auth-change", checkState);
    return () => window.removeEventListener("auth-change", checkState);
  }, []);

  // Accept a bid action (Client view)
  const handleHireFreelancer = (taskId, bidderName) => {
    alert(`Successfully hired ${bidderName} for your project! Status updated to 'Working'.`);
    
    // Update local task state/localStorage
    const storedTasks = JSON.parse(localStorage.getItem('kajkori_tasks') || '[]');
    const updated = storedTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'In Progress', hiredFreelancer: bidderName };
      }
      return t;
    });
    localStorage.setItem('kajkori_tasks', JSON.stringify(updated));
    setMyTasks(updated);
  };

  // Reject/Decline task action (Client view)
  const handleCancelTask = (taskId) => {
    if (confirm("Are you sure you want to cancel and delete this task listing?")) {
      const storedTasks = JSON.parse(localStorage.getItem('kajkori_tasks') || '[]');
      const filtered = storedTasks.filter(t => t.id !== taskId);
      localStorage.setItem('kajkori_tasks', JSON.stringify(filtered));
      setMyTasks(filtered);
    }
  };

  // Mock bidders for Client postings
  const mockBidders = [
    { name: "Sarah Jenkins", rating: 4.9, bidAmount: "$550", delivery: "3 days", profile: "React specialist with 3 years experience." },
    { name: "David Chen", rating: 4.7, bidAmount: "$700", delivery: "5 days", profile: "Full stack developer. Clean backend APIs." },
    { name: "Elena Rostova", rating: 5.0, bidAmount: "$620", delivery: "4 days", profile: "Bespoke design systems and custom Tailwind layouts." }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Abstract Glowing shapes */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-emerald-400/5 blur-3xl -z-10 animate-glow" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-indigo-400/5 blur-3xl -z-10 animate-glow" />

      <div className="max-w-6xl mx-auto">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl shadow-slate-100/50 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200/60 text-emerald-700 flex items-center justify-center font-extrabold text-2xl shadow-sm">
              {user ? user.name[0].toUpperCase() : "G"}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {user ? user.name : "Welcome, Guest User!"}
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {user ? `Account: ${user.email}` : "Sign in to persist your customized workspace dashboards."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            {!user && (
              <Link
                to="/sign-up"
                className="w-full md:w-auto text-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:scale-[1.02] transition"
              >
                Sign In Now
              </Link>
            )}
          </div>
        </div>

        {/* Tab Controls Selector */}
        <div className="flex border-b border-slate-200 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('freelancer')}
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${
              activeTab === 'freelancer'
                ? "text-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Freelancer Dashboard ({myBids.length})
            {activeTab === 'freelancer' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />}
          </button>
          
          <button
            onClick={() => setActiveTab('client')}
            className={`pb-4 px-2 text-sm font-bold transition-all relative ${
              activeTab === 'client'
                ? "text-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Client Workspace ({myTasks.length})
            {activeTab === 'client' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />}
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'freelancer' ? (
          <div>
            {/* Freelancer Stats counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Active Bids</span>
                  <p className="text-2xl font-extrabold text-slate-800 mt-1">{myBids.length}</p>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <FolderKanban className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Simulated Earnings</span>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                    ${myBids.reduce((acc, curr) => {
                      if (curr.status === 'Hired' || curr.status === 'Approved') {
                        return acc + parseInt(curr.bidAmount.replace('$', ''), 10);
                      }
                      return acc;
                    }, 0)}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Success Score</span>
                  <p className="text-2xl font-extrabold text-amber-500 mt-1 flex items-center gap-1">
                    5.0 <Star className="w-4 h-4 fill-amber-500" />
                  </p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bids list */}
            <h2 className="text-base font-bold text-slate-900 mb-4 pl-1">My Submitted Proposals</h2>
            {myBids.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-xl shadow-slate-100/50">
                <FolderKanban className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Proposals</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                  You haven't bid on any tasks yet. Head over to the job directory to apply!
                </p>
                <Link
                  to="/browse-tasks"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition inline-block"
                >
                  Browse Task Directory
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Client Name</th>
                        <th className="px-6 py-4">My Bid rate</th>
                        <th className="px-6 py-4">Delivery</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {myBids.map((bid) => (
                        <tr key={bid.bidId} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-bold text-slate-800">{bid.taskTitle}</td>
                          <td className="px-6 py-4 font-medium text-slate-600">{bid.clientName}</td>
                          <td className="px-6 py-4 font-extrabold text-emerald-600">{bid.bidAmount}</td>
                          <td className="px-6 py-4 font-semibold text-slate-500">{bid.deliveryDays}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold">
                              <Clock className="w-3.5 h-3.5" /> {bid.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Client Stats counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Posted Tasks</span>
                  <p className="text-2xl font-extrabold text-slate-800 mt-1">{myTasks.length}</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <FolderKanban className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bids Evaluated</span>
                  <p className="text-2xl font-extrabold text-indigo-600 mt-1">
                    {myTasks.reduce((acc, curr) => acc + (curr.bids || 0), 0)}
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Work Safely Escrowed</span>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                    $0
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Postings board list */}
            <div className="flex justify-between items-center mb-4 pl-1">
              <h2 className="text-base font-bold text-slate-900">My Job Directory Postings</h2>
              <Link
                to="/add-task"
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-white text-slate-700 font-semibold text-xs flex items-center gap-1 transition"
              >
                Post another task
              </Link>
            </div>

            {myTasks.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-xl shadow-slate-100/50">
                <FolderKanban className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Jobs Posted</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                  You haven't posted any tasks yet. Use our wizard studio to write a prompt and attract talent.
                </p>
                <Link
                  to="/add-task"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition inline-block"
                >
                  Create Your First Task
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {myTasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
                          <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                            {task.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Budget: <span className="text-emerald-600 font-bold">{task.budget}</span> | Duration: <span className="font-bold text-slate-600">{task.duration}</span></p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCancelTask(task.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition cursor-pointer"
                        >
                          Cancel Listing
                        </button>
                      </div>
                    </div>

                    {/* Review applicants list */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Applicants Evaluation Panel ({task.bids > 0 ? 3 : 0})</h4>
                      
                      {task.bids > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {mockBidders.map((bidder) => (
                            <div key={bidder.name} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center gap-2 mb-2">
                                  <span className="font-bold text-slate-800 text-xs">{bidder.name}</span>
                                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                                    <Star className="w-3 h-3 fill-amber-500" /> {bidder.rating}
                                  </div>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{bidder.profile}</p>
                              </div>
                              
                              <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between gap-2 mt-2">
                                <div>
                                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Price proposal</span>
                                  <span className="text-xs font-bold text-emerald-600">{bidder.bidAmount}</span>
                                </div>
                                <button
                                  onClick={() => handleHireFreelancer(task.id, bidder.name)}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
                                >
                                  Hire Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No proposals received on this task yet. Broadcast complete, waiting for responses...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTask;