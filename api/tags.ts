import { API_URL } from "@/config/api-url";

export const fetchTags = async (query: string) => {
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
