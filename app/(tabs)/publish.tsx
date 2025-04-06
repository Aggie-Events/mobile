import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { tabBarHeight } from './_layout';
import { createEvent, CreateEventData } from '@/api/event';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from "@/components/ui/Header";

const SUGGESTED_TAGS = [
  'Music',
  'Art',
  'Technology',
  'Sports',
  'Food',
  'Education',
  'Networking',
  'Business',
  'Entertainment',
  'Charity',
  'Workshop',
  'Conference',
  'Social',
  'Cultural',
  'Community',
  'Festival',
  'Concert',
  'Exhibition',
  'Party',
  'Seminar'
];

// You'll need to replace this with your actual Google Places API key
// const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default function PublishPage() {
  const [formData, setFormData] = useState({
    title: '',
    tags: [] as string[],
    description: '',
    start_time: '',
    end_time: '',
  });

  const handlePublish = async () => {
    const eventData: CreateEventData = {
      event_name: formData.title,
      event_description: formData.description,
      event_location: null,
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
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    location: '',
    image: '',
  });

  const [showPicker, setShowPicker] = useState({
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  });

  const [isCustomLocation, setIsCustomLocation] = useState(false);
  const locationRef = useRef(null);

  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined, field: 'startDate' | 'endDate') => {
    setShowPicker({ ...showPicker, [field]: Platform.OS === 'ios' });
    if (selectedDate) {
      setFormData({ ...formData, [field]: selectedDate });
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined, field: 'startTime' | 'endTime') => {
    setShowPicker({ ...showPicker, [field]: Platform.OS === 'ios' });
    if (selectedTime) {
      setFormData({ ...formData, [field]: selectedTime });
    }
  };

  const handleLocationSelect = (data: any, details: any | null = null) => {
    const locationName = details?.formatted_address || data.description;
    setFormData({ ...formData, location: locationName });
  };

  const toggleLocationInput = () => {
    setIsCustomLocation(!isCustomLocation);
    if (!isCustomLocation) {
      setFormData({ ...formData, location: '' });
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag.trim()]
      });
      setTagInput('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagInputChange = (text: string) => {
    if (text === '' && tagInput === '') {
      // If backspace is pressed with an empty input, remove the last tag
      if (formData.tags.length > 0) {
        handleRemoveTag(formData.tags[formData.tags.length - 1]);
      }
    } else {
      setTagInput(text);
      if (text.trim()) {
        const filteredTags = SUGGESTED_TAGS.filter(tag => 
          tag.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestedTags(filteredTags);
        setShowSuggestions(true);
      } else {
        setSuggestedTags([]);
        setShowSuggestions(false);
      }
    }
  };

  // const renderLocationInput = () => {
  //   if (isCustomLocation) {
  //     return (
  //       <TextInput
  //         style={styles.input}
  //         value={formData.location}
  //         onChangeText={(text) => setFormData({ ...formData, location: text })}
  //         placeholder="Enter custom location"
  //         placeholderTextColor="#999"
  //       />
  //     );
  //   }

    // return (
      // <GooglePlacesAutocomplete
      //   ref={locationRef}
      //   placeholder="Search for a location"
      //   onPress={handleLocationSelect}
      //   query={{
      //     key: GOOGLE_PLACES_API_KEY,
      //     language: 'en',
      //   }}
      //   styles={{
      //     container: {
      //       flex: 0,
      //     },
      //     textInput: {
      //       ...styles.input,
      //       height: undefined,
      //       backgroundColor: '#f8f8f8',
      //       fontSize: 16,
      //       marginBottom: 0,
      //     },
      //     listView: {
      //       backgroundColor: '#fff',
      //       borderWidth: 1,
      //       borderColor: '#eeeeee',
      //       borderRadius: 12,
      //       marginTop: 5,
      //       overflow: 'hidden',
      //     },
      //     row: {
      //       padding: 13,
      //       height: 44,
      //       flexDirection: 'row',
      //     },
      //     separator: {
      //       height: 1,
      //       backgroundColor: '#eeeeee',
      //     },
      //     description: {
      //       fontSize: 14,
      //     },
      //   }}
      //   enablePoweredByContainer={false}
      //   fetchDetails={true}
      //   textInputProps={{
      //     placeholderTextColor: '#999',
      //   }}
      // />
  //   );
  // };

  return (
    <>
      <Header />
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
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagInputContainer}>
              <View style={styles.tagScrollContent}>
                {formData.tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tagChip}
                    onPress={() => handleRemoveTag(tag)}
                  >
                    <Text style={styles.tagChipText}>{tag}</Text>
                    <IconSymbol name="xmark" size={16} color="#666666" />
                  </TouchableOpacity>
                ))}
                <TextInput
                  style={styles.tagInput}
                  value={tagInput}
                  onChangeText={handleTagInputChange}
                  placeholder={formData.tags.length ? "" : "Add tags"}
                  placeholderTextColor="#999"
                  onSubmitEditing={() => handleAddTag(tagInput)}
                />
              </View>
            </View>
            {showSuggestions && suggestedTags.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={suggestedTags}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleAddTag(item)}
                    >
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionsList}
                  nestedScrollEnabled
                />
              </View>
            )}
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
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowPicker({ ...showPicker, startDate: true })}
              >
                <View style={styles.iconInput}>
                  <IconSymbol name="calendar" size={20} color="#666666" />
                  <Text style={styles.inputText}>{formatDate(formData.startDate)}</Text>
                </View>
              </TouchableOpacity>
              {showPicker.startDate && (
                <DateTimePicker
                  value={formData.startDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange(event, date, 'startDate')}
                />
              )}
            </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.input}>
              <View style={styles.iconInput}>
                <IconSymbol name="clock" size={20} color="#666666" />
                <Text style={styles.inputText}>{formData.start_time || 'Select time'}</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowPicker({ ...showPicker, startTime: true })}
              >
                <View style={styles.iconInput}>
                  <IconSymbol name="clock" size={20} color="#666666" />
                  <Text style={styles.inputText}>{formatTime(formData.startTime)}</Text>
                </View>
              </TouchableOpacity>
              {showPicker.startTime && (
                <DateTimePicker
                  value={formData.startTime}
                  mode="time"
                  display="default"
                  onChange={(event, time) => handleTimeChange(event, time, 'startTime')}
                />
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowPicker({ ...showPicker, endDate: true })}
              >
                <View style={styles.iconInput}>
                  <IconSymbol name="calendar" size={20} color="#666666" />
                  <Text style={styles.inputText}>{formatDate(formData.endDate)}</Text>
                </View>
              </TouchableOpacity>
              {showPicker.endDate && (
                <DateTimePicker
                  value={formData.endDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => handleDateChange(event, date, 'endDate')}
                />
              )}
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
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowPicker({ ...showPicker, endTime: true })}
              >
                <View style={styles.iconInput}>
                  <IconSymbol name="clock" size={20} color="#666666" />
                  <Text style={styles.inputText}>{formatTime(formData.endTime)}</Text>
                </View>
              </TouchableOpacity>
              {showPicker.endTime && (
                <DateTimePicker
                  value={formData.endTime}
                  mode="time"
                  display="default"
                  onChange={(event, time) => handleTimeChange(event, time, 'endTime')}
                />
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Location</Text>
              <TouchableOpacity onPress={toggleLocationInput}>
                <Text style={styles.toggleText}>
                  {isCustomLocation ? 'Use Autocomplete' : 'Enter Custom'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
              placeholder="Enter event location"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Image</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {formData.image ? (
                <Image source={{ uri: formData.image }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <IconSymbol name="photo" size={24} color="#666666" />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: tabBarHeight }} />
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
    color: '#333333',
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
  imageUpload: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#666666',
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 14,
    color: '#800000',
    fontWeight: '500',
  },
  tagInputContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
    padding: 8,
    minHeight: 50,
  },
  tagScrollContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#800000',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagChipText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  tagInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    minWidth: 100,
    padding: 4,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginTop: 4,
    zIndex: 1000,
    maxHeight: 200,
  },
  suggestionsList: {
    padding: 8,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333333',
  },
});