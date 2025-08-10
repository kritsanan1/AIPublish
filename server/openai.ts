import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ContentGenerationRequest {
  contentType: 'article' | 'product_description' | 'social_media' | 'email';
  topic: string;
  tone: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
}

export interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export async function generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  const lengthMap = {
    short: "300-500 words",
    medium: "500-800 words",
    long: "800-1200 words"
  };

  const length = lengthMap[request.length || 'medium'];

  const systemPrompt = `You are an expert content creator for a content management system. Generate high-quality, engaging content based on the user's requirements. Always respond with valid JSON in this exact format:

{
  "title": "Engaging title for the content",
  "content": "Full content body with proper formatting and structure",
  "excerpt": "Brief 2-3 sentence summary",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  const userPrompt = `Create ${request.contentType} content about "${request.topic}" with a ${request.tone} tone. The content should be approximately ${length}. Make it informative, engaging, and well-structured with proper formatting.`;

  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      title: result.title || "Generated Content",
      content: result.content || "",
      excerpt: result.excerpt || "",
      tags: Array.isArray(result.tags) ? result.tags : []
    };
  } catch (error) {
    throw new Error("Failed to generate content: " + (error as Error).message);
  }
}

export interface AnalyticsInsight {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  prediction: string;
  confidence: number;
}

export async function generateAnalyticsInsights(data: {
  totalArticles: number;
  totalViews: number;
  totalUsers: number;
  totalRevenue: number;
}): Promise<AnalyticsInsight[]> {
  const systemPrompt = `You are an AI analytics expert. Analyze the provided metrics and generate business insights with predictions. Respond with valid JSON array of insights in this format:

[
  {
    "metric": "Metric name",
    "value": current_value,
    "trend": "up" | "down" | "stable",
    "prediction": "Detailed prediction and recommendation",
    "confidence": 0.85
  }
]`;

  const userPrompt = `Analyze these business metrics and provide insights:
- Total Articles: ${data.totalArticles}
- Total Views: ${data.totalViews}
- Total Users: ${data.totalUsers}
- Total Revenue: $${data.totalRevenue}

Provide 3-4 actionable insights with predictions for the next month.`;

  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return Array.isArray(result.insights) ? result.insights : [];
  } catch (error) {
    throw new Error("Failed to generate analytics insights: " + (error as Error).message);
  }
}

export async function analyzeSentiment(text: string): Promise<{
  rating: number;
  confidence: number;
  summary: string;
}> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis expert. Analyze the sentiment of the text and provide a rating from 1 to 5 stars, confidence score between 0 and 1, and a brief summary. Respond with JSON in this format: { 'rating': number, 'confidence': number, 'summary': string }",
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating || 3))),
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      summary: result.summary || "Neutral sentiment detected"
    };
  } catch (error) {
    throw new Error("Failed to analyze sentiment: " + (error as Error).message);
  }
}
