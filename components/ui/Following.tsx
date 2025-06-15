import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView } from 'react-native';
import { EventPageInformation } from '@/config/query-types';
import { eventCardHeight } from '@/constants/constants';
import { defaultEventImage } from '@/constants/constants';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/components/auth/AuthProvider';

interface FollowingProps {
  followedEvents?: EventPageInformation[];
  scrollRef?: React.RefObject<ScrollView>;
  onScroll?: (event: any) => void;
}

const Following: React.FC<FollowingProps> = ({ followedEvents = [], scrollRef, onScroll }) => {
  const { width } = useWindowDimensions();
  const eventCardMultiplier = 1.1;
  const { user } = useAuth();

  const styles = StyleSheet.create({
    sectionTitle: {
      color: '#500000',
      fontWeight: '600',
      fontSize: 17,
      fontFamily: 'inter',
      marginLeft: 25,
      marginVertical: 15,
    },
    refreshButton: {
      marginLeft: 10,
      padding: 6,
      borderRadius: 20,
      backgroundColor: '#F3F3F3',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: '#A54646',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 40,
      fontFamily: 'inter',
      fontWeight: '500',
      paddingHorizontal: 60,
    },
    eventCard: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 14,
      padding: 10,
      shadowColor: '#800000',
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
      width: width * 0.43,
      marginHorizontal: 7,
    },
    eventImage: {
      width: eventCardHeight * eventCardMultiplier,
      height: eventCardHeight * eventCardMultiplier,
      alignSelf: 'center',
      backgroundColor: '#500000',
      borderRadius: 8,
    },
    eventInfo: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    eventName: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#500000',
      fontFamily: 'inter',
      textAlign: 'center',
      marginTop: 8,
    },
    orgName: {
      fontWeight: '400',
      fontSize: 13,
      color: '#A54646',
      fontFamily: 'inter',
    },
  });

  const navigateToEvent = (eventId: number) => {
    router.navigate({
      pathname: '/event/[id]',
      params: { id: eventId },
    });
  };

  return (
    <ScrollView ref={scrollRef} onScroll={onScroll} scrollEventThrottle={16}>

      <Text style={styles.sectionTitle}>FOLLOWING</Text>

      {followedEvents.length === 0 ? (
        <Text className='text-center text-gray-500 mt-3'>{user ? 'No events followed!' : 'You are not signed in. Please log in to see your followed events!'}</Text>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14 }}>
          {followedEvents.map((item) => (
            <Pressable style={styles.eventCard} key={item.event_id} onPress={() => navigateToEvent(item.event_id)}>
              <Image
                style={styles.eventImage}
                source={item.event_img ? { uri: item.event_img } : defaultEventImage}
                resizeMode="cover"
              />
              <Text style={styles.eventName}>{item.event_name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default React.memo(Following);
