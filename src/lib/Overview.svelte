<script lang="ts">
  import { ContentType, type Media } from "$lib";
  import { movieGenres, showGenres } from "./genres";
  import { H2_STYLE } from "./styles";

  let { content }: { content: Media } = $props();
</script>

<div class="flex h-40 flex-row gap-4 dark:text-white">
  <a href={`/watch?id=${content.id}`}>
    <img
      src="https://image.tmdb.org/t/p/w500/{content.posterPath}"
      alt="{content.name} poster"
      class="h-full max-w-32 min-w-32 rounded-md object-cover shadow-md transition hover:scale-105 hover:shadow-lg"
    />
  </a>

  <div class="flex w-full flex-col gap-2">
    <h2 class={H2_STYLE}>{content.name}</h2>
    <p class="w-full overflow-y-auto text-sm italic">{content.overview}</p>
  </div>
  <div class="hidden w-32 flex-col justify-between gap-2 lg:flex">
    <div class="flex flex-col gap-1 overflow-y-auto">
      {#each content.genres as genre_id}
        <p class="rounded-sm bg-blue-400 p-2 text-center text-white">
          {(content.type == ContentType.Movie ? movieGenres : showGenres)[
            genre_id
          ]}
        </p>
      {/each}
    </div>
    <p class="text-center font-[Arvo] text-lg">
      {Math.round(content.voteAverage * 10) / 10}/10
    </p>
  </div>
</div>
