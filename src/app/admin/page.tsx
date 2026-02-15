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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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

  useEffect(() => {
    fetchData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

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
          <Button onClick={fetchData} variant="outline" className="border-cyan-500 text-cyan-400">
            🔄 রিফ্রেশ করুন
          </Button>
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                            <a href={`tel:${lead.mobile}`} className="text-cyan-400 hover:underline">{lead.mobile}</a>
                          </td>
                          <td className="p-3 text-gray-300">{lead.service}</td>
                          <td className="p-3">
                            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                          </td>
                          <td className="p-3 text-gray-400 text-sm">{formatDate(lead.createdAt)}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-green-500 text-green-400 h-8 text-xs"
                                onClick={() => updateStatus('lead', lead.id, 'contacted')}>
                                কল করেছে
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 h-8 text-xs"
                                onClick={() => updateStatus('lead', lead.id, 'completed')}>
                                সম্পন্ন
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
                            <a href={`tel:${booking.mobile}`} className="text-cyan-400 hover:underline">{booking.mobile}</a>
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
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 h-8 text-xs"
                                onClick={() => updateStatus('booking', booking.id, 'confirmed')}>
                                কনফার্ম
                              </Button>
                              <Button size="sm" variant="outline" className="border-green-500 text-green-400 h-8 text-xs"
                                onClick={() => updateStatus('booking', booking.id, 'completed')}>
                                সম্পন্ন
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
