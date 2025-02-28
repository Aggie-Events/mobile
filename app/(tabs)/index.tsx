import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import EventCard from '../../components/EventCard';
import { mockEvents } from '@/api/fakedb';
import { fetchEvents, searchEvents } from '@/api/event';
import { Event } from '@/config/dbtypes';
import { tabBarHeight } from './_layout';
import { testApi } from '@/api/test';
import Header from '@/components/ui/Header';
import { Ionicons } from "@expo/vector-icons"
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';

type Tab = 'for you' | 'following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('for you');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const result = await fetchEvents();
        console.log(result);
        setEvents(result);
      } catch (error) {
        console.error("Error calling testApi:", error);
      }
    };

    getEvents();
  }, [activeTab]); // refresh when tab is changed

  return (
    <>
      <Header>
        <View style = {{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
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
          
          <Pressable className="p-5">
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
      </Header>

      <View className="flex-1 bg-gray-50">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-row justify-center bg-gray-50 border-b border-gray-200">
            {(['for you', 'following'] as Tab[]).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-6 py-4 ${
                  activeTab === tab ? 'border-b-2 border-maroon-600' : ''
                }`}
              >
                <Text
                  className={`text-lg capitalize ${
                    activeTab === tab ? 'text-maroon-600 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
        </TouchableWithoutFeedback>

        <FlatList 
          data = {events}
          keyExtractor = {(event) => event.event_id.toString()}
          renderItem = {({ item }) => (
            <EventCard key={item.event_id} event={item} />
          )}
          ListHeaderComponent={<View className='pt-4' />}
          ListFooterComponent={<View style = {{ height: tabBarHeight }} />}
        />
      </View>
    </>
  );
}
