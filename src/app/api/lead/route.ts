import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, mobile, email, service, message } = await request.json();

    // Validate required fields
    if (!name || !mobile || !service) {
      return NextResponse.json(
        { success: false, message: 'নাম, মোবাইল এবং সার্ভিস আবশ্যক' },
        { status: 400 }
      );
    }

    // Save to database
    const lead = await db.lead.create({
      data: {
        name,
        mobile,
        email: email || null,
        service,
        message: message || null,
        status: 'new',
      },
    });

    console.log('✅ Lead saved to Supabase:', lead.id);

    // WhatsApp notification message
    const whatsappMessage = `🔔 *নতুন লিড এসেছে!*

👤 নাম: ${name}
📱 মোবাইল: ${mobile}
📧 ইমেইল: ${email || 'দেওয়া হয়নি'}
🎯 সার্ভিস: ${service}
📝 মেসেজ: ${message || 'কোনো মেসেজ নেই'}

⏰ সময়: ${new Date().toLocaleString('bn-BD')}`;

    return NextResponse.json({
      success: true,
      message: 'আপনার অনুরোধ সফলভাবে জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।',
      leadId: lead.id,
      whatsappLink: `https://wa.me/8801711731354?text=${encodeURIComponent(whatsappMessage)}`,
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, message: 'সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ leads, source: 'supabase' });
  } catch (error) {
    console.error('Lead fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'লিড লোড করতে সমস্যা হয়েছে', leads: [] },
      { status: 500 }
    );
  }
}
