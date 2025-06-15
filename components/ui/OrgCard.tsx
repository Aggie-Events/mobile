import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Organization } from "@/config/dbtypes";
import { defaultImage } from "@/constants/constants";
import { router } from "expo-router";

interface OrgCardProps {
  organization: Organization;
}

const styles = StyleSheet.create({
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
  orgInfo: {
    flex: 1,
    paddingRight: 16,
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
  moreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#800000',
    borderRadius: 8,
  },
  moreButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
})

const OrgCard: React.FC<OrgCardProps> = ({ organization }) => {
  return (
    <TouchableOpacity style={styles.orgCard} onPress={() => router.push(`/org/${organization.org_id}`)}>
      <View style={styles.orgImageContainer}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 24 }}
          source={organization.org_icon ? { uri: organization.org_icon } : defaultImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.orgInfo}>
        <Text style={styles.orgName}>{organization.org_name}</Text>
        <View style={styles.orgStats}>
          <Text style={styles.orgMembers}>{`${organization.org_members_count} ${organization.org_members_count === 1 ? 'member' : 'members'}`}</Text>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={24} color="#bbb" />
    </TouchableOpacity>
  )
}

export default OrgCard;