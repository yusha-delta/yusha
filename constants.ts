import { GradeOption } from './types';

// Updated with reliable i.giphy.com direct links to prevent "Content not available" errors.
export const GRADE_SCALE: GradeOption[] = [
  { 
    label: 'A+', 
    points: 4.00, 
    emoji: '🤩', 
    gifUrl: 'https://i.giphy.com/media/YTbZzCkRQCEJa/giphy.gif', // Minions Cheering
    color: 'text-emerald-700', 
    description: 'Outstanding!' 
  },
  { 
    label: 'A',  
    points: 3.75, 
    emoji: '😁', 
    gifUrl: 'https://i.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif', // Happy Dance
    color: 'text-emerald-600', 
    description: 'Excellent' 
  },
  { 
    label: 'A-', 
    points: 3.50, 
    emoji: '😄', 
    gifUrl: 'https://i.giphy.com/media/ubJXwwiIDmiDFv16vQ/giphy.gif', // Happy Nod
    color: 'text-emerald-500', 
    description: 'Very Good' 
  },
  { 
    label: 'B+', 
    points: 3.25, 
    emoji: '🙂', 
    gifUrl: 'https://i.giphy.com/media/gcvxXJjiYLCXC/giphy.gif', // Thumbs up
    color: 'text-blue-600', 
    description: 'Good' 
  },
  { 
    label: 'B',  
    points: 3.00, 
    emoji: '😐', 
    gifUrl: 'https://i.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif', // Nodding / Okay
    color: 'text-blue-500', 
    description: 'Satisfactory' 
  },
  { 
    label: 'B-', 
    points: 2.75, 
    emoji: '😕', 
    gifUrl: 'https://i.giphy.com/media/3o7btUg31OCi0NXdkY/giphy.gif', // Unsure/Confused
    color: 'text-yellow-600', 
    description: 'Acceptable' 
  },
  { 
    label: 'C+', 
    points: 2.50, 
    emoji: '😟', 
    gifUrl: 'https://i.giphy.com/media/ISOckXUybVfQ4/giphy.gif', // Spongebob sitting alone
    color: 'text-orange-500', 
    description: 'Average' 
  },
  { 
    label: 'C',  
    points: 2.25, 
    emoji: '😢', 
    gifUrl: 'https://i.giphy.com/media/ylV2FYACPNCXS/giphy.gif', // Crying Anime
    color: 'text-orange-600', 
    description: 'Below Average' 
  },
  { 
    label: 'D',  
    points: 2.00, 
    emoji: '😭', 
    gifUrl: 'https://i.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif', // Ugly Crying
    color: 'text-red-600', 
    description: 'Poor' 
  },
  { 
    label: 'F',  
    points: 0.00, 
    emoji: '💀', 
    gifUrl: 'https://i.giphy.com/media/hgw3fUE6wCRxC/giphy.gif', // Homer hiding in bush / Dead
    color: 'text-gray-600', 
    description: 'Fail' 
  },
];

export const getMoodForGPA = (gpa: number): GradeOption => {
  // Find the closest grade option based on points
  return GRADE_SCALE.reduce((prev, curr) => {
    return (Math.abs(curr.points - gpa) < Math.abs(prev.points - gpa) ? curr : prev);
  });
};