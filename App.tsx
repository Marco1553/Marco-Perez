import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultCard } from './components/ResultCard';
import { Loader } from './components/Loader';
import { generateSocialPosts, generateImage } from './services/geminiService';
import { SocialPlatform, Tone, GeneratedPost, AspectRatio } from './types';
import { PLATFORM_CONFIG } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedPost[]>([]);

  const handleGenerate = useCallback(async (idea: string, tone: Tone) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent([]);

    try {
      const textPosts = await generateSocialPosts(idea, tone);

      if (!textPosts || textPosts.length === 0) {
        throw new Error("Failed to generate post ideas. The response was empty.");
      }
      
      const imageGenerationPromises = textPosts.map(post => {
        const platformConfig = PLATFORM_CONFIG[post.platform as SocialPlatform];
        if (!platformConfig) {
          console.warn(`No config found for platform: ${post.platform}`);
          return Promise.resolve(null);
        }
        return generateImage(post.imagePrompt, platformConfig.aspectRatio as AspectRatio);
      });

      const images = await Promise.all(imageGenerationPromises);

      const finalContent = textPosts.map((post, index) => {
        const platform = post.platform as SocialPlatform;
        const imageUrl = images[index] ? `data:image/jpeg;base64,${images[index]}` : 'https://picsum.photos/1024/1024';
        return {
          platform,
          text: post.text,
          imageUrl,
          ...PLATFORM_CONFIG[platform]
        };
      });

      setGeneratedContent(finalContent);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during content generation.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

          {error && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && (
            <div className="mt-12 flex flex-col items-center justify-center text-center">
              <Loader />
              <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Generating content... this might take a moment.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Crafting posts and creating unique images for each platform.</p>
            </div>
          )}

          {!isLoading && generatedContent.length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">Your Content is Ready!</h2>
              {generatedContent.map((content) => (
                <ResultCard key={content.platform} content={content} />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
