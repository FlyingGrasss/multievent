export type Locale = "tr" | "en";

export type ArtistType = {
  id: string;
  nameTr: string;
  nameEn: string;
  imageUrl: string;
  link?: string | null;
  sortOrder: number;
  active: boolean;
};

export type ServiceType = {
  id: string;
  titleTr: string;
  titleEn: string;
  descriptionTr?: string | null;
  descriptionEn?: string | null;
  icon?: string | null;
  sortOrder: number;
  active: boolean;
};

export type EventMediaType = {
  id?: string;
  url: string;
  type: "image" | "video";
  sortOrder: number;
};

export type EventType = {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  venueTr?: string | null;
  venueEn?: string | null;
  eventDate?: Date | string | null;
  sortOrder: number;
  active: boolean;
  media: EventMediaType[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
