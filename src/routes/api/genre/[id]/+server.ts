import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { mediaData } from "$lib/MediaCard.svelte";

export const GET: RequestHandler = async ({ params, url }) => {
  const page = url.searchParams.get("page") || "1";
  const genreId = params.id;
  const type = url.searchParams.get("type");

  if (!type || (type !== "movie" && type !== "tv")) {
    return new Response(JSON.stringify({ error: "Invalid type parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?with_genres=${genreId}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const data = await response.json();
  const media: mediaData[] = data.results;

  return new Response(JSON.stringify(media), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
