import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Event } from '@/config/dbtypes';
import { EventPageInformation } from '@/config/query-types';
import { eventCardHeight } from '@/constants/constants';
import { defaultEventImage } from '@/constants/constants';
import { useRouter } from 'expo-router';

interface EventCardProps {
  event: Event | EventPageInformation;
  id: string;
  multiplier?: number;
  marginBottom?: number;
  onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, id, multiplier = 1.1, marginBottom = 0, onPress }) => {
  const router = useRouter();
  const truncateDescription = (text: string | null, maxLength: number = 150) => {
    if (!text) return "no description.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const goToEventDetails = () => {
    router.push(`/(tabs)/(explore)/event/${event.event_id}`);
  }

  return (
    <Pressable style = {{ width: eventCardHeight * multiplier, marginLeft: 16, marginBottom }} onPress={onPress ?? goToEventDetails}>
      <Image
        source={event.event_img ? { uri: event.event_img } : defaultEventImage}
        style = {{ width: eventCardHeight * multiplier, height: eventCardHeight * multiplier, backgroundColor: '#500000', borderRadius: 8 }}
        resizeMode="cover"
      />
      {/* <View style = {{ width: eventCardHeight * multiplier, height: eventCardHeight * multiplier, backgroundColor: '#500000', borderRadius: 8 }}>
        <Text className="text-white font-bold text-xl px-3">
          Org Name Here?
        </Text>
      </View> */}
      <View style = {{ width: eventCardHeight * multiplier, justifyContent: 'center', alignItems: 'center' }}>
        <View style = {{ width: eventCardHeight * multiplier, alignSelf: 'center', paddingHorizontal: 10}}>
          <Text className="text-sm font-bold text-gray-900" style = {{textAlign: 'center'}}>
            {event.event_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
} 

export default React.memo(EventCard);