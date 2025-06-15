import React from 'react';
import { Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

const OrgDetails = () => {
  const { param } = useLocalSearchParams();

  return (
    <Text>Org Details for {param}</Text>
  );
}

export default OrgDetails;