import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Organization } from "@/config/dbtypes";

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
})

const OrgCard: React.FC<OrgCardProps> = ({ organization }) => {
  return (
    <View style={styles.orgCard}>
      <View style={styles.orgImageContainer}>
        <Text style={styles.orgImage}>{organization.org_icon}</Text>
      </View>
      <View style={styles.orgInfo}>
        <Text style={styles.orgName}>{organization.org_name}</Text>
        <View style={styles.orgStats}>
          <IconSymbol name="drop.fill" size={16} color="#666666" />
          <Text style={styles.orgMembers}>{organization.org_members_count} members</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OrgCard;