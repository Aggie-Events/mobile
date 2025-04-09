import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import type { Event } from '../config/dbtypes';

interface EventCardProps {
  event: Event;
  id: string;
}

export default function EventCard({ event, id }: EventCardProps) {
  const cardWidth = 160;
  const truncateDescription = (text: string | null, maxLength: number = 150) => {
    if (!text) return "no description.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link key={id} href={`/event/${event.event_id}`} asChild>
      <Pressable style = {{ width: cardWidth, marginLeft: 16 }}>
        {/* <Image
          source={{ uri: event.event_img }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        /> */}
        <View style = {{ width: cardWidth, height: 140, backgroundColor: '#500000', borderRadius: 8 }}>
          <Text className="text-white font-bold text-xl px-3">
            Org Name Here?
          </Text>
        </View>
        <View style = {{ width: cardWidth, justifyContent: 'center', alignItems: 'center' }}>
          <View style = {{ width: cardWidth, alignSelf: 'center', paddingHorizontal: 10}}>
            <Text className="text-sm font-bold text-gray-900" style = {{textAlign: 'center'}}>
              {event.event_name}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
} 