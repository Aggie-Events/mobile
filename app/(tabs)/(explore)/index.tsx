import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, Keyboard, TouchableWithoutFeedback, useWindowDimensions, ScrollView } from "react-native";
import { fetchEvents } from '@/api/event';
import { fetchFollowedEvents } from '@/api/user';
import { Event } from '@/config/dbtypes';
import { EventPageInformation } from '@/config/query-types';
import { tabBarHeight } from '@/constants/constants';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from '@/components/auth/AuthProvider';
import { getUser } from '@/auth/auth-router';
import Toast from 'react-native-toast-message';
import Featured from '@/components/ui/Featured';
import Following from '@/components/ui/Following';

type Tab = 'Featured' | 'Following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Featured');
  const [events, setEvents] = useState<Event[]>([]);
  const [followedEvents, setFollowedEvents] = useState<EventPageInformation[]>([]);
  const {width, height} = useWindowDimensions();
  const { setUser } = useAuth();

  const featuredRef = useRef<ScrollView>(null);
  const followingRef = useRef<ScrollView>(null);
  const featuredScrollY = useRef(0);
  const followingScrollY = useRef(0);

  const onFeaturedScroll = useCallback((event: any) => {
    featuredScrollY.current = event.nativeEvent.contentOffset.y;
  }, []);

  const onFollowingScroll = useCallback((event: any) => {
    followingScrollY.current = event.nativeEvent.contentOffset.y;
  }, []);

  
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
  
  const fetchEventsFromAPI = async () => {
    try {
      const result = await fetchEvents();
      setEvents(result);
    } catch (error) {
      console.error("Error calling fetchEvents:", error);
    }
  }

  const fetchFollowedEventsFromAPI = async () => {
    try {
      const result = await fetchFollowedEvents();
      setFollowedEvents(result);
    } catch (error) {
      console.error("Error calling fetchFollowedEvents:", error);
      setFollowedEvents([]);
    }
  }

  const configureExplore = async () => {
    await getUserInfo();
    await fetchEventsFromAPI();
    await fetchFollowedEventsFromAPI();
  }

  useEffect(() => {
    if (activeTab === 'Featured') {
      featuredRef.current?.scrollTo({ y: featuredScrollY.current, animated: false });
    }
    else {
      followingRef.current?.scrollTo({ y: followingScrollY.current, animated: false });
    }
  }, [activeTab]);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '19658597217-enl8en0fnhsvilikd14gl260705m2e9o.apps.googleusercontent.com', // TODO: update this
      webClientId: '19658597217-q87pq51i57uhml4bs9r5q0itbb81imi7.apps.googleusercontent.com', // TODO: update this
      offlineAccess: true,
    });
    configureExplore();
  }, []);

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

        {/* Render the active tab content */}
        { activeTab === 'Featured' ? (
          <Featured events={events} scrollRef={featuredRef} onScroll={onFeaturedScroll} />
        ) : (
          <Following followedEvents={followedEvents} scrollRef={followingRef} onScroll={onFollowingScroll} onRefresh={fetchFollowedEventsFromAPI} />
        )}

        <View style = {{ height: tabBarHeight + 10 }} />
      </View>
    </>
  );
}
