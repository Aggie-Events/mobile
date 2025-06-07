import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet, Alert, useWindowDimensions, Image, Keyboard } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { tabBarHeight } from '@/constants/constants';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AUTH_URL } from '@/config/api-url';
import { router } from 'expo-router';
import Header from "@/components/ui/Header";
import Toast from 'react-native-toast-message';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import BaseBottomSheet from '@/components/BaseBottomSheet';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/api/user';
import { useAuth } from '@/components/auth/AuthProvider';
import { checkIfUsernameExists, updateUsername } from '@/api/user';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

interface SettingsItemProps {
  icon: IconSymbolName;
  title: string;
  description?: string;
  type?: 'toggle' | 'button';
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  description,
  type = 'button',
  value,
  onValueChange,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={type === 'button' ? 0.2 : 1}
    onPress={type === 'button' && onPress ? onPress : undefined}
    style={styles.settingsItem}
  >
    <View style={styles.settingsItemIcon}>
      <IconSymbol name={icon} size={22} color="#800000" />
    </View>
    <View style={styles.settingsItemContent}>
      <Text style={styles.settingsItemTitle}>{title}</Text>
      {description && (
        <Text style={styles.settingsItemDescription}>{description}</Text>
      )}
    </View>
    {type === 'toggle' && (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ddd', true: '#800000' }}
        thumbColor="#fff"
      />
    )}
    {type === 'button' && (
      <IconSymbol name="chevron.right" size={20} color="#bbb" />
    )}
  </TouchableOpacity>
);

