
import { User, Match, Message } from '@/types/User';

export const currentUser: User = {
  id: 'current-user',
  name: 'You',
  age: 28,
  bio: 'Love hiking, coffee, and good conversations. Looking for someone to explore the city with!',
  location: 'San Francisco, CA',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
  ],
  interests: ['Hiking', 'Coffee', 'Travel', 'Photography'],
  gender: 'male',
  lookingFor: 'everyone',
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 26,
    bio: 'Adventure seeker and foodie. Always up for trying new restaurants or planning the next trip! 🌍✈️',
    location: 'San Francisco, CA',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    ],
    interests: ['Travel', 'Food', 'Yoga', 'Photography'],
    gender: 'female',
    lookingFor: 'male',
    distance: 2,
  },
  {
    id: '2',
    name: 'Michael',
    age: 30,
    bio: 'Software engineer by day, musician by night. Love live music and craft beer. Let&apos;s jam! 🎸',
    location: 'Oakland, CA',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
    ],
    interests: ['Music', 'Coding', 'Beer', 'Gaming'],
    gender: 'male',
    lookingFor: 'female',
    distance: 5,
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    bio: 'Artist and coffee enthusiast ☕ Looking for someone who appreciates art galleries and lazy Sunday mornings.',
    location: 'Berkeley, CA',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    ],
    interests: ['Art', 'Coffee', 'Reading', 'Museums'],
    gender: 'female',
    lookingFor: 'everyone',
    distance: 8,
  },
  {
    id: '4',
    name: 'James',
    age: 29,
    bio: 'Fitness enthusiast and outdoor lover. Marathon runner training for my next race. Join me for a run? 🏃‍♂️',
    location: 'San Francisco, CA',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    ],
    interests: ['Fitness', 'Running', 'Hiking', 'Health'],
    gender: 'male',
    lookingFor: 'female',
    distance: 3,
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    bio: 'Book lover and aspiring writer. Netflix binges and wine nights are my thing. Let&apos;s discuss our favorite shows! 📚🍷',
    location: 'San Francisco, CA',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    ],
    interests: ['Reading', 'Writing', 'Movies', 'Wine'],
    gender: 'female',
    lookingFor: 'male',
    distance: 4,
  },
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    user: mockUsers[0],
    matchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastMessage: 'Hey! How&apos;s your day going?',
    unreadCount: 2,
  },
  {
    id: 'm2',
    user: mockUsers[2],
    matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastMessage: 'That sounds amazing! I&apos;d love to check it out.',
    unreadCount: 0,
  },
  {
    id: 'm3',
    user: mockUsers[4],
    matchedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastMessage: 'Have you seen the new season?',
    unreadCount: 1,
  },
];

export const mockMessages: { [matchId: string]: Message[] } = {
  'm1': [
    {
      id: 'msg1',
      senderId: '1',
      receiverId: 'current-user',
      text: 'Hi! Thanks for matching with me!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg2',
      senderId: 'current-user',
      receiverId: '1',
      text: 'Hey! Nice to meet you! I saw you love hiking too.',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg3',
      senderId: '1',
      receiverId: 'current-user',
      text: 'Yes! I try to go every weekend. Do you have a favorite trail?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg4',
      senderId: '1',
      receiverId: 'current-user',
      text: 'Hey! How&apos;s your day going?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
  ],
  'm2': [
    {
      id: 'msg5',
      senderId: 'current-user',
      receiverId: '3',
      text: 'I love your art! Do you have a gallery?',
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg6',
      senderId: '3',
      receiverId: 'current-user',
      text: 'Thank you! I have a small exhibition next month at the local gallery.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg7',
      senderId: 'current-user',
      receiverId: '3',
      text: 'That sounds amazing! I&apos;d love to check it out.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
  ],
  'm3': [
    {
      id: 'msg8',
      senderId: '5',
      receiverId: 'current-user',
      text: 'Have you seen the new season?',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: false,
    },
  ],
};
