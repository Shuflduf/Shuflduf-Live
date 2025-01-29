import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { movieData } from "../../../lib/Movie.svelte";

export const GET: RequestHandler = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
  const data = await response.json();
  const movies: movieData[] = data.results;
  console.log(movies);

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
