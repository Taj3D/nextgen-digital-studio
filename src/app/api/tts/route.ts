import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice = 'alloy' } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const zai = await ZAI.create();

    // Generate speech
    const response = await zai.audio.speech.create({
      input: String(text),
      voice: voice as string,
    });

    // Get audio buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    // Return as base64
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json({ 
      error: 'Text-to-speech failed' 
    }, { status: 500 });
  }
}
