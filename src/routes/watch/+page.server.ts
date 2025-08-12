import { env } from "$env/dynamic/private";
import { Media, Review, tmdbUrlConstructor } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const id = parseInt(url.searchParams.get("id") ?? "808");
  const s = parseInt(url.searchParams.get("s") ?? "1");
  const e = parseInt(url.searchParams.get("e") ?? "1");

  let content: Media = new Media();
  let correctRoute: string = "";
  let seasons: string[] = [];
  let episodes: Media[] = [];

  for (const route of ["movie", "tv"]) {
    const req = await fetch(`${tmdbUrlConstructor(`/${route}/` + id, {})}`, {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    });
    const res = await req.json();
    if (res.success != false) {
      correctRoute = route;
      content = Media.fromData(res);
      if (route == "tv") {
        seasons = res.seasons.map((s: any) => s.name);
        episodes = await getEpisodes(id, s);
      }

      break;
    }
  }
  console.log(episodes);

  // const content = Media.fromData(res);
  // content.genres = res.genres.map((g: any) => g.id);

  return {
    id,
    s,
    e,
    seasons,
    episodes: JSON.stringify(episodes),
    content: JSON.stringify(content),
    reviews: JSON.stringify(await getReviews(id, correctRoute)),
  };
};

async function getEpisodes(id: number, season: number): Promise<Media[]> {
  const req = await fetch(
    `${tmdbUrlConstructor(`/tv/${id}/season/${season}`, {})}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const res = await req.json();
  const eps = res.episodes.map((e: any) => {
    return Media.fromEpisode(e);
  });

  return eps;
}

async function getReviews(id: number, route: string): Promise<Review[]> {
  const req = await fetch(
    `https://api.themoviedb.org/3/${route}/${id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const res = await req.json();
  const reviews = res.results.map((r: any) => Review.fromData(r));
  return reviews;
}
