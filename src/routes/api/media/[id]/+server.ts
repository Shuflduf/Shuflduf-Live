import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { mediaData } from "$lib/MediaCard.svelte";

export const GET: RequestHandler = async ({ params, url }) => {
  const mediaId = params.id;
  const type = url.searchParams.get("type");
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${mediaId}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const media: mediaData = await response.json();

  return new Response(JSON.stringify(media), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
