import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Get all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, email, service, date, time, notes } = body;

    // Validation
    if (!name || !mobile || !service) {
      return NextResponse.json({ 
        error: 'নাম, মোবাইল এবং সার্ভিস আবশ্যক' 
      }, { status: 400 });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        name: String(name),
        mobile: String(mobile),
        email: email ? String(email) : null,
        service: String(service),
        date: date ? String(date) : null,
        time: time ? String(time) : null,
        notes: notes ? String(notes) : null,
        status: 'pending'
      }
    });

    // Log to console
    console.log(`
========================================
🔔 নতুন বুকিং এসেছে!
========================================
📋 সার্ভিস: ${service}
👤 নাম: ${name}
📱 মোবাইল: ${mobile}
📧 ইমেইল: ${email || 'নেই'}
📅 তারিখ: ${date || 'পরে নির্ধারণ'}
⏰ সময়: ${time || 'পরে নির্ধারণ'}
📝 নোট: ${notes || 'নেই'}
🆔 বুকিং আইডি: ${booking.id}
========================================
    `);

    return NextResponse.json({ 
      success: true, 
      message: 'বুকিং সফল হয়েছে! শীঘ্রই যোগাযোগ করা হবে।',
      booking 
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ 
      error: 'বুকিং সংরক্ষণে সমস্যা হয়েছে' 
    }, { status: 500 });
  }
}
