import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, Image, Pressable } from 'react-native';
import { tabBarHeight } from '@/constants/constants';
import { createEvent, CreateEventData } from '@/api/event';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons";
import { eventCardHeight } from '@/constants/constants';
import * as ImagePicker from 'expo-image-picker';

// TODO: Add image picker

export default function PublishPage() {
  const { width } = useWindowDimensions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
    },
    header: {
      marginBottom: 0,
    },
    title: {
      fontSize: 17,
      fontWeight: '300',
      color: '#333333',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
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
      fontSize: 20,
      color: '#333333',
      borderWidth: 1,
      borderColor: '#eeeeee',
      fontWeight: '600',
      height: 50,
    },
    textArea: {
      height: 100,
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
      marginBottom: 16,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    imageContainer: {
      width: eventCardHeight * 1.7,
      height: eventCardHeight * 1.7,
      backgroundColor: '#A54646',
      borderRadius: 12,
      alignSelf: 'center',
      marginBottom: 16,
    },
    imagePath: {
      height: 100,
      width: width / 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeContainer: {
      height: 100,
      width: width - 40 - (width / 8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      backgroundColor: '#500000',
      borderRadius: 10,
    },
    verticalDottedLine: {
      width: 1,
      height: 30,
      borderRadius: 1,
      borderWidth: 1,
      borderStyle: 'dotted',
      borderColor: '#500000',
    },
    imageLogo: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      width: 32,
      height: 32,
      backgroundColor: 'rgba(70, 70, 70, 0.6)',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

  const handleImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Header>
        <View style = {{ width: 40 }} />
      </Header>
      <ScrollView className="bg-gray-50" style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.title}>Publish Event</Text> */}
        {/* <Text style={styles.subtitle}>Share your next event with the community</Text> */}

        <Pressable style = {styles.imageContainer} onPress={handleImagePress}>
          <Image source={selectedImage ? { uri: selectedImage } : require('@/assets/images/default-event-image.png')} style = {styles.imageContainer} />
          <View style={styles.imageLogo}>
            <Ionicons name="image-outline" size={20} color="white" />
          </View>
        </Pressable>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Event Name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style = {[styles.input, { padding: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style = {styles.imagePath}>
              <View style = {[styles.dot, {marginBottom: 5}]} />
              <View style = {styles.verticalDottedLine} />
              <View style = {[styles.dot, { backgroundColor: '#f8f8f8', borderColor: '#500000', borderWidth: 2, marginTop: 5}]} />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {{ width: '100%', height: 50, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Start</Text>
              </View>
              <View style = {{ width: '100%', height: 50, justifyContent: 'center' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>End</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={[styles.input, { padding: 0, flexDirection: 'row', alignItems: 'center' }]}>
            <Ionicons name="location-outline" size={24} color="#500000" style={{ marginLeft: 12 }} />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#999', fontWeight: '600' }}>Choose Location</Text> 
          </View>
        </View>

        <View style={styles.inputGroup}>
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

        <View style={styles.inputGroup}>
          <View style={{ width: '100%', height: 1, borderTopWidth: 1, borderColor: 'rgb(200, 200, 200)' }} />
        </View>

        <Text style={{ fontSize: 13, color: '#333', fontWeight: '300', marginBottom: 16 }}>Options</Text>

        <View style={[styles.inputGroup, { marginBottom: 32 }]}>
          <View style={[styles.input, { padding: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.imagePath}>
              <Ionicons name="eye-outline" size={24} color="#500000" />
              <View style={[styles.verticalDottedLine, {height: 25, borderWidth: 0}]} />
              <Ionicons name="people-outline" size={24} color="#500000" />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {{ width: '100%', height: 50, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Visibility</Text>
              </View>
              <View style = {{ width: '100%', height: 50, justifyContent: 'center' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Capacity</Text>
              </View>
            </View>
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

        <View style = {{ height: tabBarHeight }} />
      </ScrollView>
    </>
  );
}
