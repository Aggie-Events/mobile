import { fetchUtil } from "@/api/fetch";
import { Event } from "@/config/dbtypes";
import { EventCreate, EventPageInformation } from "@/config/query-types";
import { API_URL } from "@/config/api-url";

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
    throw new Error("Error searching events" + error);
  }
};

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events`,
      {
        method: "GET",
      },
    );
    return response.json() ?? [];
  } catch (error) {
    throw new Error("Error fetching events");
  }
};

export const fetchEventById = async (
  eventID: number,
): Promise<EventPageInformation> => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events/${eventID}`,
      {
        method: "GET",
      },
    );
    return response.json() ?? null;
  } catch (error) {
    throw new Error("Error fetching event");
  }
};

export const createEvent = async (event: EventCreate) => {
  try {
    const response = await fetchUtil(
      `${API_URL}/events`,
      {
        method: "POST",
        body: event,
      },
    );
    return response.json() ?? null;
  } catch (error) {
    throw new Error("Error creating event");
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
