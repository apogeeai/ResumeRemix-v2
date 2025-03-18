import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createHash } from 'crypto';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 120 second timeout
});

// Cache for storing results
const cache = new Map();

// Function to calculate similarity score between texts
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  const intersection = Array.from(words1).filter(x => words2.has(x));
  return intersection.length / Math.max(words1.size, words2.size);
}

// Function to generate cache key
function generateCacheKey(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export async function POST(req: Request) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting AI generator request...`);
  
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error(`[${new Date().toISOString()}] OpenAI API key not found`);
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError: any) {
      console.error(`[${new Date().toISOString()}] Failed to parse request body:`, parseError);
      return NextResponse.json(
        { error: `Failed to parse request body: ${parseError.message}` },
        { status: 400 }
      );
    }

    const { input, type } = body;

    if (!input) {
      return NextResponse.json(
        { error: 'Input text is required' },
        { status: 400 }
      );
    }

    if (!type || !['resume', 'cover-letter'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type specified' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = generateCacheKey(input);
    const cachedResult = cache.get(cacheKey);

    if (cachedResult) {
      console.log(`[${new Date().toISOString()}] Found cached result`);
      return NextResponse.json({ 
        ...cachedResult,
        fromCache: true 
      });
    }

    // Generate content based on type
    const systemPrompt = type === 'resume' 
      ? `You are an ATS expert and resume consultant. Analyze the input and provide structured feedback with an ATS match score.`
      : `You are a professional cover letter writer. Create a concise 150-word cover letter.`;

    const userPrompt = type === 'resume'
      ? `Analyze the following input and provide:

1. ATS Score (0-100%)
• Calculate based on:
  - Key technical skills alignment (40%)
  - Experience relevance (30%)
  - Role-specific terminology match (20%)
  - Industry-specific keywords (10%)

2. Missing Keywords
• High-impact missing terms
• Context-specific terminology gaps
• Industry-standard certifications/tools absent

3. Skills Analysis
• Priority matrix of missing skills
• Semantic clustering of existing skills
• Recommended skill phrasing

4. Key Recommendations
• Content improvements
• Format suggestions
• Keyword optimization
• Achievement quantification

Input: "${input}"`
      : `Write a 150-word professional cover letter that:
• Shows enthusiasm and relevant experience
• Highlights 2-3 key achievements
• Ends with a call to action
No double spacing between paragraphs.

Input: "${input}"`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: type === 'resume' ? 0.3 : 0.5,
      max_tokens: type === 'resume' ? 1000 : 500,
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error("No content generated");
    }

    const response = {
      content: result,
      type,
      timestamp: new Date().toISOString(),
    };

    // Cache the result
    cache.set(cacheKey, response);

    const endTime = Date.now();
    console.log(`[${new Date().toISOString()}] Successfully generated content (took ${endTime - startTime}ms)`);
    
    return NextResponse.json(response);
  } catch (error: any) {
    const endTime = Date.now();
    console.error(`[${new Date().toISOString()}] Generation error:`, {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
      duration: `${endTime - startTime}ms`
    });

    // Check for quota exceeded error
    if (error.message?.includes("exceeded your current quota")) {
      return NextResponse.json(
        { 
          error: "API Quota Exceeded",
          details: "The OpenAI API quota has been exceeded. Please check the API key's billing status."
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: `Generation failed: ${error.message}`,
        details: {
          message: error.message,
          type: error.constructor.name,
          duration: `${endTime - startTime}ms`
        }
      },
      { status: 500 }
    );
  }
} 