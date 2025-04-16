import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, Image, Pressable, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { tabBarHeight } from '@/constants/constants';
import { createEvent, CreateEventData } from '@/api/event';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons";
import { eventCardHeight } from '@/constants/constants';
import * as ImagePicker from 'expo-image-picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// TODO: Tag Selection

interface SelectableTag {
  name: string;
  selected: boolean;
}

export default function PublishPage() {

  const formatDate = (date: Date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let returnString = "";
    returnString += daysOfWeek[date.getDay()] + ", ";
    returnString += months[date.getMonth()] + " " + date.getDate() + " at ";
    returnString += (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getHours() >= 12 ? "PM" : "AM");
    return returnString;
  };

  const { width, height } = useWindowDimensions();
  const tags = ['Academic', 'Arts', 'Career', 'Cultural', 'Recreation', 'Service', 'Social', 'Sports', 'Other'];
  const [selectedTags, setSelectedTags] = useState<SelectableTag[]>(tags.map(tag => ({ name: tag, selected: false } as SelectableTag)));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibilityIndex, setVisibilityIndex] = useState<number>(0);
  const visibilityOptions = ['Public', 'Private'];
  const capacityInputRef = useRef<string>('');
  const [capacity, setCapacity] = useState<string>('Unlimited');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [datePickerDate, setDatePickerDate] = useState<Date>(new Date());
  const didSelectStart = useRef<boolean>(false);
  const didSelectEnd = useRef<boolean>(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = [height * 0.45, height * 0.75];
  const [snap, setSnap] = useState<number>(0);
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

  const presentBottomSheet = () => {
    setSnap(0);
    bottomSheetModalRef.current?.present();
  };

  const handleTouchStart = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      setSnap(0);
    }
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
    capacityInputRef.current = '';
  };

  const handleCapacityChange = (cap: string) => {
    cap == "" || cap == "0"? setCapacity('Unlimited') : setCapacity(cap);
    handleDismiss();
  };

  const handleTextInputFocus = useCallback(() => {
    setSnap(1);
  }, []);

  const handleDateConfirm = (date: Date) => {
    if (didSelectStart.current) {
      setStartDate(date);
    }
    else {
      setEndDate(date);
    }
    setShowDatePicker(false);
  };

  const handleDateCancel = () => {
    didSelectStart.current = false;
    didSelectEnd.current = false;
    setShowDatePicker(false);
  };

  const handlePickerSelect = (preset: string) => {
    if (preset == "start") {
      setDatePickerDate(startDate);
      didSelectStart.current = true;
    } 
    else {
      setDatePickerDate(endDate);
      didSelectEnd.current = true;
    }
    setShowDatePicker(true);
  };

  const handleTagPress = (tag: SelectableTag) => {
    setSelectedTags(selectedTags.map(t => ({ ...t, selected: t.name === tag.name ? !t.selected : t.selected })));
  };
  

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop 
      {...props} 
      enableTouchThrough={true} 
      opacity={0.5}
      pressBehavior="close"
      disappearsOnIndex={-1}
      onPress={handleDismiss}
    />
  ), []);

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
    twoArrows: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12
    },
    iconHeader: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 16
    },
    peopleIcon: {
      backgroundColor: '#800000',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100
    },
    saveButton: {
      width: '48%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      backgroundColor: '#800000'
    },
    unlimitedButton: {
      width: '48%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#800000'
    },
    modalTitle: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 16
    },
    modalSubtitle: {
      fontSize: 16,
      color: '#333',
      fontWeight: '300',
      marginBottom: 16
    },
    timeRow: {
      flexDirection: 'row',
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 16
    },
    tagButton: {
      backgroundColor: '#999999',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      paddingHorizontal: 10,
      borderRadius: 100,
      gap: 4
    },
    tagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '300'
    },
    editTagButton: {
      backgroundColor: '#800000',
      padding: 8,
      borderRadius: 100
    },
    editTagText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '300'
    }
  });

  return (
    <>
      <Header>
        <View style = {{ width: 40 }} />
      </Header>
      <ScrollView className="bg-gray-50" style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Pressable style = {styles.imageContainer} onPress={handleImagePress}>
          <Image source={selectedImage ? { uri: selectedImage } : require('@/assets/images/default-event-image.png')} style = {styles.imageContainer} />
          <View style={styles.imageLogo}>
            <Ionicons name="image-outline" size={20} color="white" />
          </View>
        </Pressable>

        {/* Title */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Event Name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Date */}
        <View style={styles.inputGroup}>
          <View style = {[styles.input, { padding: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style = {styles.imagePath}>
              <View style = {[styles.dot, {marginBottom: 5}]} />
              <View style = {styles.verticalDottedLine} />
              <View style = {[styles.dot, { backgroundColor: '#f8f8f8', borderColor: '#500000', borderWidth: 2, marginTop: 5}]} />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {[styles.timeRow, {borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)'}]}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Start</Text>
                <Pressable onPress={() => handlePickerSelect("start")}>
                  <Text style = {{ fontSize: 16, color: '#800000' }}>{formatDate(startDate)}</Text>
                </Pressable>
              </View>
              <View style = {styles.timeRow}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>End</Text>
                <Pressable onPress={() => handlePickerSelect("end")}>
                  <Text style = {{ fontSize: 16, color: '#800000' }}>{formatDate(endDate)}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
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

        {/* Divider */}
        <View style={styles.inputGroup}>
          <View style={{ width: '100%', height: 1, borderTopWidth: 1, borderColor: 'rgb(200, 200, 200)' }} />
        </View>

        {/* Tags */}
        <Text style={{ fontSize: 13, color: '#333', fontWeight: '300', marginBottom: 16 }}>Tags</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {selectedTags.map((tag, index) => (
            <Pressable key={index} style={[styles.tagButton, {backgroundColor: tag.selected ? '#800000' : '#999999'}]} onPress={() => handleTagPress(tag)}>
              <Text style={styles.tagText}>{tag.name}</Text>
              <Ionicons name={tag.selected ? "close-circle-outline" : "add-circle-outline"} size={16} color="white" />
            </Pressable>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.inputGroup}>
          <View style={{ width: '100%', height: 1, borderTopWidth: 1, borderColor: 'rgb(200, 200, 200)' }} />
        </View>

        {/* Options */}
        <Text style={{ fontSize: 13, color: '#333', fontWeight: '300', marginBottom: 16 }}>Options</Text>

        {/* Visibility + Capacity */}
        <View style={[styles.inputGroup, { marginBottom: 32 }]}>
          <View style={[styles.input, { padding: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.imagePath}>
              <Ionicons name="eye-outline" size={24} color="#500000" />
              <View style={[styles.verticalDottedLine, {height: 25, borderWidth: 0}]} />
              <Ionicons name="people-outline" size={24} color="#500000" />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {{ width: '100%', height: 50, borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Visibility</Text>
                <SegmentedControl
                  values={visibilityOptions}
                  selectedIndex={visibilityIndex}
                  onChange={(event) => setVisibilityIndex(event.nativeEvent.selectedSegmentIndex)}
                  style={{ width: 150, height: 30, marginRight: 12, backgroundColor: '#999999', borderRadius: 8 }}
                  tintColor="#800000"
                  fontStyle={{ color: 'white', fontWeight: 'bold' }}
                />
              </View>
              <View style = {{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Capacity</Text>
                <Pressable onPress={presentBottomSheet} style = {{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>{capacity}</Text>
                  <View style = {styles.twoArrows}>
                    <Ionicons name="chevron-up-outline" size={15} color="#500000" />
                    <Ionicons name="chevron-down-outline" size={15} color="#500000" />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Publish Buttons */}
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

      {/* Bottom Sheet Modals */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={snap}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        keyboardBehavior="interactive"  // Add this
        keyboardBlurBehavior="restore"  // Add this
        android_keyboardInputMode="adjustResize"  // Add this for Android
        onChange={(index) => {
          if (index === -1) { return; }
          setSnap(index);
        }}
        backdropComponent={renderBackdrop}
      >
        <TouchableWithoutFeedback onPress={handleTouchStart}>
          <BottomSheetView style = {{ alignItems: 'center' }}>
            <View style = {styles.iconHeader}>
              <View style = {styles.peopleIcon}>
              <Ionicons name="people-outline" size={24} color="white" />
            </View>
            <Pressable onPress={handleDismiss}>
              <Ionicons name="close-circle" size={28} color={'gray'} />
            </Pressable>
          </View>
          <Text style = {[styles.modalTitle, {alignSelf: 'flex-start', marginLeft: 16}]}>Capacity</Text>
          <Text style = {[styles.modalSubtitle, {alignSelf: 'flex-start', marginLeft: 16}]} >How many people can attend this event?</Text>
          <TextInput 
            style={[styles.input, {width: width - 32}]}
            placeholder="Enter capacity" 
            keyboardType="numeric"
            inputMode="numeric"
            placeholderTextColor={'#999999'}
            maxLength={5}
            defaultValue={capacityInputRef.current}
            onChangeText={(text) => {
              capacityInputRef.current = text;
            }}
            onFocus={handleTextInputFocus}
          />
          <View style = {{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingHorizontal: 16}}>
            <Pressable style={styles.saveButton} onPress={() => handleCapacityChange(capacityInputRef.current)}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: '300' }}>Save</Text>
            </Pressable>
            <Pressable style={styles.unlimitedButton} onPress={() => handleCapacityChange('Unlimited')}>
              <Text style={{ fontSize: 16, color: '#800000', fontWeight: '300' }}>Unlimited</Text>
            </Pressable>
            </View>
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheetModal>

      <DateTimePickerModal
        isVisible={showDatePicker}
        date={datePickerDate}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
        isDarkModeEnabled={false}
        textColor="black"
      />
    </>
  );
}
