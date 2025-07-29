import { env } from "$env/dynamic/private";
import { Media, Review, tmdbUrlConstructor } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const id = url.searchParams.get("id") ?? "808";
  const req = await fetch(`${tmdbUrlConstructor("/movie/" + id, {})}`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
  const res = await req.json();
  const content = Media.fromData(res);
  content.genres = res.genres.map((g: any) => g.id);
  console.log(content);

  return {
    id,
    content: JSON.stringify(content),
    reviews: JSON.stringify(await getReviews(id))
  };
};

async function getReviews(id: string): Promise<Review[]> {
  const req = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
  const res = await req.json();
  const reviews = res.results.map((r: any) => Review.fromData(r))
  console.log(reviews);

  return reviews

}
