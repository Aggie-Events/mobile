import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, Image, Pressable, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { tabBarHeight } from '@/constants/constants';
import { createEvent, CreateEventData } from '@/api/event';
import { fetchOrganizations } from "@/api/orgs";
import { Organization } from '@/config/dbtypes';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons";
import { eventCardHeight } from '@/constants/constants';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheetModal, BottomSheetFlatList, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BaseBottomSheet from '@/components/BaseBottomSheet';
import Toast from 'react-native-toast-message';

interface SelectableTag {
  name: string;
  selected: boolean;
  id: number;
}

export default function PublishPage() {

  const [orgs, setOrgs] = useState<Organization[]>([]);
  
  const { width, height } = useWindowDimensions();
  
  // Tags from database
  const tags = ["Workshop", "Career Fair", "Social", "Academic", "Sports", "Free Food", "Performance", "Seminar", "Engineering", "Business", "Arts", "Science"];

  // Tags from website
  // const tags = ['Academic', 'Arts', 'Career', 'Cultural', 'Recreation', 'Service', 'Social', 'Sports', 'Other'];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    start_time: new Date(),
    end_time: new Date(),
    tags: [] as string[],
    image: null as string | null,
    capacity: -1, // -1 means unlimited capacity
  });
  const capacityInputRef = useRef<string>('');
  const [selectedTags, setSelectedTags] = useState<SelectableTag[]>(tags.map((tag, index) => ({ name: tag, selected: false, id: index + 1 } as SelectableTag)));
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePickerDate, setDatePickerDate] = useState<Date>(new Date());
  const didSelectStart = useRef<boolean>(false);
  const didSelectEnd = useRef<boolean>(false);
  
  const snapPoints = [height * 0.45, height * 0.75];
  const orgSnapPoints = [height * 0.75];
  const orgSheetModalRef = useRef<BottomSheetModal>(null);
  const [orgSnap, setOrgSnap] = useState<number>(0);
  const capacitySheetModalRef = useRef<BottomSheetModal>(null);
  const [capacitySnap, setCapacitySnap] = useState<number>(0);
  
  
  const formatDate = (date: Date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let returnString = "";
    returnString += daysOfWeek[date.getDay()] + ", ";
    returnString += months[date.getMonth()] + " " + date.getDate() + " at ";
    returnString += (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + " " + (date.getHours() >= 12 ? "PM" : "AM");
    return returnString;
  };

  const validateFormData = (formData: CreateEventData): boolean => {
    if (formData.event_name.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Form Error: Event name is required',
      });
      return false;
    }
    if (formData.start_time >= formData.end_time) {
      Toast.show({
        type: 'error',
        text1: 'Form Error: End time must be after start time.',
      });
      return false;
    }
    return true;
  }
  
  
  const handlePublish = async () => {
    const eventData: CreateEventData = {
      event_name: formData.title,
      event_description: formData.description,
      event_location: formData.location,
      event_status: 'published',
      start_time: formData.start_time,
      end_time: formData.end_time,
      tags: selectedTags.filter(tag => tag.selected).map(tag => tag.name),
      event_img: formData.image,
      max_capacity: formData.capacity,
      event_org: organization
    };

    const isFormDataValid = validateFormData(eventData);
    if (!isFormDataValid) { return; }
    
    try {
      const createdEvent = await createEvent(eventData);
      
      if (createdEvent) {
        console.log('Event created successfully:', createdEvent);
        Toast.show({
          type: 'success',
          text1: 'Event created successfully!',
        });
      } else {
        console.error('Failed to create event');
        Toast.show({
          type: 'error',
          text1: 'Failed to create event. Please try again later.',
        });
      }
    }
    catch (error) {
      console.error('Error creating event:', error);
    }
  };
  
  const handleImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };
  
  const presentBottomSheet = (sheetRef: React.RefObject<BottomSheetModal>) => {
    setCapacitySnap(0);
    setOrgSnap(0);
    sheetRef.current?.present();
  };
  
  const handleTouchStart = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      setCapacitySnap(0);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    Keyboard.dismiss();
    capacitySheetModalRef.current?.dismiss();
    capacityInputRef.current = '';
  }, []);
  
  const handleOrgDismiss = useCallback(() => {
    setOrgSnap(-1);
    orgSheetModalRef.current?.dismiss();
  }, []);
  
  const handleCapacityChange = (cap: string) => {
    if (cap == "" || Number(cap) <= 0) {
      setFormData({ ...formData, capacity: -1 });
    }
    else {
      setFormData({ ...formData, capacity: Number(cap) });
    }
    handleDismiss();
  };
  
  const onOrgSnapChange = useCallback((index: number) => {
    if (index === -1) { return; }
    setOrgSnap(index);
  }, [])
  
  const onCapacitySnapChange = useCallback((index: number) => {
    if (index === -1) { return; }
    setCapacitySnap(index);
  }, [])
  
  const handleTextInputFocus = useCallback(() => {
    setCapacitySnap(1);
  }, []);
  
  const handleDateConfirm = (date: Date) => {
    if (didSelectStart.current) {
      setFormData({ ...formData, start_time: date });
    }
    else {
      setFormData({ ...formData, end_time: date });
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
      setDatePickerDate(formData.start_time);
      didSelectStart.current = true;
      didSelectEnd.current = false;
    } 
    else {
      setDatePickerDate(formData.end_time);
      didSelectEnd.current = true;
      didSelectStart.current = false;
    }
    setShowDatePicker(true);
  };
  
  const handleTagPress = (tag: SelectableTag) => {
    setSelectedTags(selectedTags.map(t => ({ ...t, selected: t.name === tag.name ? !t.selected : t.selected })));
  };

  const truncateString = (str: string, maxLength: number = 20) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength).trimEnd() + '...';
  }
  
  
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

  const fetchOrgs = async () => {
    try {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };
  
  useEffect(() => {
    fetchOrgs();
  }, []);

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
      paddingLeft: 16,
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
    },
    clearSelectionButton: {
      padding: 16,
      borderRadius: 30,
      backgroundColor: '#800000',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 16,
    },
  });

  return (
    <>
      <Header>
        <View style = {{ width: 40 }} />
      </Header>
      <ScrollView className="bg-gray-50" style={styles.container} contentContainerStyle={styles.contentContainer}>

        {/* Image */}
        <Pressable style = {styles.imageContainer} onPress={handleImagePress}>
          <Image source={formData.image ? { uri: formData.image } : require('@/assets/images/default-event-image.png')} style = {styles.imageContainer} />
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
          <View style = {[styles.input, { paddingLeft: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style = {styles.imagePath}>
              <View style = {[styles.dot, {marginBottom: 5}]} />
              <View style = {styles.verticalDottedLine} />
              <View style = {[styles.dot, { backgroundColor: '#f8f8f8', borderColor: '#500000', borderWidth: 2, marginTop: 5}]} />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {[styles.timeRow, {borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)'}]}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Start</Text>
                <Pressable onPress={() => handlePickerSelect("start")}>
                  <Text style = {{ fontSize: 16, color: '#800000' }}>{formatDate(formData.start_time)}</Text>
                </Pressable>
              </View>
              <View style = {styles.timeRow}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>End</Text>
                <Pressable onPress={() => handlePickerSelect("end")}>
                  <Text style = {{ fontSize: 16, color: '#800000' }}>{formatDate(formData.end_time)}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            placeholder="Event Location"
            placeholderTextColor="#999"
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, styles.textArea, {fontSize: 16, fontWeight: '400'}]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Describe your event..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={8}
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
          <View style={[styles.input, { paddingLeft: 0, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.imagePath}>
              <Ionicons name="business-outline" size={24} color="#500000" />
              <View style={[styles.verticalDottedLine, {height: 25, borderWidth: 0}]} />
              <Ionicons name="people-outline" size={24} color="#500000" />
            </View>
            <View style = {styles.timeContainer}>
              <View style = {{ width: '100%', height: 50, borderBottomWidth: 1, borderColor: 'rgb(229, 231, 235)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Organization</Text>
                <Pressable onPress={() => presentBottomSheet(orgSheetModalRef)} style = {{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>{organization ? truncateString(organization.org_name) : 'N/A'}</Text>
                  <View style = {styles.twoArrows}>
                    <Ionicons name="chevron-up-outline" size={15} color="#800000" />
                    <Ionicons name="chevron-down-outline" size={15} color="#800000" />
                  </View>
                </Pressable>
              </View>
              <View style = {{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>Capacity</Text>
                <Pressable onPress={() => presentBottomSheet(capacitySheetModalRef)} style = {{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style = {{ fontSize: 16, color: '#b4b4b4' }}>{formData.capacity == -1 ? 'Unlimited' : formData.capacity}</Text>
                  <View style = {styles.twoArrows}>
                    <Ionicons name="chevron-up-outline" size={15} color="#800000" />
                    <Ionicons name="chevron-down-outline" size={15} color="#800000" />
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
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Publish Test Event</Text>
        </TouchableOpacity>

        <View style = {{ height: tabBarHeight }} />
      </ScrollView>


      {/* Bottom Sheet Modals */}
      <BaseBottomSheet
        ref={orgSheetModalRef}
        title="Select Organization"
        subtitle="Choose the organization hosting this event"
        iconName="business-outline"
        snapPoints={orgSnapPoints}
        index={orgSnap}
        onChange={onOrgSnapChange}
        backdropComponent={renderBackdrop}
        handleDismiss={handleOrgDismiss}
      >
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <BottomSheetFlatList
            data={orgs}
            keyExtractor={(item) => item.org_id.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: organization?.org_id === item.org_id ? '#800000' : '#f8f8f8',
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: 50,
                }}
                onPress={() => {
                  setOrganization(item);
                  handleOrgDismiss();
                }}
              >
                <Text style={[{fontSize: 16, fontWeight: '300'}, organization?.org_id === item.org_id ? {color: 'white'} : {color: "black"}]}>{item.org_name}</Text>
                {organization?.org_id === item.org_id && (
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                )}
              </Pressable>
            )}
          />
        </View>
        <Pressable style = {styles.clearSelectionButton}
          onPress={() => {
            setOrganization(null);
            handleOrgDismiss();
          }}
        >
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '300' }}>
            Clear Selection
          </Text>
        </Pressable>
      </BaseBottomSheet>

      <BaseBottomSheet
        ref={capacitySheetModalRef}
        title = "Capacity"
        subtitle = "How many people can attend this event?"
        iconName='people-outline'
        snapPoints={snapPoints}
        index={capacitySnap}
        onChange={onCapacitySnapChange}
        backdropComponent={renderBackdrop}
        withoutFeedbackPress={handleTouchStart}
        handleDismiss={handleDismiss}
      >
        <TextInput 
          style={[styles.input, {marginLeft: 16, width: width - 32}]}
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
          <Pressable style={styles.unlimitedButton} onPress={() => handleCapacityChange('')}>
            <Text style={{ fontSize: 16, color: '#800000', fontWeight: '300' }}>Unlimited</Text>
          </Pressable>
        </View>
      </BaseBottomSheet>

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
