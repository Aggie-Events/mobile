import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import type { Event } from '../types/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/event/${event.id}`} asChild>
      <Pressable className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden px-4">
        <Image
          source={{ uri: event.imageUrl }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-2">
            {event.title}
          </Text>
          <Text className="text-gray-600">
            {truncateDescription(event.description)}
          </Text>
          <View className="flex-row mt-2 items-center">
            <Text className="text-gray-500 text-sm">{event.date}</Text>
            <Text className="text-gray-500 text-sm mx-2">•</Text>
            <Text className="text-gray-500 text-sm">{event.location}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
} 