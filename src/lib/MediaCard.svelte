<script module lang="ts">
  export type Genre = {
    id: number;
    name: string;
  };

  export type Season = {
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  };

  export type Episode = {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };

  export type movieData = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    genres: Genre[];
    id: number;
    title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
  };

  export type showData = {
    adult: boolean;
    backdrop_path: string;
    genres: Genre[];
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: Season[];
  };
</script>

<script lang="ts">
  export let data: movieData | showData;
  let displayTitle = "title" in data ? data.title : data.name || "Untitled";
  let link =
    "name" in data
      ? `/media/${data.id}?type=tv`
      : `/media/${data.id}?type=movie`;
</script>

<a href={link} class="block">
  <main class="w-full rounded-2xl overflow-hidden shadow-lg relative group">
    <img
      class="w-full aspect-[2/3] object-contain transform transition-transform duration-300 group-hover:scale-110"
      src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      alt={displayTitle}
    />
    <div
      class="absolute bottom-0 left-0 right-0 bg-black/75 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 max-h-[75%] flex flex-col"
    >
      <div class="p-2">
        <h1 class="text-sm font-semibold">{displayTitle}</h1>
      </div>
      <div class="p-2 pt-0 pb-4 overflow-y-auto">
        <p class="text-xs">{data.overview}</p>
      </div>
    </div>
  </main>
</a>
