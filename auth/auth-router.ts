import { AUTH_URL } from "@/config/api-url";
import { fetchUtil } from "@/api/fetch";
import { User } from "@/api/user";
import Toast from "react-native-toast-message";

export const getUser = async (): Promise<User | null> => {
    try {
        const response = await fetchUtil(
            `${AUTH_URL}/user`,
            {
                method: "GET",
            },
            true,
        );
        const data = await response.json();
        if (!data || !data.user_email) {
            return null;
        }
        return data as User;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Error fetching user. Please try again later."
        });
        throw new Error("Error fetching user: " + error);
    }
}
