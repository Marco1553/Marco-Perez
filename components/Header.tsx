import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                Cross-Platform Content Genie
            </h1>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
                Generate tailored social media content and images in a single click.
            </p>
        </div>
      </div>
    </header>
  );
};
