import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Keyboard, Image, TouchableWithoutFeedback, useWindowDimensions, ScrollView, StyleSheet } from "react-native";
import EventCard from '../../../components/ui/EventCard';
import { mockEvents } from '@/api/fakedb';
import { fetchEvents, searchEvents } from '@/api/event';
import { Event } from '@/config/dbtypes';
import { tabBarHeight } from '@/constants/constants';
import { testApi } from '@/api/test';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { eventCardHeight } from '@/constants/constants';
import { useAuth } from '@/components/auth/AuthProvider';
import { getUser } from '@/auth/auth-router';
import Toast from 'react-native-toast-message';

type Tab = 'Featured' | 'Following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Featured');
  const [events, setEvents] = useState<Event[]>([]);
  const {width, height} = useWindowDimensions();
  const { setUser } = useAuth();

  const sectionTitleExtraPadding = 30;

  const styles = StyleSheet.create({
    recentlyAddedButton: {
      width: width / 3.3,
      height: 70,
      backgroundColor: 'rgb(80, 0, 0)',
      borderRadius: 8,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: "space-between",
      marginBottom: 7
    },
    sectionTitle: { 
      color: '#500000', 
      fontWeight: "600", 
      fontSize: 17, 
      marginLeft: 25, 
      marginVertical: 15, 
      fontFamily: "inter"
    }
  });

  const recentlyAdded = [
    {event_name: "Event 1", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {event_name: "Event 2", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {event_name: "Event 3", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3},
    {event_name: "Event 4", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 4},
    {event_name: "Event 5", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 5},
    {event_name: "Event 6", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 6}
  ]

  const upcoming = [
    {event_name: "Event 1", orgName: "Organization 1", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {event_name: "Event 2", orgName: "Organization 2", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {event_name: "Event 3", orgName: "Organization 3", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3},
    {event_name: "Event 4", orgName: "Organization 4", event_img: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 4}
  ]

  const getUserInfo = async () => {
    try {
      const user = await getUser();
      if (user) {
        setUser(user);
      } 
      else {
        console.warn("No user information found.");
      }
    }
    catch (error) {
      console.error("Error setting up user credentials:", error);
      Toast.show({
        type: 'error',
        text1: 'Failed to get user credentials. Please try again later.'
      });
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '19658597217-enl8en0fnhsvilikd14gl260705m2e9o.apps.googleusercontent.com', // TODO: update this
      webClientId: '19658597217-q87pq51i57uhml4bs9r5q0itbb81imi7.apps.googleusercontent.com', // TODO: update this
      offlineAccess: true,
    });
    getUserInfo();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const result = await fetchEvents();
        setEvents(result);
      } catch (error) {
        console.error("Error calling fetchEvents:", error);
      }
    };
    getEvents();
  }, [activeTab]); // refresh when tab is changed

  return (
    <>
      <Header>
        <Pressable>
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </Header>

      <View className="flex-1 bg-gray-50">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-row justify-center bg-gray-50 border-b border-gray-200">
            {(['Featured', 'Following'] as Tab[]).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                // className={`px-6 py-4 ${
                //   activeTab === tab ? 'border-b-2 border-maroon-600' : ''
                // }`}
                style = {[{width: width / 2, height: 40, justifyContent: 'center'}, activeTab === tab ? {borderBottomColor: '#520D0D', borderBottomWidth: 2} : {}]}
              >
                <Text style = {{color: '#A0A0A0', fontWeight: '400', fontFamily: 'inter', fontSize: 12, textAlign: 'center'}}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
        </TouchableWithoutFeedback>
        <ScrollView>
          <Text style = {styles.sectionTitle}>
            TRENDING
          </Text>

          <View style = {{width: width}}>
            <FlatList 
              data = {events}
              keyExtractor = {(event) => event.event_id.toString()}
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
              renderItem = {({ item }) => ( <EventCard id={item.event_id.toString()} event={item} /> )}
              ListFooterComponent={<View style = {{ marginRight: 16 }} />}
            />
          </View>

          <Text style = {[styles.sectionTitle, {marginTop: sectionTitleExtraPadding}]}>
            UPCOMING
          </Text>
          <View style = {{ width: width, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            {upcoming.map((item, index) => (
              <View style = {{ flexDirection: 'column', paddingHorizontal: 5, marginBottom: 10 }} key={index}>
                <Image 
                  style = {{ width: eventCardHeight * 1.2, height: eventCardHeight * 1.2, backgroundColor: '#500000', borderRadius: 8 }}
                  source = {item.event_img ? { uri: item.event_img } : require('../../../assets/images/default-event-image.png')}  
                  resizeMode = "cover"
                />
                <Text style = {{fontWeight: 'bold', textAlign: 'center'}}>
                  {item.event_name}
                </Text>
                <Text style = {{fontWeight: '300', textAlign: 'center', fontSize: 12}}>
                  {item.orgName}
                </Text>
              </View>
            ))}
          </View>

          <Text style = {[styles.sectionTitle, {marginTop: sectionTitleExtraPadding}]}>
            RECENTLY ADDED
          </Text>
          <View style = {{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {recentlyAdded.map((item, index) => (
              <Pressable style = {[styles.recentlyAddedButton, index == 0 || (index + 1) % 3 != 0 ? {marginRight: 7} : {}]} key = {item.key}>
                <Text style = {{ color: 'white', fontSize: 17, marginLeft: 20, fontWeight: '500', flex: 1 }}>{item.event_name}</Text>
                <Ionicons name='arrow-forward-outline' size={15} style = {{ marginRight: 15, color: 'white' }} />
              </Pressable>
            ))}
          </View>

          <Text style = {[styles.sectionTitle, {marginTop: sectionTitleExtraPadding}]}>
            EXPLORE SOMETHING NEW
          </Text>
          <Text style = {{marginLeft: 25}}>:(</Text>
          <View style = {{ height: tabBarHeight + 10 }} />
        </ScrollView>
      </View>
    </>
  );
}
