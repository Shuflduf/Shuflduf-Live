export enum ContentType {
  Movie,
  Show,
}
export function ContentTypeText(type: ContentType) {
  return type == ContentType.Movie ? "movie" : "tv"
}
