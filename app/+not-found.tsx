import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { verifyInstallation } from 'nativewind';
import React from 'react';

export default function NotFoundScreen() {
  verifyInstallation();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View className='flex-1 bg-[#25292e] justify-center items-center'>
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
