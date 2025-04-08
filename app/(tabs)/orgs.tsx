import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Header from "@/components/ui/Header";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Organization {
  id: string;
  name: string;
  category: string;
  members: number;
  image: string;
}

const SAMPLE_ORGANIZATIONS: Organization[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    category: 'Technology',
    members: 128,
    image: '🏢',
  },
  {
    id: '2',
    name: 'Green Earth Initiative',
    category: 'Environment',
    members: 256,
    image: '🌱',
  },
  {
    id: '3',
    name: 'Creative Arts Society',
    category: 'Arts',
    members: 89,
    image: '🎨',
  },
];

const CATEGORIES = ['All', 'Technology', 'Environment', 'Arts', 'Education', 'Social'] as const;
type Category = typeof CATEGORIES[number];

export default function OrganizationsPage() {
  const { width, height } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const renderOrganizationCard = ({ item }: { item: Organization }) => (
    <TouchableOpacity style={styles.orgCard}>
      <View style={styles.orgImageContainer}>
        <Text style={styles.orgImage}>{item.image}</Text>
      </View>
      <View style={styles.orgInfo}>
        <Text style={styles.orgName}>{item.name}</Text>
        <Text style={styles.orgCategory}>{item.category}</Text>
        <View style={styles.orgStats}>
          <IconSymbol name="drop.fill" size={16} color="#666666" />
          <Text style={styles.orgMembers}>{item.members} members</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <IconSymbol name="paperplane.fill" size={20} color="#666666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search organizations"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.categoryChipSelected,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <FlatList
          data={SAMPLE_ORGANIZATIONS}
          renderItem={renderOrganizationCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orgList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#800000',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  orgList: {
    padding: 20,
    gap: 16,
  },
  orgCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 12,
  },
  orgImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  orgImage: {
    fontSize: 24,
  },
  orgInfo: {
    flex: 1,
  },
  orgName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  orgCategory: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  orgStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orgMembers: {
    fontSize: 14,
    color: '#666666',
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#800000',
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 