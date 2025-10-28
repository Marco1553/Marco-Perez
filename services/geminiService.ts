import { GoogleGenAI, Type } from "@google/genai";
import { Tone, TextPostIdea, AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textPostSchema = {
  type: Type.OBJECT,
  properties: {
    platform: { type: Type.STRING },
    text: { type: Type.STRING },
    imagePrompt: { type: Type.STRING },
  },
};

export const generateSocialPosts = async (idea: string, tone: Tone): Promise<TextPostIdea[]> => {
  const prompt = `
    Based on the idea "${idea}" with a "${tone}" tone, generate three social media posts: one for LinkedIn, one for Twitter/X, and one for Instagram.

    Follow these platform-specific guidelines:
    - LinkedIn: A professional, slightly longer-form post that encourages discussion.
    - Twitter/X: A short, punchy tweet, under 280 characters. Use 1-2 relevant hashtags.
    - Instagram: A visually-focused caption. Start with a hook, provide some value, and end with 3-5 relevant hashtags.

    For each post, also create a concise, descriptive prompt for an AI image generator to create a visually appealing, high-quality image that complements the post's content and tone. This prompt should describe scenes, objects, and moods, not just abstract concepts.

    Return the result as a JSON array.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: textPostSchema,
      },
    },
  });

  const jsonResponse = response.text;
  try {
    const parsed = JSON.parse(jsonResponse);
    return parsed as TextPostIdea[];
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", jsonResponse);
    throw new Error("Could not parse the generated content. Please try again.");
  }
};


export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `${prompt}, high quality, cinematic, professional photography`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    }
    
    throw new Error("Image generation failed to return an image.");
};
