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

export const fetchUserOrganizations = async (username: string): Promise<Organization[]> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/orgs/user/${username}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    return data ?? [];
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching User Organizations",
    });
    throw new Error("Error fetching User Organizations: " + error);
  }
}

export const fetchOrganizationByParam = async (param: string | number): Promise<Organization | null> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/orgs/${param}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    return data ?? null;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching Organization",
    });
    throw new Error("Error fetching Organization: " + error);
  }
};
