import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { mediaData } from "$lib/MediaCard.svelte";

export const GET: RequestHandler = async ({ params, url }) => {
  const query = params.id;
  const page = url.searchParams.get("page") || "1";
  const type = url.searchParams.get("type");

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

  if (!type) {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${env.TMDB_API_KEY}`,
          accept: "application/json",
        },
      },
    );

    const showResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${env.TMDB_API_KEY}`,
          accept: "application/json",
        },
      },
    );

    if (!movieResponse.ok || !showResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const movieData = await movieResponse.json();
    const showData = await showResponse.json();

    const movies: mediaData[] = movieData.results;
    const shows: mediaData[] = showData.results;

    return new Response(JSON.stringify({ movies, shows }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (type !== "movie" && type !== "tv") {
    return new Response(JSON.stringify({ error: "Invalid type parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`,
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
