import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import Header from '../../components/ui/Header';
import { useEffect, useState } from 'react';
import { fetchEventById } from '@/api/event';
import { EventPageInformation } from '@/config/query-types';

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventPageInformation | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await fetchEventById(Number(id));
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        // You might want to add error handling here
      }
    };

    loadEvent();
  }, [id]);

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: 'Event Details',
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <Image
          source={{ uri: event.event_img }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {event.event_name}
          </Text>
          <View className="flex-row mb-4">
            <Text className="text-gray-500">{event.start_time.toString()}</Text>
            <Text className="text-gray-500 mx-2">•</Text>
            <Text className="text-gray-500">{event.event_location}</Text>
          </View>
          <Text className="text-gray-600 leading-6">
            {event.event_description}
          </Text>
        </View>
      </ScrollView>
    </>
  );
} 