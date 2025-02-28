import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Header from "@/components/ui/Header";

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'work' | 'social';
}

export default function CalendarPage() {
  const [selected, setSelected] = useState('');

  const events: Event[] = [
    { id: 1, title: 'Team Meeting', time: '09:00 AM', type: 'work' },
    { id: 2, title: 'Project Review', time: '02:30 PM', type: 'work' },
    { id: 3, title: 'Coffee Break', time: '04:00 PM', type: 'social' },
  ];

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Calendar
          onDayPress={(day: DateData) => setSelected(day.dateString)}
          markedDates={{
            [selected]: { selected: true, selectedColor: '#800000' },
          }}
          theme={{
            todayTextColor: '#800000',
            selectedDayBackgroundColor: '#800000',
            arrowColor: '#800000',
          }}
          style={styles.calendar}
        />
        
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>Today's Events</Text>
          <ScrollView style={styles.eventsList}>
            {events.map(event => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <BlurView intensity={90} tint="light" style={styles.eventCardInner}>
                  <View style={styles.eventTimeContainer}>
                    <IconSymbol name="gear" size={16} color="#666666" />
                    <Text style={styles.eventTime}>{event.time}</Text>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={[styles.eventType, { backgroundColor: event.type === 'work' ? '#E8F0FE' : '#FCE8E8' }]}>
                    <Text style={[styles.eventTypeText, { color: event.type === 'work' ? '#1967D2' : '#D93025' }]}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventsContainer: {
    flex: 1,
    padding: 20,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  eventsList: {
    flex: 1,
  },
  eventCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventCardInner: {
    padding: 16,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTime: {
    marginLeft: 6,
    color: '#666666',
    fontSize: 14,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  eventType: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});