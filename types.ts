import React from 'react';

export enum SocialPlatform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter/X',
  Instagram = 'Instagram',
}

export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Casual = 'Casual',
  Inspirational = 'Inspirational'
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface PlatformConfig {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  aspectRatio: AspectRatio;
  color: string;
}

export interface GeneratedPost {
  platform: SocialPlatform;
  text: string;
  imageUrl: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface TextPostIdea {
  platform: string;
  text: string;
  imagePrompt: string;
}
