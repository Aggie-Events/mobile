import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { fetchUserEvents } from '@/api/event'
import { EventPageInformation } from '@/config/query-types'
import { useAuth } from '@/components/auth/AuthProvider'
import EventCard from '@/components/ui/EventCard'
import { tabBarHeight } from '@/constants/constants'
import { useRouter, useFocusEffect } from 'expo-router'

const MyEventsScreen = () => {
  const [events, setEvents] = useState<EventPageInformation[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const { height, width } = useWindowDimensions()

  const fetchEvents = async () => {
    if (!user || !user.user_name) { 
      console.warn("User not logged in or username not available.");
      return; 
    }
    try {
      const userEvents = await fetchUserEvents(user.user_name);
      setEvents(userEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  }

  const styles = StyleSheet.create({
    sectionTitle: {
      color: '#500000',
      fontWeight: '600',
      fontSize: 17,
      fontFamily: 'inter',
      marginLeft: 25,
      marginVertical: 15,
    },
    eventsContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingRight: 16,
    }
  })

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents()
    }, [])
  )

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight }}>
      <View className='bg-gray-50' style = {{ width: width, height: height }}>
        <Text style={styles.sectionTitle}>MY EVENTS</Text>

        {user?.user_name ? (
          <View style = {styles.eventsContent}>
            {events.map((event) => (
              <EventCard id={String(event.event_id)} event={event} multiplier={1.27} marginBottom={16} />
            ))}
          </View>
        ) : (
          <Text className='text-center text-gray-500 mt-10'>
            {user ? "Please enter your username to see your events." : "Please log in to see your events."}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default MyEventsScreen;