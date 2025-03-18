import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createHash } from 'crypto';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

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

export async function POST(req: Request) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting POST request processing...`);
  
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

    const { resumeText, jobDescription } = body;

    if (!resumeText || !jobDescription) {
      console.error(`[${new Date().toISOString()}] Missing required fields`, {
        hasResumeText: !!resumeText,
        hasJobDescription: !!jobDescription
      });
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
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
      
      // Generate optimized resume using GPT-4 for detailed analysis
      console.log(`[${new Date().toISOString()}] Generating optimized resume...`);
      const userPrompt = `Analyze the job description and the user's latest role to provide strategic optimization recommendations:

Job Description Analysis:
1. Identify key requirements, priorities, and culture fit signals
2. Extract must-have skills, experiences, and qualifications
3. Determine ideal candidate profile

Resume Analysis & Optimization:
1. Professional Summary Enhancement:
   • Align with job requirements
   • Incorporate key achievements
   • Highlight relevant expertise

2. Latest Role Optimization (Current Bullets):
"${resumeText.split('\n').slice(0, 4).join('\n')}"

Provide the response in the following JSON format:
{
  "optimizedResume": {
    "content": "Original content with optimized summary and bullets",
    "seniorityLevel": "...",
    "atsScore": number,
    "keywordMatch": string[],
    "analysis": {
      "overallAssessment": "Gap analysis between JD and resume",
      "keywordOptimization": "Missing keywords and implementation suggestions",
      "formatAndStructure": "Structure improvement recommendations",
      "impactAndAchievements": "Metrics and achievements analysis",
      "technicalSkillsAnalysis": "Technical alignment with JD",
      "experienceMatch": "Experience gap analysis",
      "educationAndCertifications": "Relevant certifications analysis"
    },
    "jobAnalysis": {
      "keyRequirements": string[],
      "cultureFitSignals": string[],
      "idealCandidateProfile": string,
      "missingElements": string[]
    },
    "recommendedChanges": [
      {
        "section": "Professional Summary",
        "currentContent": "Current summary",
        "suggestedChanges": "Optimized version",
        "reason": "Strategic explanation"
      },
      {
        "section": "Latest Role Bullets",
        "currentContent": "Current bullet",
        "suggestedChanges": "Enhanced version with better metrics/keywords",
        "reason": "Alignment explanation"
      }
    ],
    "atsOptimization": {
      "missingKeywords": string[],
      "keywordContext": string,
      "suggestedMetrics": string[],
      "narrativeGaps": string,
      "humanReaderTips": string[]
    },
    "improvements": string[]
  }
}

Job Description: "${jobDescription}"`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert ATS optimization assistant. Analyze both the job description and resume to identify gaps and opportunities. Focus on making the candidate appear as the perfect fit while maintaining authenticity. Provide strategic recommendations for both ATS and human readers. IMPORTANT: You must respond with ONLY valid JSON - no additional text, no markdown, no explanations. Every field in the JSON structure must be populated with meaningful content.",
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500
      });
      console.log(`[${new Date().toISOString()}] Resume optimization completed`);

      // Generate cover letter using GPT-3.5 for cost efficiency
      console.log(`[${new Date().toISOString()}] Generating cover letter...`);
      const coverLetterPrompt = `Write a concise, 3-paragraph professional cover letter with clear paragraph breaks:

1. Opening (2-3 sentences):
   • Show genuine interest in the role
   • Mention the position
   • Brief qualification highlight

2. Body (3-4 sentences):
   • Focus on 1-2 key achievements with metrics
   • Connect your experience to their needs
   • Use keywords from: "${jobDescription}"

3. Closing (2 sentences):
   • Express enthusiasm
   • Clear call to action

Guidelines:
• Add single line break between paragraphs
• Keep it concise and impactful
• Include specific metrics from resume
• Use natural, conversational tone
• Incorporate personal voice
• End with signature block

Format as JSON:
{
  "coverLetter": {
    "content": "First paragraph\\nSecond paragraph\\nThird paragraph\\n\\nSincerely,\\nAdam M. Carfagna"
  }
}

