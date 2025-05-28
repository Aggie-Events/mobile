import React from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import type { Event } from '../config/dbtypes';
import { eventCardHeight } from '@/constants/constants';

interface EventCardProps {
  event: Event;
  id: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, id }) => {
  const multiplier = 1.1;
  const truncateDescription = (text: string | null, maxLength: number = 150) => {
    if (!text) return "no description.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link key={id} href={`/event/${event.event_id}`} asChild>
      <Pressable style = {{ width: eventCardHeight * multiplier, marginLeft: 16 }}>
        <Image
          source={event.event_img ? { uri: event.event_img } : require('../assets/images/default-event-image.png')}
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
    </Link>
  );
} 

export default React.memo(EventCard);