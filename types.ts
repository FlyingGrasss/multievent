export type ArtistType = {
  name: string;
  imageUrl: string;
  // Optional fields you might add later:
  id?: string;
  lqip?: string; // For blur placeholders
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
};