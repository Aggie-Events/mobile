import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { tabBarHeight } from './_layout';
import { createEvent, CreateEventData } from '@/api/event';
import Header from '@/components/ui/Header';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function PublishPage() {
  const { width, height } = useWindowDimensions();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });

  const handlePublish = async () => {
    const eventData: CreateEventData = {
      event_name: formData.title,
      event_description: formData.description,
      event_location: null,
      event_status: 'published',
      start_time: new Date(formData.start_time),
      end_time: new Date(formData.end_time),
      tags: [],
    };

    const createdEvent = await createEvent(eventData);

    if (createdEvent) {
      console.log('Event created successfully:', createdEvent);
    } else {
      console.error('Failed to create event');
    }
  };

  return (
    <>
      <Header>
        <View style = {{ width: width, height: height / 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style = {{ width: 40, height: 40, marginLeft: 20 }}
          />
          <MaskedView maskElement={<Text style = {{ fontSize: 25, fontFamily: 'inter', fontWeight: 'bold', textAlign: 'center' }}>AggieEvents</Text>}>
            <LinearGradient
              colors={["white", "#c2c2c2"]} // Gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: 200, height: 30 }}
            />
          </MaskedView>
          
          {/* Used for padding right side */}
          <View style = {{ width: 59 }} />
        </View>
      </Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Event</Text>
        <Text style={styles.subtitle}>Share your next event with the community</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Enter event title"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Describe your event"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.input}>
              <View style={styles.iconInput}>
                <IconSymbol name="calendar" size={20} color="#666666" />
                <Text style={styles.inputText}>{formData.start_time || 'Select date'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.input}>
              <View style={styles.iconInput}>
                <IconSymbol name="clock" size={20} color="#666666" />
                <Text style={styles.inputText}>{formData.start_time || 'Select time'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <TouchableOpacity style={styles.submitButton} onPress={handlePublish}>
          <Text style={styles.submitButtonText}>Publish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => {
          setFormData({
            title: 'Test Event',
            description: 'This is a test event',
            start_time: '2025-01-01',
            end_time: '2025-01-01',
          });
          handlePublish(); }}>
          <Text style={styles.submitButtonText}>Publish Test Event</Text>
        </TouchableOpacity>
      </View>
      <View style = {{ height: tabBarHeight }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputText: {
    fontSize: 16,
    color: '#999999',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  typeOption: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionSelected: {
    borderColor: '#800000',
    backgroundColor: '#fff',
  },
  typeText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  typeTextSelected: {
    color: '#800000',
  },
  submitButton: {
    backgroundColor: '#800000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
