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

type Tab = 'Featured' | 'Following';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Featured');
  const [events, setEvents] = useState<Event[]>([]);
  const {width, height} = useWindowDimensions();

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
    {eventName: "Event 1", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {eventName: "Event 2", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {eventName: "Event 3", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3},
    {eventName: "Event 4", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 4},
    {eventName: "Event 5", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 5},
    {eventName: "Event 6", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 6}
  ]

  const upcoming = [
    {eventName: "Event 1", orgName: "Organization 1", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 1},
    {eventName: "Event 2", orgName: "Organization 2", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 2},
    {eventName: "Event 3", orgName: "Organization 3", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 3},
    {eventName: "Event 4", orgName: "Organization 4", imageAddress: "https://ih1.redbubble.net/image.2097232951.6764/st,small,507x507-pad,600x600,f8f8f8.jpg", key: 4}
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
              renderItem = {({ item }) => ( <EventCard key={item.event_id} event={item} /> )}
              ListFooterComponent={<View style = {{ marginRight: 16 }} />}
            />
          </View>

          <Text style = {[styles.sectionTitle, {marginTop: sectionTitleExtraPadding}]}>
            UPCOMING
          </Text>
          <View style = {{ width: width, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            {upcoming.map((item) => (
              <View style = {{ flexDirection: 'column', paddingHorizontal: 5, marginBottom: 10 }}>
                <View style = {{ width: width / 2.3, height: 150, backgroundColor: '#500000', borderRadius: 8 }} />
                <Text style = {{fontWeight: 'bold', textAlign: 'center'}}>
                  {item.eventName}
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
                <Text style = {{ color: 'white', fontSize: 17, marginLeft: 20, fontWeight: '500', flex: 1 }}>{item.eventName}</Text>
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
