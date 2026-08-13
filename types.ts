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
