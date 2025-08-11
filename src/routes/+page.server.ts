import { env } from "$env/dynamic/private";
import { ContentType, ContentTypeText, Media, tmdbUrlConstructor } from "$lib";
import { lastWatched } from "$lib/continue";
import type { PageServerLoad } from "./watch/$types";

export const load: PageServerLoad = async () => {
  const movies = await fetchContentType(ContentType.Movie)
  const shows = await fetchContentType(ContentType.Show)

  return {
    movies: JSON.stringify(movies),
    shows: JSON.stringify(shows)
  }
}

async function fetchContentType(type: ContentType): Promise<Media[]> {
  const url = tmdbUrlConstructor(`/discover/${ContentTypeText(type)}`, { include_adult: false })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${env.TMDB_API_KEY}`
    }
  };
  const res = await fetch(url, options)
  const resJson = await res.json()
  const medias: Media[] = resJson.results.map((r: any): Media => Media.fromData(r))
  return medias
}
