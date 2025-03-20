import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import EventCard from '../../components/EventCard';
import { mockEvents } from '@/api/fakedb';
import { fetchEvents, searchEvents } from '@/api/event';
import { Event } from '@/config/dbtypes';
import { tabBarHeight } from './_layout';
import { testApi } from '@/api/test';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type Tab = 'for you' | 'following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('for you');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '19658597217-enl8en0fnhsvilikd14gl260705m2e9o.apps.googleusercontent.com', // TODO: update this
      webClientId: '19658597217-q87pq51i57uhml4bs9r5q0itbb81imi7.apps.googleusercontent.com', // TODO: update this
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const result = await fetchEvents();
        setEvents(result);
      } catch (error) {
        console.error("Error calling testApi:", error);
      }
    };

    getEvents();
  }, [activeTab]); // refresh when tab is changed

  return (
    <View className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
      </TouchableWithoutFeedback>

      <FlatList 
        data = {events}
        keyExtractor = {(event) => event.event_id.toString()}
        renderItem = {({ item }) => (
          <EventCard key={item.event_id} event={item} />
        )}
        ListHeaderComponent={<View className='pt-4' />}
        ListFooterComponent={<View style = {{ height: tabBarHeight }} />}
      />
    </View>
  );
}
