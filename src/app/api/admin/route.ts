import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Get all leads and bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let leads: unknown[] = [];
    let bookings: unknown[] = [];

    // Fetch leads
    if (type === 'all' || type === 'leads') {
      leads = await db.lead.findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' },
        take: limit
      });
    }

    // Fetch bookings
    if (type === 'all' || type === 'bookings') {
      bookings = await db.booking.findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' },
        take: limit
      });
    }

    // Stats
    const totalLeads = await db.lead.count();
    const totalBookings = await db.booking.count();
    const newLeads = await db.lead.count({ where: { status: 'new' } });
    const pendingBookings = await db.booking.count({ where: { status: 'pending' } });

    return NextResponse.json({
      success: true,
      stats: { totalLeads, totalBookings, newLeads, pendingBookings },
      leads,
      bookings,
      source: 'supabase'
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch data',
      stats: { totalLeads: 0, totalBookings: 0, newLeads: 0, pendingBookings: 0 },
      leads: [],
      bookings: []
    }, { status: 500 });
  }
}

// PUT - Update status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, status } = body;

    if (!type || !id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type === 'lead') {
      const updated = await db.lead.update({
        where: { id },
        data: { status }
      });
      return NextResponse.json({ success: true, lead: updated });
    } else if (type === 'booking') {
      const updated = await db.booking.update({
        where: { id },
        data: { status }
      });
      return NextResponse.json({ success: true, booking: updated });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE - Delete entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    if (type === 'lead') {
      await db.lead.delete({ where: { id } });
    } else if (type === 'booking') {
      await db.booking.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
