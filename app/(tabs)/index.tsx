import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from "react-native";
import EventCard from '../../components/EventCard';
import { mockEvents } from '@/api/fakedb';
import { tabBarHeight } from './_layout';

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
        <View style = {{ height: tabBarHeight }} />
      </ScrollView>
    </View>
  );
}
