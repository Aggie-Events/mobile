import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { fetchEventById } from '@/api/event';
import { EventPageInformation } from '@/config/query-types';
import { defaultEventImage, eventCardHeight } from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { tabBarHeight } from '@/constants/constants';
import { fetchFollowedEvents } from '@/api/user';
import { followEventForUser, unfollowEventForUser } from '@/api/event';
import { useAuth } from '@/components/auth/AuthProvider';
import Toast from 'react-native-toast-message';

const imageMultiplier = 1.7;

const styles = StyleSheet.create({
  imageContainer: {
    width: eventCardHeight * imageMultiplier,
    height: eventCardHeight * imageMultiplier,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#A54646',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#800000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    padding: 16,
    marginTop: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 8,
    fontFamily: 'inter',
    textAlign: 'center',
  },
  section: {
    marginBottom: 12,
  },
  label: {
    color: '#A54646',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 6,
    fontFamily: 'inter',
  },
  value: {
    color: '#6B2323', // darker maroon for better contrast
    fontSize: 15,
    fontFamily: 'inter',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  tag: {
    backgroundColor: '#800000',
    color: 'white',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'inter',
    overflow: 'hidden',
  },
  description: {
    color: '#6B2323', // darker maroon for description too
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 12,
    fontFamily: 'inter',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#800000',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
    shadowColor: '#800000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'inter',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 5,
    borderRadius: 1,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  statIcon: {
    fontSize: 16,
    color: '#800000',
  },
  statValue: {
    color: '#800000',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'inter',
  },
});

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventPageInformation | null>(null);
  const { user } = useAuth();
  const [eventIsFollowed, setEventIsFollowed] = useState<boolean>(false);

  const followEvent = async () => {
    if (!event) return;
    if (!user) {
      Toast.show({
        type: "error",
        text1: "You must be logged in to follow events."
      });
      return;
    }
    if (user.user_name === event.contributor_name) {
      Toast.show({
        type: "error",
        text1: "You cannot follow your own event."
      });
      return;
    }

    try {
      const savedEvent = await followEventForUser(event.event_id);
      if (savedEvent) {
        Toast.show({
          type: "success",
          text1: "Event followed successfully!"
        });
        router.back();
      }
    } catch (error) {
      console.error('Error following event:', error);
    }
  };

  const unfollowEvent = async () => {
    if (!event) return;
    if (!user) {
      Toast.show({
        type: "error",
        text1: "You must be logged in to unfollow events."
      });
      return;
    }
    if (user.user_name === event.contributor_name) {
      Toast.show({
        type: "error",
        text1: "You cannot unfollow your own event."
      });
      return;
    }
    try {
      const savedEvent = await unfollowEventForUser(event.event_id);
      if (savedEvent) {
        Toast.show({
          type: "success",
          text1: "Event unfollowed successfully!"
        });
        router.back();
      }
    } catch (error) {
      console.error('Error unfollowing event:', error);
    }
  };

  const loadEvent = async () => {
    // Load Event
    try {
      const eventData = await fetchEventById(Number(id));
      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching event:', error);
    }

    // Check if event is followed
    if (user) {
      try {
        const followedEvents = await fetchFollowedEvents();
        const isFollowed = followedEvents.some((e) => e.event_id === Number(id));
        setEventIsFollowed(isFollowed);
      } catch (error) {
        console.error('Error fetching followed events:', error);
      }
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-500">Loading event details...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={event.event_img ? { uri: event.event_img } : defaultEventImage}
        style={styles.imageContainer}
        resizeMode="cover"
      />
      <View className="px-4 py-4">
        <View style={styles.card}>
          <Text style={styles.title}>{event.event_name}</Text>

          {/* Date & Time Row */}
          <View style={[styles.section, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 18 }]}>
            <Text style={{ color: '#800000', fontWeight: '600', fontFamily: 'inter', fontSize: 16 }}>
              {event.start_time instanceof Date
                ? event.start_time.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                : new Date(event.start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </Text>
            <Text style={{ color: '#A54646', fontWeight: '600', marginHorizontal: 8, fontSize: 16 }}>–</Text>
            <Text style={{ color: '#800000', fontWeight: '600', fontFamily: 'inter', fontSize: 16 }}>
              {event.end_time instanceof Date
                ? event.end_time.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                : new Date(event.end_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </Text>
          </View>

          {/* Details Section */}
          <View style={[styles.section, { marginBottom: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>{event.event_location || 'No location'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={styles.label}>Organization:</Text>
              <Text style={styles.value}>{event.org_name ?? 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>Created by:</Text>
              <Text style={styles.value}>{`@${event.contributor_name}`}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={[styles.section, { marginBottom: 8 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 6 }}>
              <View style={styles.statRow}>
                <Text style={styles.statIcon}>🔖</Text>
                <Text style={styles.statValue}>{event.event_saves ?? 0} {event.event_saves === 1 ? 'Follow' : 'Follows'}</Text>
              </View>
              <View style={[styles.statRow, { marginLeft: 18 }]}>
                <Ionicons name="people" size={18} color="red" style={{ marginRight: 4 }} />
                <Text style={styles.statValue}>
                  {event.max_capacity !== null && event.max_capacity > 0
                    ? `${event.max_capacity} Max`
                    : 'No Limit'}
                </Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View style={[styles.section, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }]}>
            {event.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.description}>
            {event.event_description || 'No description provided.'}
          </Text>

          {/* Created/Modified */}
          <View style={[styles.section, { alignItems: 'center', marginTop: 8 }]}>
            <Text style={{ color: '#A54646', fontSize: 13, fontFamily: 'inter' }}>
              Created: {event.date_created instanceof Date
                ? event.date_created.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                : new Date(event.date_created).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </Text>
            <Text style={{ color: '#A54646', fontSize: 13, fontFamily: 'inter' }}>
              Last Modified: {event.date_modified instanceof Date
                ? event.date_modified.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                : new Date(event.date_modified).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </Text>
          </View>

          {/* Follow/Unfollow Button */}
          {user && user.user_name !== event.contributor_name ? (
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={eventIsFollowed ? unfollowEvent : followEvent}
            >
              <Text style={styles.saveButtonText}>
                {eventIsFollowed ? 'Unfollow Event' : 'Follow Event'}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: '#A54646', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
              {user ? 'You cannot follow/unfollow your own event.' : 'You must be logged in to follow/unfollow events.'}
            </Text>
          )}
        </View>
        <View style = {{ height: tabBarHeight }} />
      </View>
    </ScrollView>
  );
}