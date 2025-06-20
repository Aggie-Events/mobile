import { fetchUtil } from "@/api/fetch";
import { Event, Organization } from "@/config/dbtypes";
import { EventCreate, EventPageInformation } from "@/config/query-types";
import { API_URL } from "@/config/api-url";
import Toast from "react-native-toast-message";

export type EventStatus = 'draft' | 'published' | 'cancelled';

export interface CreateEventData {
  event_name: string;
  event_description: string | null;
  event_location: string | null;
  start_time: Date;
  end_time: Date;
  event_status: string;
  tags: string[];
  event_img: string | null;
  max_capacity: number;
  event_org: Organization | null;
}

export interface SearchEventsReturn {
  event_id: number;
  org_id?: number;
  org_name?: string;
  contributor_id: number;
  contributor_name: string;
  event_name: string;
  event_description: string;
  event_img: string;
  event_likes: number;
  start_time: Date;
  end_time: Date;
  event_location: string | null;
  date_created: Date;
  date_modified: Date;
  tags: string[];
}
export const searchEvents = async (
  queryString: string,
): Promise<{
  events: SearchEventsReturn[];
  duration: number;
  pageSize: number;
  resultSize: number;
}> => {
  try {
    const startTime = performance.now();
    // TODO: Implement pages for search results
    const {
      results: response,
      resultSize: resultSize,
      pageSize: pageSize,
    } = await fetchUtil(
      `${API_URL}` + `/search?${queryString}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    const duration = performance.now() - startTime;

    console.log("API Output: ", response);
    return {
      events: response.map((e: any) => ({
        ...e,
        start_time: new Date(e.start_time),
        end_time: new Date(e.end_time),
        date_created: new Date(e.date_created),
        date_modified: new Date(e.date_modified),
        tags: e.tags.map((t: any) => t.tag_name),
      })),
      duration: duration,
      pageSize: pageSize,
      resultSize: resultSize.event_count,
    };
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error searching events"
    });
    throw new Error("Error searching events: " + error);
  }
};

export const fetchEvents = async () => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    return data ?? [];
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching events"
    });
    throw new Error("Error fetching events: " + error);
  }
};

export const fetchEventById = async (
  eventID: number,
): Promise<EventPageInformation | null> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events/${eventID}`,
      {
        method: "GET",
      },
    );
    return response.json() ?? null;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching event by ID"
    });
    throw new Error("Error fetching event by ID: " + error);
  }
};

/**
 * Create an event
 * @param {EventCreate} event - The event to create
 * @returns {Promise<number>} The created event ID
 */
export const createEvent = async (event: CreateEventData) => {
  try {
    console.log("Formatted event: ", event);
    console.log(`${API_URL}/events`);

    const response = await fetchUtil(
      `${API_URL}/events`,
      {
        method: "POST",
        body: event,
      },
    );
    const data = await response.json();
    console.log("response ", data);
    return data ?? null;
  } catch (error: Error | any) {
    let toastMsg = "Error creating event. Please try again later.";
    if (error.message.includes("Unauthorized")) {
      toastMsg = "Unauthorized: Please log in to create an event";
    }
    Toast.show({
      type: "error",
      text1: toastMsg
    });
    throw new Error("Error creating event: " + error);
  }
};

export const followEventForUser = async (eventId: number) => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events/${eventId}/save`,
      {
        method: "POST",
      },
    );

    const data = await response.json();
    return data ?? null;
  } catch (error: Error | any) {
    let toastMsg = "";
    let toastMsg2 = "";
    if (error.message.includes("Unauthorized")) {
      toastMsg = "Unauthorized: Please log in to follow an event";
    }
    else {
      toastMsg = error.message;
    }
    if (toastMsg === "") {
      toastMsg = "Error following event. Please try again later.";
      toastMsg2 = "Did you already follow this event?";
    }
    Toast.show({
      type: "error",
      text1: toastMsg,
      text2: toastMsg2 ? toastMsg2 : undefined
    });
    throw new Error("Error following event for user: " + error);
  }
}

export const unfollowEventForUser = async (eventId: number) => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events/${eventId}/save`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    return data ?? null;
  } catch (error: Error | any) {
    let toastMsg = "";
    if (error.message.includes("Unauthorized")) {
      toastMsg = "Unauthorized: Please log in to unfollow an event";
    }
    else {
      toastMsg = error.message;
    }
    if (toastMsg === "") {
      toastMsg = "Error unfollowing event. Please try again later.";
    }
    Toast.show({
      type: "error",
      text1: toastMsg
    });
    throw new Error("Error unfollowing event for user: " + error);
  }
}

export const fetchUserEvents = async (user_name: string): Promise<EventPageInformation[]> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events/user/${user_name}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    return data ?? [];
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error fetching user events. Please try again later."
    });
    throw new Error("Error fetching user events: " + error);
  }
}