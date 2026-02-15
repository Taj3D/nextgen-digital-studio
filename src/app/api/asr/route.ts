import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    const zai = await ZAI.create();

    // Convert to buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    // Create transcription
    const response = await zai.audio.transcriptions.create({
      file: audioBuffer,
      filename: audioFile.name || 'audio.webm',
      model: 'whisper-1',
      language: 'bn', // Bengali
    });

    return NextResponse.json({ 
      text: response.text 
    });
  } catch (error) {
    console.error('ASR error:', error);
    return NextResponse.json({ 
      error: 'Speech recognition failed' 
    }, { status: 500 });
  }
}
