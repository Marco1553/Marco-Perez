import React, { useState, useEffect } from 'react';
import { GeneratedPost } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultCardProps {
  content: GeneratedPost;
}

export const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const Icon = content.icon;

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.text);
    setCopied(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between" style={{ backgroundColor: `${content.color}1A` }}>
        <div className="flex items-center gap-3">
          <Icon className="w-8 h-8" style={{ color: content.color }} />
          <h3 className="text-xl font-bold" style={{ color: content.color }}>
            {content.name}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              Copy Text
            </>
          )}
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="flex flex-col">
           <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap flex-grow">{content.text}</p>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src={content.imageUrl} 
            alt={`Generated for ${content.name}`} 
            className="rounded-lg shadow-md object-cover w-full h-full max-h-80"
          />
        </div>
      </div>
    </div>
  );
};
