import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from "react-native";
import EventCard from '../../components/EventCard';

// Mock data - replace with real data later
const mockEvents = [
  {
    id: '1',
    title: 'Aggie Ring Day',
    description: 'Join us for the traditional Aggie Ring Day ceremony! This momentous occasion celebrates...',
    imageUrl: 'https://www.aggienetwork.com/Content/f1/images/building2.jpg',
    date: 'April 12, 2024',
    location: 'Clayton W. Williams, Jr. Alumni Center'
  },
  {
    id: '2',
    title: 'MSC Open House',
    description: 'Discover student organizations and get involved on campus...',
    imageUrl: 'https://www.tamu.edu/_files/images/traditions/msc-building-sign.jpg',
    date: 'March 25, 2024',
    location: 'Memorial Student Center'
  },
  // Add more mock events as needed
];

type Tab = 'for you' | 'following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('for you');

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row justify-center bg-white border-b border-gray-200">
        {(['for you', 'following'] as Tab[]).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-6 py-4 ${
              activeTab === tab ? 'border-b-2 border-maroon-600' : ''
            }`}
          >
            <Text
              className={`text-lg capitalize ${
                activeTab === tab ? 'text-maroon-600 font-semibold' : 'text-gray-600'
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}
