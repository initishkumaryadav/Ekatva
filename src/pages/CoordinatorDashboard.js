import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import { Input } from '../components/ui/input';
import {
  Users, MessageSquare, Settings, ArrowLeft, LogOut, Send,
  CheckCircle, XCircle, Clock, MapPin, Trophy, Edit3, Loader2, Search
} from 'lucide-react';

const WS_BASE = process.env.REACT_APP_BACKEND_URL?.replace('https://', 'wss://').replace('http://', 'ws://');

export default function CoordinatorDashboard() {
  const { user, authAxios, logout, isCoordinator } = useAuth();
  const { playClick, playSuccess, playLevelUp } = useSound();
  const navigate = useNavigate();
  const [tab, setTab] = useState('participants');
  const [registrations, setRegistrations] = useState([]);
  const [qaMessages, setQaMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventEdit, setEventEdit] = useState({ event_id: '', venue: '', time: '', prize: '' });
  const [editLoading, setEditLoading] = useState(false);
  const chatEndRef = useRef(null);
  const wsRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const [r, q] = await Promise.all([
        authAxios.get('/registrations'),
        authAxios.get('/qa/messages'),
      ]);
      setRegistrations(r.data);
      setQaMessages(q.data.reverse());
    } catch {}
  }, [authAxios]);

  useEffect(() => {
    if (!isCoordinator) { navigate('/login'); return; }
    fetchData();
  }, [isCoordinator, navigate, fetchData]);

  // WebSocket for real-time Q&A
  useEffect(() => {
    if (!WS_BASE) return;
    const ws = new WebSocket(`${WS_BASE}/api/ws/qa`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'qa_message') {
        setQaMessages(prev => [...prev, data]);
        playLevelUp();
      }
    };
    wsRef.current = ws;
    return () => ws.close();
  }, [playLevelUp]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaMessages]);

  const handleApprove = async (id, status) => {
    playClick();
    await authAxios.post('/registrations/approve', { registration_id: id, status });
    playSuccess();
    fetchData();
  };

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    playClick();
    await authAxios.post('/qa/send', { message: newMsg });
    setNewMsg('');
  };

  const handleEventUpdate = async (e) => {
    e.preventDefault();
    if (!eventEdit.event_id) return;
    setEditLoading(true);
    playClick();
    try {
      await authAxios.post('/events/update', eventEdit);
      playSuccess();
      setEventEdit({ event_id: '', venue: '', time: '', prize: '' });
    } catch {}
    setEditLoading(false);
  };

  const filteredRegs = registrations.filter(r =>
    r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = registrations.filter(r => r.approval_status === 'pending').length;

  const TABS = [
    { id: 'participants', label: 'Participants', icon: Users, badge: pendingCount },
    { id: 'qa', label: 'Q&A Hub', icon: MessageSquare },
    { id: 'events', label: 'Event Control', icon: Settings },
  ];

  const EVENT_OPTIONS = [
    { id: 'd1e1', name: 'Opening Ceremony' }, { id: 'd1e2', name: 'Hackathon' },
    { id: 'd1e3', name: 'AI Workshop' }, { id: 'd1e4', name: 'RoboWars Qualifiers' },
    { id: 'd1e5', name: 'Star Night' }, { id: 'd2e1', name: 'Code Sprint' },
    { id: 'd2e2', name: 'Tech Exhibition' }, { id: 'd2e3', name: 'Gaming Tournament' },
    { id: 'd2e4', name: 'RoboWars Semi-Finals' }, { id: 'd2e5', name: 'Panel Discussion' },
    { id: 'd3e1', name: 'Hackathon Presentations' }, { id: 'd3e2', name: 'RoboWars Finale' },
    { id: 'd3e3', name: 'Drone Racing' }, { id: 'd3e4', name: 'Prize Distribution' },
    { id: 'd3e5', name: 'Closing Ceremony' },
  ];

  return (
    <div className="min-h-screen bg-[#050505]" data-testid="coordinator-dashboard">
      {/* Header */}
      <div className="border-b border-white/[0.05] bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-white/30 hover:text-white/60" data-testid="coord-back"><ArrowLeft size={18} /></button>
            <div>
              <h1 className="font-heading text-sm md:text-base tracking-wider text-white">COMMAND CENTER</h1>
              <p className="font-mono text-[10px] text-purple-400/50">{user?.name} &bull; {user?.role}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} data-testid="coord-logout" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/30 hover:text-red-400 text-xs font-body transition-all">
            <LogOut size={14} /> Exit
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2" data-testid="coord-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); playClick(); }}
              data-testid={`coord-tab-${t.id}`}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-xs tracking-wide whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-purple-400/10 text-purple-400 border border-purple-400/20' : 'text-white/30 hover:text-white/60 border border-transparent'
              }`}
            >
              <t.icon size={14} /> {t.label}
              {t.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center font-mono">{t.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Participants */}
        {tab === 'participants' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search participants..." className="pl-10 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="coord-search" />
            </div>
            <div className="space-y-2">
              {filteredRegs.map(r => (
                <div key={r.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all" data-testid={`participant-${r.id}`}>
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-heading text-xs ${
                    r.approval_status === 'approved' ? 'bg-green-400/10 text-green-400' :
                    r.approval_status === 'rejected' ? 'bg-red-400/10 text-red-400' :
                    'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {r.approval_status === 'approved' ? <CheckCircle size={16} /> :
                     r.approval_status === 'rejected' ? <XCircle size={16} /> :
                     <Clock size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-white/80 truncate">{r.full_name}</p>
                    <p className="font-mono text-[10px] text-white/30 truncate">{r.email} &bull; {r.college} &bull; {r.department || 'N/A'}</p>
                  </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pl-0 sm:pl-0 ml-0 sm:ml-auto">
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${r.payment_status === 'paid' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                      {r.payment_status}
                    </span>
                    {r.approval_status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(r.id, 'approved')} className="w-8 h-8 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 flex items-center justify-center transition-colors" data-testid={`approve-btn-${r.id}`}>
                          <CheckCircle size={14} />
                        </button>
                        <button onClick={() => handleApprove(r.id, 'rejected')} className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-colors" data-testid={`reject-btn-${r.id}`}>
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {filteredRegs.length === 0 && <p className="text-center py-8 font-body text-sm text-white/20">No participants found</p>}
            </div>
          </motion.div>
        )}

        {/* Q&A Hub */}
        {tab === 'qa' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="h-[60vh] overflow-y-auto rounded-xl bg-white/[0.01] border border-white/[0.06] p-4 space-y-3" data-testid="qa-messages">
              {qaMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender_role !== 'participant' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender_role !== 'participant'
                      ? 'bg-purple-400/10 border border-purple-400/20'
                      : 'bg-white/[0.03] border border-white/[0.06]'
                  }`}>
                    <p className="font-mono text-[10px] text-white/30 mb-1">{msg.sender_name} &bull; {msg.sender_role}</p>
                    <p className="font-body text-sm text-white/80">{msg.message}</p>
                    <p className="font-mono text-[9px] text-white/15 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
              {qaMessages.length === 0 && <p className="text-center py-8 font-body text-sm text-white/20">No messages yet. Start the conversation!</p>}
            </div>
            <form onSubmit={handleSendMsg} className="flex gap-2" data-testid="qa-form">
              <Input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type your response..." className="flex-1 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="qa-input" />
              <button type="submit" data-testid="qa-send-btn" className="px-4 h-10 rounded-lg bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 flex items-center gap-2 font-body text-xs transition-colors">
                <Send size={14} /> Send
              </button>
            </form>
          </motion.div>
        )}

        {/* Event Control */}
        {tab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handleEventUpdate} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4" data-testid="event-control-form">
              <h3 className="font-heading text-sm text-white/60 tracking-wider flex items-center gap-2"><Edit3 size={16} /> Update Event Metadata</h3>
              <div className="space-y-3">
                <select value={eventEdit.event_id} onChange={e => setEventEdit({...eventEdit, event_id: e.target.value})} className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.06] text-white font-body text-sm" data-testid="event-select" required>
                  <option value="" className="bg-[#0a0a0a]">Select Event</option>
                  {EVENT_OPTIONS.map(e => <option key={e.id} value={e.id} className="bg-[#0a0a0a]">{e.name}</option>)}
                </select>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><MapPin size={10} /> Venue</label>
                    <Input value={eventEdit.venue} onChange={e => setEventEdit({...eventEdit, venue: e.target.value})} placeholder="New venue" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="event-venue" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><Clock size={10} /> Time</label>
                    <Input value={eventEdit.time} onChange={e => setEventEdit({...eventEdit, time: e.target.value})} placeholder="New time" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="event-time" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-white/30 uppercase mb-1 flex items-center gap-1"><Trophy size={10} /> Prize</label>
                    <Input value={eventEdit.prize} onChange={e => setEventEdit({...eventEdit, prize: e.target.value})} placeholder="New prize" className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 h-10" data-testid="event-prize" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={editLoading} data-testid="event-update-btn" className="px-4 py-2 rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 text-xs font-body transition-colors flex items-center gap-2">
                {editLoading ? <Loader2 size={14} className="animate-spin" /> : <Edit3 size={14} />} Update Event
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
