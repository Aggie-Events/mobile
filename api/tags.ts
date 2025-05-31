import { API_URL } from "@/config/api-url";
import Toast from "react-native-toast-message";

export const fetchTags = async (): Promise<{tags: string[]}> => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching tags",
    });
    throw new Error("Error fetching tags" + error);
  }
}

export const searchTags = async (query: string) => {
  try {
    const response = await fetch(
      `${API_URL}/tags/search?query=${query}`,
      {
        method: "GET",
      },
    );
    return response.json();
  } catch (error) {
    throw new Error("Error fetching tags" + error);
  }
};
