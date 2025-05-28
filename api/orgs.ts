import { fetchUtil } from "@/api/fetch";
import { Organization } from "@/config/dbtypes";
import { API_URL } from "@/config/api-url";
import Toast from "react-native-toast-message";

export const addOrganization = async (username: string, email: string) => {
  try {
    const response = await fetchUtil(
      `${API_URL}/orgs`,
      {
        method: "POST",
        body: { username, email },
      },
    );
    console.log("Organization added successfully", response);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error adding Organization",
    });
    throw new Error("Error adding Organization: " + error);
  }
};

export const fetchOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/orgs`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching Organizations",
    });
    throw new Error("Error fetching Organizations: " + error);
  }
};

export const deleteOrganization = async () => {
  try {
    const response = await fetchUtil(
      `${API_URL}/orgs`,
      {
        method: "DELETE",
      },
    );
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error deleting Organization",
    });
    throw new Error("Error deleting Organization: " + error);
  }
};
