export interface Event {
  event_id: number;
  contributer_id: number;
  event_name: string;
  event_description: string;
  event_location: string | null;
  event_img: string;
  start_time: Date;
  end_time: Date;
  event_status: string;
  date_created: Date;
  date_modified: Date;
  event_saves: number;
  max_capacity: number;
}

export interface Organization {
  org_id: number;
  org_name: string;
  org_email: string | null;
  org_description: string | null;
  org_icon: string | null;
  org_verified: boolean;
  org_reputation: number;
  org_building: string | null;
  org_room: string | null;
  org_events_count: number;
  org_members_count: number;
  org_slug: string | null;
}

export interface User {
  user_email: string;
  user_displayname: string;
  user_img: string;
  user_id: number;
  user_name: string | null;
}