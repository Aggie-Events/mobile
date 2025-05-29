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

// export const getEventTags = async (event_id: number): Promise<string[]> => {
//     try {
//         const IDs = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/events/${event_id}/tags`, {
//             method: 'GET',
//         }); // NOTE: currently working on making the event tags populate with the actual db data

//         const response = await fetchUtil(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
//             method: 'GET',
//             body: JSON.stringify({ query }),
//         });
//         return response.json() ?? [];
//     } catch (error) {
//         throw new Error('Error getting event tags' + error);
//     }
// };