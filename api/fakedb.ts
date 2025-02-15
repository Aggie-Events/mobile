let mockE: Event[] = [
  {
    id: '1',
    title: 'Campus Fair',
    description: 'Discover student organizations and get involved on campus. Free event and highly recommended for new students!',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2023-10-15',
    location: 'Main Hall',
  },
  {
    id: '2',
    title: 'Tech Conference',
    description: 'Join us for a day of tech talks and networking with industry leaders.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2023-11-20',
    location: 'Tech Park',
  },
  {
    id: '3',
    title: 'Art Exhibition',
    description: 'Explore the latest art pieces from local artists.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2023-12-05',
    location: 'Art Gallery',
  },
  {
    id: '4',
    title: 'Music Festival',
    description: 'Enjoy live performances from various bands and artists.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-01-10',
    location: 'City Park',
  },
  {
    id: '5',
    title: 'Food Fair',
    description: 'Taste delicious dishes from around the world.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-02-14',
    location: 'Downtown',
  },
  {
    id: '6',
    title: 'Book Launch',
    description: 'Meet the author and get your book signed.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-03-22',
    location: 'Library',
  },
  {
    id: '7',
    title: 'Science Fair',
    description: 'Discover innovative projects by students and researchers.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-04-18',
    location: 'Convention Center',
  },
  {
    id: '8',
    title: 'Film Screening',
    description: 'Watch the latest indie films and meet the directors.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-05-30',
    location: 'Cinema Hall',
  },
  {
    id: '9',
    title: 'Charity Run',
    description: 'Participate in a run to support local charities.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-06-15',
    location: 'City Stadium',
  },
  {
    id: '10',
    title: 'Tech Meetup',
    description: 'Network with tech enthusiasts and professionals.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-07-20',
    location: 'Tech Hub',
  },
  {
    id: '11',
    title: 'Cultural Festival',
    description: 'Experience diverse cultures through music, dance, and food.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-08-25',
    location: 'Cultural Center',
  },
  {
    id: '12',
    title: 'Startup Pitch',
    description: 'Watch startups pitch their ideas to investors.',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: '2024-09-10',
    location: 'Innovation Lab',
  },
];
mockE.reverse();


export const mockEvents = mockE;

// Make sure to import the Event type
import { Event } from '../types/event';
