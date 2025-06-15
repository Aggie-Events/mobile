import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { Organization } from '@/config/dbtypes';
import { fetchOrganizations, fetchUserOrganizations } from '@/api/orgs';
import { useAuth } from '@/components/auth/AuthProvider';
import OrgCard from '@/components/ui/OrgCard';
import { tabBarHeight } from '@/constants/constants';

const MyOrgsScreen = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const { user } = useAuth();

  const fetchOrgs = async () => {
    if (!user || !user.user_name) {
      console.warn("User not logged in or username not available.");
      return;
    }
    try {
      const orgs = await fetchUserOrganizations(user.user_name);
      // const orgs = await fetchOrganizations(); // Uncomment this line if you have no created orgs
      setOrganizations(orgs);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchOrgs();
    }, [])
  );

  return (
    <ScrollView className='p-4 bg-gray-50'>
      {user?.user_name ? (
        organizations.length > 0 ? organizations.map((org) => (
          <OrgCard key={String(org.org_id)} organization={org} />
        )) : (
          <Text className='text-center text-gray-500 mt-10'>
            You have not created any organizations yet!
          </Text>
        )
      ) : (
        <Text className='text-center text-gray-500 mt-10'>
          {user ? "Please enter your username to see your organizations." : "Please log in to see your organizations."}
        </Text>
      )}
      <View style={{ height: tabBarHeight + 10 }} />
    </ScrollView>
  )
}

export default MyOrgsScreen;