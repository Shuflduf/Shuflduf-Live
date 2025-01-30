import { env } from "$env/dynamic/private";
import type { RequestHandler } from "@sveltejs/kit";
import type { Episode } from "$lib/MediaCard.svelte";

export const GET: RequestHandler = async ({ params, url }) => {
  const showId = url.searchParams.get("showId");
  const seasonNumber = params.id;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const seasonData = await response.json();
  const episodes: Episode[] = seasonData.episodes.map((episode: any) => ({
    id: episode.id,
    name: episode.name,
    overview: episode.overview,
    vote_average: episode.vote_average,
    vote_count: episode.vote_count,
    air_date: episode.air_date,
    episode_number: episode.episode_number,
    season_number: episode.season_number,
    show_id: episode.show_id,
    still_path: episode.still_path,
  }));

  return new Response(JSON.stringify(episodes), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
