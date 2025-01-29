<script module lang="ts">
  export type movieData = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    genres: { id: number; name: string }[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    name?: string; // Added for TV shows
    title?: string; // Made optional since shows use name
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
</script>

<script lang="ts">
  const { data } = $props<{ data: movieData }>();
  let displayTitle = $derived(data.title || data.name || "Untitled");
  let link = data.name
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
