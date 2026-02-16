'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  service: string;
  message: string | null;
  status: string;
  createdAt: string;
}

interface Booking {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  service: string;
  date: string | null;
  time: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  totalBookings: number;
  newLeads: number;
  pendingBookings: number;
}

interface AIAnalytics {
  totalChats: number;
  totalMessages: number;
  sessionsCount: number;
  topicsAsked: { topic: string; count: number }[];
  feedbackStats: { positive: number; negative: number };
  averageMessagesPerSession: number;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiAnalytics, setAiAnalytics] = useState<AIAnalytics | null>(null);

  const ADMIN_PASSWORD = '@taj921988';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('adminAuth_v3', 'true');
    } else {
      setError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth_v3');
    setPassword('');
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setLeads(data.leads);
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type: 'lead' | 'booking', id: string, status: string) => {
    try {
      await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status })
      });
      fetchData();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const deleteEntry = async (type: 'lead' | 'booking', id: string) => {
    if (!confirm('আপনি কি নিশ্চিত এটি ডিলিট করতে চান?')) return;
    
    try {
      await fetch(`/api/admin?type=${type}&id=${id}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('bn-BD', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'contacted':
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400';
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getWhatsAppLink = (mobile: string, name: string) => {
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    const phone = cleanMobile.startsWith('880') ? cleanMobile : `880${cleanMobile}`;
    return `https://wa.me/${phone}?text=হ্যালো ${name}, NextGen Digital Studio থেকে কল করছি।`;
  };

  // Check for existing session
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth_v3');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      loadAIAnalytics();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Load AI Analytics from localStorage
  const loadAIAnalytics = () => {
    try {
      const saved = localStorage.getItem('nextgen_analytics');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAiAnalytics(parsed);
      }
    } catch (e) {
      console.error('Failed to load AI analytics:', e);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#141414] border-[#333]">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <CardTitle className="text-white text-2xl">Admin লগইন</CardTitle>
            <p className="text-gray-400 text-sm">NextGen Digital Studio</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">পাসওয়ার্ড দিন</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#333] text-white focus:border-cyan-500 focus:outline-none"
                  placeholder="পাসওয়ার্ড..."
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3"
              >
                🚀 লগইন করুন
              </Button>
            </form>
            <p className="text-gray-500 text-xs text-center mt-6">
              তাজ ভাই | যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              NextGen Digital <span className="text-cyan-400">Admin</span>
            </h1>
            <p className="text-gray-400">ক্লায়েন্ট ডাটা ম্যানেজমেন্ট ড্যাশবোর্ড</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchData} variant="outline" className="border-cyan-500 text-cyan-400">
              🔄 রিফ্রেশ করুন
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-400">
              🚪 লগআউট
            </Button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-[#141414] border-[#333]">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400">{stats.totalLeads}</div>
                <div className="text-gray-400 text-sm">মোট লিড</div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-[#333]">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.newLeads}</div>
                <div className="text-gray-400 text-sm">নতুন লিড</div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-[#333]">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{stats.totalBookings}</div>
                <div className="text-gray-400 text-sm">মোট বুকিং</div>
              </CardContent>
            </Card>
            <Card className="bg-[#141414] border-[#333]">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-400">{stats.pendingBookings}</div>
                <div className="text-gray-400 text-sm">পেন্ডিং বুকিং</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#141414] border border-[#333] mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📊 ওভারভিউ
            </TabsTrigger>
            <TabsTrigger value="ai-analytics" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              🤖 AI অ্যানালিটিক্স
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📋 লিড ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              📅 বুকিং ({bookings.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <Card className="bg-[#141414] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>🆕 সাম্প্রতিক লিড</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">{leads.filter(l => l.status === 'new').length} নতুন</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leads.slice(0, 5).map(lead => (
                      <div key={lead.id} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#333]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">{lead.name}</span>
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          📱 {lead.mobile} | 🎯 {lead.service}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <a
                            href={getWhatsAppLink(lead.mobile, lead.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            💬 WhatsApp
                          </a>
                          <a
                            href={`tel:${lead.mobile}`}
                            className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                          >
                            📞 কল
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="bg-[#141414] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>📅 সাম্প্রতিক বুকিং</span>
                    <Badge className="bg-orange-500/20 text-orange-400">{bookings.filter(b => b.status === 'pending').length} পেন্ডিং</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="p-3 bg-[#0a0a0a] rounded-lg border border-[#333]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">{booking.name}</span>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          📅 {booking.date} | ⏰ {booking.time} | 🎯 {booking.service}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <a
                            href={getWhatsAppLink(booking.mobile, booking.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            💬 WhatsApp
                          </a>
                          <a
                            href={`tel:${booking.mobile}`}
                            className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                          >
                            📞 কল
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Analytics Tab */}
          <TabsContent value="ai-analytics">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">🤖 বুদ্ধিদীপ্ত AI অ্যানালিটিক্স</h2>
                <Button onClick={loadAIAnalytics} variant="outline" className="border-cyan-500 text-cyan-400">
                  🔄 রিফ্রেশ
                </Button>
              </div>
              
              {!aiAnalytics ? (
                <Card className="bg-[#141414] border-[#333]">
                  <CardContent className="p-8 text-center text-gray-400">
                    <p>এখনো কোনো AI চ্যাট ডাটা নেই</p>
                    <p className="text-sm mt-2">ওয়েবসাইটে AI চ্যাট ব্যবহার হলে এখানে ডাটা দেখাবে</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-[#141414] border-[#333]">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-cyan-400">{aiAnalytics.totalChats}</div>
                        <div className="text-gray-400 text-sm">মোট চ্যাট</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#141414] border-[#333]">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-green-400">{aiAnalytics.totalMessages}</div>
                        <div className="text-gray-400 text-sm">মোট মেসেজ</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#141414] border-[#333]">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-yellow-400">{aiAnalytics.feedbackStats.positive}</div>
                        <div className="text-gray-400 text-sm">👍 পজিটিভ ফিডব্যাক</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#141414] border-[#333]">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-red-400">{aiAnalytics.feedbackStats.negative}</div>
                        <div className="text-gray-400 text-sm">👎 নেগেটিভ ফিডব্যাক</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Topics Asked */}
                  <Card className="bg-[#141414] border-[#333]">
                    <CardHeader>
                      <CardTitle className="text-white">📊 সবচেয়ে জিজ্ঞাসিত টপিক</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {aiAnalytics.topicsAsked.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">এখনো কোনো টপিক ডাটা নেই</p>
                      ) : (
                        <div className="space-y-3">
                          {aiAnalytics.topicsAsked
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 10)
                            .map((topic, i) => {
                              const maxCount = Math.max(...aiAnalytics.topicsAsked.map(t => t.count));
                              const percentage = (topic.count / maxCount) * 100;
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <span className="w-32 text-gray-300 text-sm">{topic.topic}</span>
                                  <div className="flex-1 h-4 bg-[#0a0a0a] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-cyan-400 font-medium">{topic.count}</span>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Feedback Stats */}
                  <Card className="bg-[#141414] border-[#333]">
                    <CardHeader>
                      <CardTitle className="text-white">⭐ ফিডব্যাক পরিসংখ্যান</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                            <span className="text-4xl">👍</span>
                          </div>
                          <div className="text-2xl font-bold text-green-400">{aiAnalytics.feedbackStats.positive}</div>
                          <div className="text-gray-400 text-sm">সন্তুষ্ট</div>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                            <span className="text-4xl">👎</span>
                          </div>
                          <div className="text-2xl font-bold text-red-400">{aiAnalytics.feedbackStats.negative}</div>
                          <div className="text-gray-400 text-sm">অসন্তুষ্ট</div>
                        </div>
                      </div>
                      {(aiAnalytics.feedbackStats.positive + aiAnalytics.feedbackStats.negative) > 0 && (
                        <div className="mt-6 text-center">
                          <div className="text-lg text-white">
                            সন্তুষ্টির হার: {' '}
                            <span className="text-green-400 font-bold">
                              {Math.round((aiAnalytics.feedbackStats.positive / (aiAnalytics.feedbackStats.positive + aiAnalytics.feedbackStats.negative)) * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card className="bg-[#141414] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">📋 সকল লিড ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#333]">
                        <th className="text-left p-3 text-gray-400">নাম</th>
                        <th className="text-left p-3 text-gray-400">মোবাইল</th>
                        <th className="text-left p-3 text-gray-400">সার্ভিস</th>
                        <th className="text-left p-3 text-gray-400">স্ট্যাটাস</th>
                        <th className="text-left p-3 text-gray-400">তারিখ</th>
                        <th className="text-left p-3 text-gray-400">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead.id} className="border-b border-[#333] hover:bg-[#1a1a1a]">
                          <td className="p-3 text-white">{lead.name}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <a href={`tel:${lead.mobile}`} className="text-cyan-400 hover:underline">{lead.mobile}</a>
                              <a
                                href={getWhatsAppLink(lead.mobile, lead.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300"
                                title="WhatsApp এ মেসেজ পাঠান"
                              >
                                💬
                              </a>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300">{lead.service}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                          </td>
                          <td className="p-3 text-gray-400 text-sm">{formatDate(lead.createdAt)}</td>
                          <td className="p-3">
                            <div className="flex gap-1 flex-wrap">
                              <Button size="sm" variant="outline" className="border-green-500 text-green-400 h-8 text-xs"
                                onClick={() => updateStatus('lead', lead.id, 'contacted')}>
                                কল করেছে
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 h-8 text-xs"
                                onClick={() => updateStatus('lead', lead.id, 'completed')}>
                                সম্পন্ন
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-400 h-8 text-xs"
                                onClick={() => deleteEntry('lead', lead.id)}>
                                🗑️
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="bg-[#141414] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">📅 সকল বুকিং ({bookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#333]">
                        <th className="text-left p-3 text-gray-400">নাম</th>
                        <th className="text-left p-3 text-gray-400">মোবাইল</th>
                        <th className="text-left p-3 text-gray-400">সার্ভিস</th>
                        <th className="text-left p-3 text-gray-400">তারিখ/সময়</th>
                        <th className="text-left p-3 text-gray-400">স্ট্যাটাস</th>
                        <th className="text-left p-3 text-gray-400">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id} className="border-b border-[#333] hover:bg-[#1a1a1a]">
                          <td className="p-3 text-white">{booking.name}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <a href={`tel:${booking.mobile}`} className="text-cyan-400 hover:underline">{booking.mobile}</a>
                              <a
                                href={getWhatsAppLink(booking.mobile, booking.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300"
                                title="WhatsApp এ মেসেজ পাঠান"
                              >
                                💬
                              </a>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300">{booking.service}</td>
                          <td className="p-3 text-gray-300">
                            {booking.date && <span>📅 {booking.date}</span>}
                            {booking.time && <span className="ml-2">⏰ {booking.time}</span>}
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1 flex-wrap">
                              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 h-8 text-xs"
                                onClick={() => updateStatus('booking', booking.id, 'confirmed')}>
                                কনফার্ম
                              </Button>
                              <Button size="sm" variant="outline" className="border-green-500 text-green-400 h-8 text-xs"
                                onClick={() => updateStatus('booking', booking.id, 'completed')}>
                                সম্পন্ন
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-400 h-8 text-xs"
                                onClick={() => deleteEntry('booking', booking.id)}>
                                🗑️
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>NextGen Digital Studio - Admin Dashboard</p>
          <p>তাজ ভাই | যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার</p>
        </div>
      </div>
    </div>
  );
}
