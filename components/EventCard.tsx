import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import type { Event } from '../config/dbtypes';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const {width, height} = useWindowDimensions();
  const truncateDescription = (text: string | null, maxLength: number = 150) => {
    if (!text) return "no description.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/event/${event.event_id}`} asChild>
      <Pressable style = {{ width: width / 1.5, marginHorizontal: 16 }}>
        {/* <Image
          source={{ uri: event.event_img }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        /> */}
        <View style = {{ width: width / 1.5, height: 160, backgroundColor: '#500000', borderRadius: 8 }}>
            <Text className="text-white font-bold text-xl px-3">
              Org Name Here?
            </Text>
        </View>
        <View style = {{ width: width / 1.5, height: 60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <View style = {{ flexDirection: 'column', width: width / 1.7}}>
            <Text className="text-sm font-bold text-gray-900">
              {event.event_name}
            </Text>
            <Text className="text-gray-600">
              {truncateDescription(event.event_description)}
            </Text>
          </View>
          <View style = {{ width: 10 }} />
        </View>
      </Pressable>
    </Link>
  );
} 