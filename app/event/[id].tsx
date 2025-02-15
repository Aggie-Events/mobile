import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import Header from '../../components/ui/Header';
import { mockEvents } from '@/api/fakedb';

export default function EventPage() {
  const { id } = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen />
      <ScrollView className="flex-1 bg-white">
        <Image
          source={{ uri: mockEvents.find(event => event.id === id)?.imageUrl }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {mockEvents.find(event => event.id === id)?.title}
          </Text>
          <View className="flex-row mb-4">
            <Text className="text-gray-500">{mockEvents.find(event => event.id === id)?.date}</Text>
            <Text className="text-gray-500 mx-2">•</Text>
            <Text className="text-gray-500">{mockEvents.find(event => event.id === id)?.location}</Text>
          </View>
          <Text className="text-gray-600 leading-6">
            {mockEvents.find(event => event.id === id)?.description}
          </Text>
        </View>
      </ScrollView>
    </>
  );
} 