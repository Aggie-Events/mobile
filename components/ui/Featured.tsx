import React from 'react';
import { View, Text, Pressable, FlatList, Image, useWindowDimensions, ScrollView, StyleSheet } from "react-native";
import EventCard from '../../components/ui/EventCard';
import { Ionicons } from '@expo/vector-icons';
import { eventCardHeight } from '@/constants/constants';
import { Event } from '@/config/dbtypes';
import { defaultImage } from '@/constants/constants';

interface FeaturedProps {
  events: Event[];
  scrollRef?: React.RefObject<ScrollView>;
  onScroll?: (event: any) => void;
}

const Featured: React.FC<FeaturedProps> = ({ events = [], scrollRef, onScroll }) => {
  const { width, height } = useWindowDimensions();
  const sectionTitleExtraPadding = 30;
  
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

  return (
    <ScrollView ref={scrollRef} onScroll={onScroll}>
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
              source = {item.event_img ? { uri: item.event_img } : defaultImage}  
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
    </ScrollView>
  )
}

export default React.memo(Featured);