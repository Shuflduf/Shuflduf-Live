import { env } from "$env/dynamic/private";
import { Media, Review, tmdbUrlConstructor } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const id = url.searchParams.get("id") ?? "808";

  let content: Media = new Media()
  let correctRoute: string = ""

  for (const route of ["movie", "tv"]) {
    const req = await fetch(`${tmdbUrlConstructor(`/${route}/` + id, {})}`, {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    });
    const res = await req.json();
    if (res.success != false) {
      correctRoute = route
      content = Media.fromData(res)
      break
    }
  }

  // const content = Media.fromData(res);
  // content.genres = res.genres.map((g: any) => g.id);

  return {
    id,
    content: JSON.stringify(content),
    reviews: JSON.stringify(await getReviews(id, correctRoute))
  };
};

async function getReviews(id: string, route: string): Promise<Review[]> {
  const req = await fetch(`https://api.themoviedb.org/3/${route}/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
  const res = await req.json();
  console.log(res);

  const reviews = res.results.map((r: any) => Review.fromData(r))
  console.log(reviews);

  return reviews

}
