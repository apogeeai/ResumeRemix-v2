import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createHash } from 'crypto';

// Initialize OpenAI client with Replit secret
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 120 second timeout
});

// Cache for storing results (in production, use a proper database)
const cache = new Map();

// Function to calculate similarity score between job descriptions
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  const intersection = Array.from(words1).filter(x => words2.has(x));
  return intersection.length / Math.max(words1.size, words2.size);
}

// Function to generate cache key
function generateCacheKey(resumeText: string, jobDescription: string): string {
  const combined = `${resumeText}${jobDescription}`;
  return createHash('sha256').update(combined).digest('hex');
}

// Remove edge runtime configuration
export async function POST(req: Request) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting POST request processing...`);
  
  try {
    // Log environment variable presence
    console.log(`[${new Date().toISOString()}] Checking for OpenAI API key in environment...`);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const error = 'OpenAI API key not found. Please ensure OPENAI_API_KEY is set in Replit Secrets.';
      console.error(`[${new Date().toISOString()}] ${error}`);
      return NextResponse.json({ error }, { status: 500 });
    }
    console.log(`[${new Date().toISOString()}] OpenAI API key found in environment (length: ${apiKey.length})`);

    // Parse request body
    console.log(`[${new Date().toISOString()}] Parsing request body...`);
    let body;
    try {
      body = await req.json();
    } catch (parseError: any) {
      const error = `Failed to parse request body: ${parseError.message}`;
      console.error(`[${new Date().toISOString()}] ${error}`);
      return NextResponse.json({ error }, { status: 400 });
    }
    console.log(`[${new Date().toISOString()}] Request body parsed successfully`);

    const { resumeText, jobDescription } = body;

    if (!resumeText || !jobDescription) {
      const error = 'Resume text and job description are required';
      console.error(`[${new Date().toISOString()}] ${error}`, {
        hasResumeText: !!resumeText,
        hasJobDescription: !!jobDescription
      });
      return NextResponse.json({ error }, { status: 400 });
    }

    // Check cache
    const cacheKey = generateCacheKey(resumeText, jobDescription);
    const cachedResult = cache.get(cacheKey);

    if (cachedResult) {
      console.log(`[${new Date().toISOString()}] Found cached result, checking similarity...`);
      const similarityScore = calculateSimilarity(
        jobDescription,
        cachedResult.jobDescription
      );
      if (similarityScore > 0.8) {
        console.log(`[${new Date().toISOString()}] Returning cached result`);
        return NextResponse.json({ 
          ...cachedResult,
          fromCache: true 
        });
      }
    }

    try {
      console.log(`[${new Date().toISOString()}] Starting OpenAI API requests...`);
      
      // Generate optimized resume using GPT-3.5-turbo for faster response
      console.log(`[${new Date().toISOString()}] Generating optimized resume...`);
      const resumeOptimization = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume optimizer and ATS analyst. Analyze the resume and job description to provide a comprehensive analysis and optimization. Format the response as JSON with the following structure:

{
  "optimizedResume": {
    "content": "The complete optimized resume content with proper formatting",
    "seniorityLevel": "Entry/Mid/Senior/Executive",
    "atsScore": 85,
    "keywordMatch": [
      "skill1",
      "skill2",
      "skill3"
    ],
    "improvements": [
      "Specific improvement suggestion 1",
      "Specific improvement suggestion 2",
      "Specific improvement suggestion 3"
    ],
    "analysis": {
      "overallAssessment": "A paragraph summarizing the overall assessment of the resume",
      "keywordOptimization": "Analysis of keyword usage and suggestions for improvement",
      "formatAndStructure": "Analysis of resume format and structure with recommendations",
      "impactAndAchievements": "Analysis of achievement statements and metrics",
      "technicalSkillsAnalysis": "Analysis of technical skills alignment with job requirements",
      "experienceMatch": "Analysis of experience relevance to the position",
      "educationAndCertifications": "Analysis of education and certifications relevance",
      "recommendedChanges": [
        {
          "section": "Section name (e.g., Experience, Skills)",
          "currentContent": "Brief description of current content",
          "suggestedChanges": "Specific changes recommended",
          "reason": "Reason for the suggested changes"
        }
      ]
    }
  }
}`
          },
          {
            role: 'user',
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });
      console.log(`[${new Date().toISOString()}] Resume optimization completed`);

      // Generate cover letter using GPT-3.5
      console.log(`[${new Date().toISOString()}] Generating cover letter...`);
      const coverLetterGeneration = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert cover letter writer. Create a compelling cover letter that:
            1. Matches the job requirements
            2. Highlights relevant experience from the resume
            3. Maintains a professional yet personal tone
            4. Includes specific achievements and metrics`
          },
          {
            role: 'user',
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      console.log(`[${new Date().toISOString()}] Cover letter generation completed`);

      let optimizedResumeContent;
      try {
        optimizedResumeContent = JSON.parse(resumeOptimization.choices[0].message.content || '{}');
        console.log(`[${new Date().toISOString()}] Successfully parsed optimized resume JSON`);
      } catch (parseError: any) {
        console.error(`[${new Date().toISOString()}] Error parsing optimized resume JSON:`, parseError);
        optimizedResumeContent = {
          error: 'Failed to parse optimization result',
          rawContent: resumeOptimization.choices[0].message.content
        };
      }

      const result = {
        optimizedResume: optimizedResumeContent,
        coverLetter: coverLetterGeneration.choices[0].message.content,
        jobDescription,
        timestamp: new Date().toISOString(),
      };

      // Cache the result
      cache.set(cacheKey, result);
      const endTime = Date.now();
      console.log(`[${new Date().toISOString()}] Successfully generated and cached optimized content (took ${endTime - startTime}ms)`);
      return NextResponse.json(result);
    } catch (openaiError: any) {
      console.error(`[${new Date().toISOString()}] OpenAI API error details:`, {
        message: openaiError.message,
        status: openaiError.status,
        stack: openaiError.stack,
        type: openaiError.type,
        code: openaiError.code
      });
      return NextResponse.json(
        { 
          error: `OpenAI API error: ${openaiError.message}`,
          details: {
            message: openaiError.message,
            type: openaiError.type,
            code: openaiError.code
          }
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    const endTime = Date.now();
    console.error(`[${new Date().toISOString()}] Generation error details:`, {
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
      duration: `${endTime - startTime}ms`
    });
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