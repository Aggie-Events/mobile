import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import Header from '../../components/ui/Header';

// In a real app, you would fetch the event data based on the ID
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