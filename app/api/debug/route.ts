import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    // Check environment variables
    const envDebug = {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      openAIKeyLength: process.env.OPENAI_API_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      vercel: process.env.VERCEL,
      environment: process.env.ENVIRONMENT,
    };

    // Test OpenAI connection
    let openAITest = 'Not tested';
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      // Try a simple completion to test the connection
      const test = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Test' }],
      });
      openAITest = 'Connection successful';
    } catch (error: any) {
      openAITest = `OpenAI Error: ${error.message}`;
    }

    return NextResponse.json({
      status: 'Debug endpoint active',
      timestamp: new Date().toISOString(),
      environment: envDebug,
      openAITest,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'Debug endpoint error',
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
} 