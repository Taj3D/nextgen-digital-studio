import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Get all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    
    const testimonials = await db.testimonial.findMany({
      where: approved === 'true' ? { approved: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error('Testimonial fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'টেস্টিমোনিয়াল লোড করতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const { name, location, rating, text, service, avatar } = await request.json();
    
    if (!name || !text || !service) {
      return NextResponse.json(
        { success: false, message: 'নাম, মন্তব্য এবং সার্ভিস আবশ্যক' },
        { status: 400 }
      );
    }
    
    const testimonial = await db.testimonial.create({
      data: {
        name,
        location: location || 'বাংলাদেশ',
        rating: rating || 5,
        text,
        service,
        avatar: avatar || null,
        approved: false,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'আপনার রিভিউ জমা হয়েছে। অনুমোদনের পর দেখানো হবে।',
      testimonial,
    });
  } catch (error) {
    console.error('Testimonial create error:', error);
    return NextResponse.json(
      { success: false, message: 'রিভিউ জমা দিতে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial (approve/edit)
export async function PUT(request: NextRequest) {
  try {
    const { id, approved, name, location, rating, text, service } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID আবশ্যক' }, { status: 400 });
    }
    
    const updateData: Record<string, unknown> = {};
    if (approved !== undefined) updateData.approved = approved;
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (rating) updateData.rating = rating;
    if (text) updateData.text = text;
    if (service) updateData.service = service;
    
    const testimonial = await db.testimonial.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error('Testimonial update error:', error);
    return NextResponse.json({ error: 'আপডেট করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}

// DELETE - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID আবশ্যক' }, { status: 400 });
    }
    
    await db.testimonial.delete({ where: { id } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial delete error:', error);
    return NextResponse.json({ error: 'ডিলিট করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}
