import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { tabBarHeight } from './_layout';

export default function PublishPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'event',
  });

  return (
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
                <Text style={styles.inputText}>{formData.date || 'Select date'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.input}>
              <View style={styles.iconInput}>
                <IconSymbol name="clock" size={20} color="#666666" />
                <Text style={styles.inputText}>{formData.time || 'Select time'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeOption,
              formData.type === 'event' && styles.typeOptionSelected,
            ]}
            onPress={() => setFormData({ ...formData, type: 'event' })}
          >
            <IconSymbol
              name="calendar.badge.plus"
              size={24}
              color={formData.type === 'event' ? '#800000' : '#666666'}
            />
            <Text
              style={[
                styles.typeText,
                formData.type === 'event' && styles.typeTextSelected,
              ]}
            >
              Event
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeOption,
              formData.type === 'post' && styles.typeOptionSelected,
            ]}
            onPress={() => setFormData({ ...formData, type: 'post' })}
          >
            <IconSymbol
              name="doc.text"
              size={24}
              color={formData.type === 'post' ? '#800000' : '#666666'}
            />
            <Text
              style={[
                styles.typeText,
                formData.type === 'post' && styles.typeTextSelected,
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style = {{ height: tabBarHeight }} />
    </ScrollView>
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