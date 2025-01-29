import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { movieData } from "../../../../lib/Movie.svelte";

export const GET: RequestHandler = async ({ params }) => {
  const query = params.id;
  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is missing" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,

    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const data = await response.json();
  const movies: movieData[] = data.results;

  return new Response(JSON.stringify(movies), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
