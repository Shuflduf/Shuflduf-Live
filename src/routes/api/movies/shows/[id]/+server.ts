import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { movieData } from "$lib/Movie.svelte";

export const GET: RequestHandler = async ({ params }) => {
  const movieId = params.id;
  const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
  const movie: movieData = await response.json();

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
