import { env } from "$env/dynamic/private";
import { ContentType, ContentTypeText } from "$lib";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const params = url.searchParams;
  const query = params.get("query") ?? "";
  const page = params.get("page") ?? "1";
  const type = Number(params.get("type")) as ContentType;
  console.log(query, type, page);

  const reqParams = {
    query,
    page,
    lang: "en-US",
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/search/${ContentTypeText(type)}?${new URLSearchParams(reqParams)}`,
    {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );
  const resJson = await res.text();

  // const query = params.get("query")
  return new Response(resJson);
};
