import React, { useState } from 'react';
import { Tone } from '../types';

interface InputFormProps {
  onGenerate: (idea: string, tone: Tone) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [idea, setIdea] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.Professional);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onGenerate(idea, tone);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Content Idea
          </label>
          <textarea
            id="idea"
            rows={4}
            className="w-full px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., The launch of our new productivity app..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Desired Tone
          </label>
          <select
            id="tone"
            className="w-full px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
          >
            {Object.values(Tone).map((toneValue) => (
              <option key={toneValue} value={toneValue}>{toneValue}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600 transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </form>
    </div>
  );
};
