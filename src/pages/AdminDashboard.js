import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Users, DollarSign, CheckCircle, Clock, XCircle, ArrowLeft,
  UserPlus, Trash2, BarChart3, Shield, LogOut, Loader2, Search
} from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

export default function AdminDashboard() {
  const { user, authAxios, logout, isAdmin } = useAuth();
  const { playClick, playSuccess } = useSound();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({ email: '', password: '', name: '', role: 'coordinator' });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [s, r, u, l] = await Promise.all([
        authAxios.get('/stats/dashboard'),
        authAxios.get('/registrations'),
        authAxios.get('/auth/users'),
        authAxios.get('/leaderboard'),
      ]);
      setStats(s.data);
      setRegistrations(r.data);
      setUsers(u.data);
      setLeaderboard(l.data);
    } catch {}
  }, [authAxios]);

  useEffect(() => {
    if (!isAdmin) { navigate('/login'); return; }
    fetchData();
  }, [isAdmin, navigate, fetchData]);

  const handleApprove = async (id, status) => {
    playClick();
    await authAxios.post('/registrations/approve', { registration_id: id, status });
    playSuccess();
    fetchData();
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAxios.post('/auth/register-coordinator', newUser);
      playSuccess();
      setNewUser({ email: '', password: '', name: '', role: 'coordinator' });
      fetchData();
    } catch {}
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    playClick();
    await authAxios.delete(`/auth/users/${id}`);
    fetchData();
  };

  const filteredRegs = registrations.filter(r =>
    r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'users', label: 'Users', icon: Shield },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="admin-dashboard">
      {/* Header */}
      <div className="border-b border-white/[0.05] bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-white/30 hover:text-white/60" data-testid="admin-back"><ArrowLeft size={18} /></button>
            <div>
              <h1 className="font-heading text-sm md:text-base tracking-wider text-white">ADMIN CONSOLE</h1>
              <p className="font-mono text-[10px] text-cyan-400/50">{user?.name}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} data-testid="admin-logout" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 text-xs font-body transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2" data-testid="admin-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); playClick(); }}
              data-testid={`admin-tab-${t.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-xs tracking-wide whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' : 'text-white/30 hover:text-white/60 border border-transparent'
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: 'Total', value: stats.total_registrations, icon: Users, iconClass: 'text-cyan-400/50' },
                { label: 'Approved', value: stats.approved, icon: CheckCircle, iconClass: 'text-green-400/50' },
                { label: 'Pending', value: stats.pending, icon: Clock, iconClass: 'text-yellow-400/50' },
                { label: 'Rejected', value: stats.rejected, icon: XCircle, iconClass: 'text-red-400/50' },
                { label: 'Revenue', value: `₹${stats.total_revenue?.toLocaleString()}`, icon: DollarSign, iconClass: 'text-purple-400/50' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all" data-testid={`stat-${s.label.toLowerCase()}`}>
                  <s.icon size={16} className={`${s.iconClass} mb-2`} />
                  <p className="font-heading text-xl md:text-2xl text-white">{s.value}</p>
                  <p className="font-body text-[10px] text-white/30 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Registrations */}
        {tab === 'registrations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <Input
                data-testid="admin-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search registrations..."
                className="pl-10 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10"
              />
            </div>
            <p className="text-white/20 text-[10px] font-mono mb-2 md:hidden">← Scroll horizontally to see all columns →</p>
            <div className="overflow-x-auto rounded-xl border border-white/[0.06] -mx-4 sm:mx-0">
              <table className="w-full min-w-[700px]" data-testid="admin-registrations-table">
                <thead>
                  <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                    {['Name', 'Email', 'College', 'Dept', 'Payment', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRegs.map(r => (
                    <tr key={r.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-body text-sm text-white/80">{r.full_name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white/40">{r.email}</td>
                      <td className="px-4 py-3 font-body text-xs text-white/40">{r.college}</td>
                      <td className="px-4 py-3 font-mono text-xs text-cyan-400/60">{r.department || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${r.payment_status === 'paid' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                          {r.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${
                          r.approval_status === 'approved' ? 'bg-green-400/10 text-green-400' :
                          r.approval_status === 'rejected' ? 'bg-red-400/10 text-red-400' :
                          'bg-yellow-400/10 text-yellow-400'
                        }`}>{r.approval_status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {r.approval_status === 'pending' && (
                          <div className="flex gap-1">
                            <button onClick={() => handleApprove(r.id, 'approved')} data-testid={`approve-${r.id}`} className="px-2 py-1 rounded text-[10px] font-mono bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-colors">Approve</button>
                            <button onClick={() => handleApprove(r.id, 'rejected')} data-testid={`reject-${r.id}`} className="px-2 py-1 rounded text-[10px] font-mono bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors">Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegs.length === 0 && (
                <p className="text-center py-8 font-body text-sm text-white/20">No registrations found</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Users Management */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <form onSubmit={handleAddUser} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4" data-testid="add-user-form">
              <h3 className="font-heading text-sm text-white/60 tracking-wider flex items-center gap-2"><UserPlus size={16} /> Add Coordinator</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="Name" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="new-user-name" required />
                <Input value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} placeholder="Email" type="email" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="new-user-email" required />
                <Input value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} placeholder="Password" type="password" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="new-user-password" required />
                <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.06] text-white font-body text-sm" data-testid="new-user-role">
                  <option value="coordinator" className="bg-[#0a0a0a]">Coordinator</option>
                  <option value="admin" className="bg-[#0a0a0a]">Admin</option>
                </select>
              </div>
              <button type="submit" disabled={loading} data-testid="add-user-btn" className="px-4 py-2 rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 text-xs font-body transition-colors flex items-center gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Add User
              </button>
            </form>

            <div className="space-y-2">
              {users.map(u => (
                <div key={u.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]" data-testid={`user-${u.id}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${u.role === 'admin' ? 'bg-purple-400/10' : 'bg-cyan-400/10'}`}>
                      <Shield size={14} className={u.role === 'admin' ? 'text-purple-400' : 'text-cyan-400'} />
                    </div>
                    <div>
                      <p className="font-body text-sm text-white/80">{u.name}</p>
                      <p className="font-mono text-[10px] text-white/30">{u.email} &bull; {u.role}</p>
                    </div>
                  </div>
                  {u.email !== 'admin@ekatva.in' && (
                    <button onClick={() => handleDeleteUser(u.id)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leaderboard */}
        {tab === 'leaderboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-2">
              {leaderboard.map((dept, i) => (
                <div key={dept.department} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all" data-testid={`lb-${dept.department}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading text-sm ${
                    i === 0 ? 'bg-yellow-400/20 text-yellow-400' : i === 1 ? 'bg-gray-300/20 text-gray-300' : i === 2 ? 'bg-amber-600/20 text-amber-600' : 'bg-white/5 text-white/30'
                  }`}>#{i + 1}</div>
                  <div className="flex-1">
                    <p className="font-heading text-sm text-white tracking-wide">{dept.department}</p>
                    <p className="font-mono text-[10px] text-white/30">{dept.participants || 0} participants &bull; {dept.wins || 0} wins</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-lg text-cyan-400">{dept.points?.toLocaleString()}</p>
                    <p className="font-mono text-[10px] text-white/20">PTS</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
