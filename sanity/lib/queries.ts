export const ARTISTS_QUERY = `*[_type == "artist"] {
  id,
  name,
  "imageUrl": image.asset->url,
  "dimensions": image.asset->metadata.dimensions,
  link
}`;