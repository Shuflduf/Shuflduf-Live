import { env } from "$env/dynamic/private";
import { Media } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const id = url.searchParams.get("id")
  const req = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  })
  const res = await req.json()
  const content = Media.from_data(res)
  content.genres = res.genres.map((g: any) => g.id)
  console.log(content);


  return {
    id,
    content: JSON.stringify(content),
  }
};
