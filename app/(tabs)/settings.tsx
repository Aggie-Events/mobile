import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { tabBarHeight } from './_layout';
import Header from "@/components/ui/Header";

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
}) => (
  <View    
    style={styles.settingsItem}
  >
    <View style={styles.settingsItemIcon}>
      <IconSymbol name={icon} size={24} color="#666666" />
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
        trackColor={{ false: '#dddddd', true: '#800000' }}
        thumbColor="#ffffff"
      />
    )}
    {type === 'button' && (
      <IconSymbol name="chevron.right" size={20} color="#666666" />
    )}
  </View>
);

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
        </View>

        <SettingsSection title="Preferences">
          <SettingsItem
            icon="gear"
            title="Notifications"
            description="Receive push notifications"
            type="toggle"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingsItem
            icon="gear"
            title="Dark Mode"
            description="Switch to dark theme"
            type="toggle"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingsItem
            icon="gear"
            title="Email Updates"
            description="Receive email notifications"
            type="toggle"
            value={emailUpdates}
            onValueChange={setEmailUpdates}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsItem
            icon="gear"
            title="Edit Profile"
            description="Update your personal information"
          />
          <SettingsItem
            icon="gear"
            title="Privacy"
            description="Manage your privacy settings"
          />
          <SettingsItem
            icon="gear"
            title="Security"
            description="Configure security options"
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            icon="gear"
            title="Help Center"
            description="Get help and support"
          />
          <SettingsItem
            icon="gear"
            title="Terms of Service"
            description="Read our terms and conditions"
          />
          <SettingsItem
            icon="gear"
            title="Privacy Policy"
            description="Read our privacy policy"
          />
        </SettingsSection>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
        <View style = {{ height: tabBarHeight }} />
      </ScrollView>
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
    marginBottom: 4,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  settingsItemDescription: {
    fontSize: 14,
    color: '#666666',
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
});