import { env } from "$env/dynamic/private";
import { ContentType, Media, tmdbUrlConstructor } from "$lib";
import type { PageServerLoad } from "./watch/$types";

export const load: PageServerLoad = async () => {

  const url = tmdbUrlConstructor("/discover/movie", { include_adult: false })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${env.TMDB_API_KEY}`
    }
  };
  const res = await fetch(url, options)
  const resJson = await res.json()
  console.log(await resJson);
  const movies: Media[] = resJson.results.map((r: any) => Media.fromData(r))
  console.log(movies);



  return { movies: JSON.stringify(movies) }
}
