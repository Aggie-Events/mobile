import Toast from "react-native-toast-message";
import { fetchUtil } from "@/api/fetch";
import { API_URL } from "@/config/api-url";

export interface User {
    user_email: string;
    user_displayname: string;
    user_img: string;
    user_id: number;
    user_name: string | null;
}

export const addUser = async (username: string, email: string) => {
    try {
        const response = await fetchUtil(
            `${API_URL}/users`,
            {
                method: "POST",
                body: { username, email },
            },
        );
        console.log("User added successfully", response);
    } catch (error) {
        throw new Error("Error adding user: " + error);
    }
};

export const fetchUsernames = async (): Promise<User[]> => {
    try {
        const response = await fetchUtil(
            `${API_URL}/users`,
            {
                method: "GET",
            },
        );
        return response.json() ?? [];
    } catch (error) {
        throw new Error("Error fetching users" + error);
    }
};

export const deleteUser = async () => {
    try {
        const response = await fetchUtil(
            `${API_URL}/users`,
            {
                method: "DELETE",
            },
        );
    } catch (error) {
        throw new Error("Error deleting users");
    }
};

export const updateUser = async (username: string, email: string) => {
    try {
        const response = await fetchUtil(
            `${API_URL}/users`,
            {
                method: "PUT",
                body: { username, email },
            },
        );
        return response;
    } catch (error) {
        throw new Error("Error updating user");
    }
};

// TODO: wait until update is finished then check or keep checking asynchronously for a bit then return error. Make loading animation while updating backend
// updateResponse is the response from the updateUser function to verify that the user has been updated
export const verifyUserUpdate = async (username: string) => {
    console.log(`${API_URL}/users`);
    const response = await fetchUtil(
        `${API_URL}/users`,
        {
            method: "GET",
        },
    ).catch((error) => {
        throw new Error("Error modifying user: " + error);
    });
    const message = await response.json().then((data) => {
        for (const user of data) {
            console.log(user.user_name);
            if (user.user_name === username) {
                return `User updated successfully to ${username}`;
            }
        }
        return "User not updated!";
    });

    console.log("API Tested: " + message);
    Toast.show({text1: "API Message: " + message, type: "success"});

    return response.status === 200;
};

export const checkIfUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const response = await fetchUtil(
            `${API_URL}/users/exists`,
            {
                method: "POST",
                body: { username },
            },
        );
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error("Error checking if username exists:", error);
        throw new Error("Error checking if username exists: " + error);
    }
}

export const updateUsername = async (newUsername: string): Promise<void> => {
    try {
        console.log('api url: ', `${API_URL}/users/username`);
        console.log('new username: ', newUsername);
        await fetch(`${API_URL}/users/username`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username: newUsername }),
        });
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Error setting username. Please try again later."
        });
        throw new Error("Error updating username: " + error);
    }
}