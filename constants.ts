import { SocialPlatform, PlatformConfig } from './types';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';

export const PLATFORM_CONFIG: Record<SocialPlatform, PlatformConfig> = {
  [SocialPlatform.LinkedIn]: {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    aspectRatio: '1:1',
    color: '#0A66C2'
  },
  [SocialPlatform.Twitter]: {
    name: 'Twitter/X',
    icon: TwitterIcon,
    aspectRatio: '16:9',
    color: '#000000'
  },
  [SocialPlatform.Instagram]: {
    name: 'Instagram',
    icon: InstagramIcon,
    aspectRatio: '4:3', // Closest available to 4:5
    color: '#E1306C'
  },
};
