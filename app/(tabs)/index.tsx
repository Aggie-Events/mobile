import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Keyboard, Image, TouchableWithoutFeedback, useWindowDimensions, ScrollView, StyleSheet } from "react-native";
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
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    recentlyAddedButton: {
      width: width / 1.1,
      height: 50,
      backgroundColor: 'rgb(220, 220, 220)',
      borderRadius: 12,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: "space-between",
      marginBottom: 7
    }
  });

  const recentlyAdded = [
    {eventName: "Event 1", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {eventName: "Event 2", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {eventName: "Event 3", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3}
  ]

  const upcoming = [
    {eventName: "Event 1", orgName: "Organization 1", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {eventName: "Event 2", orgName: "Organization 2", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {eventName: "Event 3", orgName: "Organization 3", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3}
  ]

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
        <ScrollView>
          <Text style = {{ color: '#9B1818', fontWeight: "bold", fontSize: 22, marginLeft: 25, marginVertical: 15, fontFamily: "inter" }}>
            TRENDING
          </Text>

          <View style = {{width: width, height: 270}}>
            <FlatList 
              data = {events}
              keyExtractor = {(event) => event.event_id.toString()}
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
              renderItem = {({ item }) => ( <EventCard key={item.event_id} event={item} /> )}
            />
          </View>

          <Text style = {{ color: '#9B1818', fontWeight: "bold", fontSize: 22, marginLeft: 25, marginVertical: 15 }}>
            RECENTLY ADDED
          </Text>
          {recentlyAdded.map((item) => (
            <Pressable style = {styles.recentlyAddedButton} key = {item.key}>
              <View style = {{ width: 32, height: 32, backgroundColor: 'black', marginLeft: 15 }} />
              <Text style = {{ color: '#101623', fontSize: 17, marginLeft: 20, fontWeight: '500', flex: 1 }}>{item.eventName}</Text>
              <Ionicons name='arrow-forward-outline' size={20} style = {{ marginRight: 15 }} />
            </Pressable>
          ))}

          <Text style = {{ color: '#9B1818', fontWeight: "bold", fontSize: 22, marginLeft: 25, marginVertical: 15 }}>
            UPCOMING
          </Text>
          <View style = {{ width: width / 1.1, height: height / 5.5, backgroundColor: 'rgb(220, 220, 220)', borderRadius: 15, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {upcoming.map((item) => (
              <View style = {{flexDirection: 'column'}}>
                <Image
                  src = {item.imageAddress}
                  style = {{ width: 120, height: 120, padding: 15 }}
                />
                <Text style = {{fontWeight: 'bold', textAlign: 'center', marginTop: -10}}>
                  {item.eventName}
                </Text>
                <Text style = {{fontWeight: '300', textAlign: 'center', fontSize: 12}}>
                  {item.orgName}
                </Text>
              </View>
            ))}
          </View>

          <Text style = {{ color: '#9B1818', fontWeight: "bold", fontSize: 22, marginLeft: 25, marginVertical: 15 }}>
            EXPLORE SOMETHING NEW
          </Text>
          <Text style = {{marginLeft: 25}}>:(</Text>
          <View style = {{ height: tabBarHeight + 10 }} />
        </ScrollView>
      </View>
    </>
  );
}
