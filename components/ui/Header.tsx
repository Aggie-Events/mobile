import { Text, SafeAreaView, Pressable, Image, TextInput } from "react-native";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SafeAreaView className="bg-maroon px-4 py-3 flex-row items-center justify-between">
      <Image 
        source={require('../../assets/images/logo.png')} 
        className="w-24 h-8"
        resizeMode="contain"
      />
      
      {isSearchOpen ? (
        <TextInput
          className="flex-1 ml-4 bg-white/10 px-4 py-2 rounded-full text-white"
          placeholder="Search..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          autoFocus
          onBlur={() => setIsSearchOpen(false)}
        />
      ) : (
        <Pressable
          onPress={() => setIsSearchOpen(true)}
          className="p-2"
        >
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
