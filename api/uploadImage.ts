import { API_URL } from "@/config/api-url";
import Toast from "react-native-toast-message";

export async function getSecureURL(file: any) {
  try {
    const formData = new FormData();
    formData.append("image", file); // "image" must match backend's `upload.single("image")`

    // Use direct fetch for file upload instead of fetchUtil
    const response = await fetch(
      `${API_URL}/upload`,
      {
        method: "POST",
        credentials: "include", // Important: needed for auth
        body: formData,
      },
    );

    console.log(response.ok, response.status)

    if (!response.ok) {
      let toastMsg = "Image could not be uploaded. Please try again later.";
      if (response.status == 401) {
        toastMsg = "Unauthorized: Please log in to create an event";
      }
      Toast.show({
        type: "error",
        text1: toastMsg,
      });
      console.error("Image upload failed with status:", response.status);
      return null;
    }

    const data = await response.json();
    return data.url; // Returns Cloudinary URL
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Image could not be uploaded. Please try again later.",
    });
    throw new Error("Image upload failed: " + error);
  }
}