Key experience to highlight:
"${resumeText.split('\n').slice(0, 4).join('\n')}"`;

      const coverLetterCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert cover letter writer. Create personalized, natural-sounding content with clear paragraph breaks. Use '\\n\\n' for paragraph separation. Vary sentence structures and incorporate specific details from the user's experience. IMPORTANT: You must respond with ONLY valid JSON - no additional text, no markdown, no explanations.",
          },
          {
            role: "user",
            content: coverLetterPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500
      });
      console.log(`[${new Date().toISOString()}] Cover letter generation completed`);

      let optimizedResumeContent;
      try {
        optimizedResumeContent = JSON.parse(completion.choices[0].message.content || '{}');
        console.log(`[${new Date().toISOString()}] Successfully parsed optimized resume JSON`);
      } catch (parseError: any) {
        console.error(`[${new Date().toISOString()}] Error parsing optimized resume JSON:`, parseError);
        optimizedResumeContent = {
          error: 'Failed to parse optimization result',
          rawContent: completion.choices[0].message.content
        };
      }

      let coverLetterContent;
      try {
        coverLetterContent = JSON.parse(coverLetterCompletion.choices[0].message.content || '{}');
        console.log(`[${new Date().toISOString()}] Successfully parsed cover letter JSON`);
      } catch (parseError: any) {
        console.error(`[${new Date().toISOString()}] Error parsing cover letter JSON:`, parseError);
        coverLetterContent = {
          error: 'Failed to parse cover letter result',
          rawContent: coverLetterCompletion.choices[0].message.content
        };
      }

      const result = {
        optimizedResume: {
          content: optimizedResumeContent.optimizedResume?.content || 'No content generated',
          seniorityLevel: optimizedResumeContent.optimizedResume?.seniorityLevel || 'Not specified',
          atsScore: optimizedResumeContent.optimizedResume?.atsScore || 0,
          keywordMatch: optimizedResumeContent.optimizedResume?.keywordMatch || [],
          analysis: {
            overallAssessment: optimizedResumeContent.optimizedResume?.analysis?.overallAssessment || 'No assessment available',
            keywordOptimization: optimizedResumeContent.optimizedResume?.analysis?.keywordOptimization || 'No optimization suggestions available',
            formatAndStructure: optimizedResumeContent.optimizedResume?.analysis?.formatAndStructure || 'No structure analysis available',
            impactAndAchievements: optimizedResumeContent.optimizedResume?.analysis?.impactAndAchievements || 'No achievement analysis available',
            technicalSkillsAnalysis: optimizedResumeContent.optimizedResume?.analysis?.technicalSkillsAnalysis || 'No skills analysis available',
            experienceMatch: optimizedResumeContent.optimizedResume?.analysis?.experienceMatch || 'No experience match analysis available',
            educationAndCertifications: optimizedResumeContent.optimizedResume?.analysis?.educationAndCertifications || 'No certification analysis available'
          },
          jobAnalysis: {
            keyRequirements: optimizedResumeContent.optimizedResume?.jobAnalysis?.keyRequirements || ['No key requirements identified'],
            cultureFitSignals: optimizedResumeContent.optimizedResume?.jobAnalysis?.cultureFitSignals || ['No culture fit signals identified'],
            idealCandidateProfile: optimizedResumeContent.optimizedResume?.jobAnalysis?.idealCandidateProfile || 'No ideal candidate profile available',
            missingElements: optimizedResumeContent.optimizedResume?.jobAnalysis?.missingElements || ['No missing elements identified']
          },
          recommendedChanges: optimizedResumeContent.optimizedResume?.recommendedChanges || [{
            section: 'General',
            currentContent: 'No specific content to analyze',
            suggestedChanges: 'No changes suggested',
            reason: 'Analysis not available'
          }],
          atsOptimization: {
            missingKeywords: optimizedResumeContent.optimizedResume?.atsOptimization?.missingKeywords || ['No missing keywords identified'],
            keywordContext: optimizedResumeContent.optimizedResume?.atsOptimization?.keywordContext || 'No keyword context available',
            suggestedMetrics: optimizedResumeContent.optimizedResume?.atsOptimization?.suggestedMetrics || ['No metrics suggestions available'],
            narrativeGaps: optimizedResumeContent.optimizedResume?.atsOptimization?.narrativeGaps || 'No narrative gaps identified',
            humanReaderTips: optimizedResumeContent.optimizedResume?.atsOptimization?.humanReaderTips || ['No human reader tips available']
          },
          improvements: optimizedResumeContent.optimizedResume?.improvements || ['No specific improvements suggested']
        },
        coverLetter: coverLetterContent.coverLetter?.content || 'No cover letter generated',
        jobDescription,
        timestamp: new Date().toISOString(),
      };

      // Log the result for debugging
      console.log('Generated result:', JSON.stringify(result, null, 2));

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

      // Check for quota exceeded error
      if (openaiError.message?.includes("exceeded your current quota")) {
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