import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import type { Event } from '../config/dbtypes';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const truncateDescription = (text: string | null, maxLength: number = 150) => {
    if (!text) return "no description.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/event/${event.event_id}`} asChild>
      <Pressable className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden px-4">
        <Image
          source={{ uri: event.event_img }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-2">
            {event.event_name}
          </Text>
          <Text className="text-gray-600">
            {truncateDescription(event.event_description)}
          </Text>
          <View className="flex-row mt-2 items-center">
            <Text className="text-gray-500 text-sm">{event.start_time.toString()}</Text>
            <Text className="text-gray-500 text-sm mx-2">•</Text>
            <Text className="text-gray-500 text-sm">{event.event_location}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
} 