export default function SettingsPage() {
  // Account Info
  const { user, setUser, logout } = useAuth();
  
  // Settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  
  // Username stuff
  const usernameInput = useRef<string>("");
  const usernamePromptRef = useRef<BottomSheetModal>(null);
  const [usernameSnapIndex, setUsernameSnapIndex] = useState<number>(0);
  const [usernameErrorMessages, setUsernameErrorMessages] = useState<string[]>(["Username must be at least 3 characters long."]);

  // Extra
  const scrollViewRef = useRef<ScrollView>(null); // Not being used, but can be useful for future scroll handling

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop 
      {...props} 
      opacity={0.5}
      disappearsOnIndex={-1}
      pressBehavior='none'
    />
  ), []);

  const errorList = useMemo(() => (
    usernameErrorMessages.length > 0 ? (
      <View style={{ marginTop: 16 }}>
        {usernameErrorMessages.map((error, index) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} key={index}>
            <Ionicons name="close" size={16} color="red" style={{ marginRight: 4 }} />
            <Text style={{ color: 'red', fontSize: 14 }}>{error}</Text>
          </View>
        ))}
      </View>
    ) : (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16, flexDirection: 'row' }}>
        <Ionicons name="checkmark" size={16} color="green" style={{ marginRight: 4 }} />
        <Text style={{ color: 'green', fontSize: 14 }}>Username is valid!</Text>
      </View>
    )
  ), [JSON.stringify(usernameErrorMessages)]);

  const signInWithGoogle = async () => {
    try {
      if (user && user.user_name) {
        Toast.show({
          type: 'info',
          text1: 'You are already signed in!'
        });
        return;
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        Alert.alert("Sign in failed", "No ID token received");
        return;
      }

      // Send the ID token to your backend for verification
      // console.log(`${AUTH_URL}/auth/google-mobile`);

      const queryData = {
        idToken: idToken,
        user_displayname: userInfo.data?.user.name,
        user_img: userInfo.data?.user.photo,
        user_name: null,
        user_email: userInfo.data?.user.email,
      };

      const response = await fetch(`${AUTH_URL}/google-mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ ...queryData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Toast.show({
          type: 'error',
          text1: 'An error occurred during sign in. Please try again later.'
        });
        console.error("Sign in failed:", errorData);
        return;
      }
      // console.log("response ok check after");


      const data: { message: string; user: User } = await response.json();
      console.log("Login success:", data);

      if (!data || !data.user) {
        Toast.show({
          type: 'error',
          text1: 'No user data received. Please try again later.'
        });
        return;
      }

      setUser(data.user);

      if (!data.user.user_name || data.user.user_name === "") {
        // If the user has no username, prompt them to set one
        usernameInput.current = "";
        presentUsernamePrompt();
        return;
      }
      usernameInput.current = data.user.user_name;

      Toast.show({
        type: 'success',
        text1: 'Sign in successful!'
      });
    } 
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign in failed. Please try again later.'
      });
      console.error(error);
    }
  }

  const presentUsernamePrompt = () => {
    usernamePromptRef.current?.present();
    setUsernameSnapIndex(0);
  }

  const dismissUsernamePrompt = () => {
    usernamePromptRef.current?.close();
    setUsernameSnapIndex(-1);
  }

  const onChangeUsernameSnapIndex = (index: number) => {
    if (index === -1) {
      // User dismissed the bottom sheet
      console.log("Username prompt dismissed");
      usernamePromptRef.current?.close();
    }
    setUsernameSnapIndex(index);
  }

  const handleUsernameChange = async (text: string) => {
    usernameInput.current = text;
    let errorMessages = [];
    if (text.length < 3) {
      errorMessages.push("Username must be at least 3 characters long.");
    }
    if (text != "" && !/^[a-zA-Z0-9]+$/.test(text)) {
      errorMessages.push("Username can only contain letters and numbers.");
    }

    if (text.length > 0) {
      const usernameExists = await checkIfUsernameExists(text);
      if (usernameExists) {
        errorMessages.push("Username already exists. Please choose a different one.");
      }
    }

    setUsernameErrorMessages(errorMessages);
  };

  const handleSubmitUsername = async () => {
    if (usernameErrorMessages.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Please fix the errors before submitting.'
      });
      return;
    }

    try {
      await updateUsername(usernameInput.current);
      console.log("Username updated successfully:", usernameInput.current);
      setUser({
        ...user,
        user_name: usernameInput.current
      } as User);
      Toast.show({
        type: 'success',
        text1: 'Username submitted! Sign in successful!'
      });
    }
    catch (error) {
      console.error("Error updating username:", error);
    }  
    dismissUsernamePrompt();
  }

  useEffect(() => {
    if (user && !user.user_name) {
      presentUsernamePrompt();
    }
  }, []);

  return (
    <>
      <Header>
        <View style = {{ width: 40 }} />
      </Header>
      <ScrollView style={styles.container} ref={scrollViewRef}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image style={styles.avatar} source={user?.user_img ? {uri: user.user_img} : require('@/assets/images/default-event-image.png')} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.user_displayname ?? "Display Name"}</Text>
              <Text style={styles.profileEmail}>{user?.user_email ?? "email@email.com"}</Text>
              <Text style={styles.profileEmail}>{user?.user_name && user.user_name.length > 0  ? `@${user?.user_name}` : "@username"}</Text>
            </View>
          </View>
        </View>

        <SettingsSection title={!user ? "Sign In" : "Sign Out"}>
          <SettingsItem
            icon={!user ? "globe" : "rectangle.portrait.and.arrow.right"}
            title={!user ? "Sign In with Google" : "Sign Out"}
            description={!user ? "Use your Google account to sign in" : "Click to sign out"}
            type="button"
            onPress={!user ? signInWithGoogle : logout}
          />
        </SettingsSection>

        <SettingsSection title="Preferences">
          <SettingsItem
            icon="bell"
            title="Notifications"
            description="Receive push notifications"
            type="toggle"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingsItem
            icon="moon"
            title="Dark Mode"
            description="Switch to dark theme"
            type="toggle"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingsItem
            icon="envelope"
            title="Email Updates"
            description="Receive email notifications"
            type="toggle"
            value={emailUpdates}
            onValueChange={setEmailUpdates}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsItem
            icon="person.crop.circle"
            title="Edit Profile"
            description="Update your personal information"
          />
          <SettingsItem
            icon="hand.raised"
            title="Privacy"
            description="Manage your privacy settings"
          />
          <SettingsItem
            icon="lock.shield"
            title="Security"
            description="Configure security options"
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            icon="questionmark.circle"
            title="Help Center"
            description="Get help and support"
          />
          <SettingsItem
            icon="doc.text"
            title="Terms of Service"
            description="Read our terms and conditions"
          />
          <SettingsItem
            icon="shield"
            title="Privacy Policy"
            description="Read our privacy policy"
          />
        </SettingsSection>

        <View style = {{ height: tabBarHeight + 16 }} />
      </ScrollView>

      {/* Username Prompt Bottom Sheet */}
      <BaseBottomSheet
        ref={usernamePromptRef}
        title="Username"
        subtitle="Please enter a username to continue."
        iconName="person"
        snapPoints={['85%']}
        index={usernameSnapIndex}
        onChange={onChangeUsernameSnapIndex}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
        enableDismissOnClose={false}
        withoutFeedbackPress={() => Keyboard.dismiss()}
      >
        <TextInput
          style={styles.usernameInput}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Enter username" 
          placeholderTextColor={'#999999'}
          maxLength={20}
          defaultValue={""}
          onChangeText={(text) => handleUsernameChange(text)}
        />
        {errorList}
        <TouchableOpacity style = {styles.submitButton} onPress={() => handleSubmitUsername()}>
          <Text style = {{ fontSize: 16, color: 'white', fontWeight: '300' }}>Submit</Text>
        </TouchableOpacity>
      </BaseBottomSheet>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginVertical: 6,
    backgroundColor: '#fff',
    shadowColor: '#80000022',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f6f7fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: 13,
    color: '#888',
  },
  signOutButton: {
    margin: 20,
    marginTop: 32,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
  usernameInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingLeft: 16,
    fontSize: 20,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#eeeeee',
    fontWeight: '600',
    height: 50,
    marginHorizontal: 16,
  },
  submitButton: {
    width: '48%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 100,
    backgroundColor: '#800000'
  }
});