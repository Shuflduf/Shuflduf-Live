<script lang="ts">
  import type { Media } from "$lib";
  import { movieGenres } from "$lib/genres";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";
  import ShowcaseList from "./ShowcaseList.svelte";

  let { data }: PageProps = $props();
  const movies: Media[] = JSON.parse(data.movies);
  const shows: Media[] = JSON.parse(data.shows);
</script>

<div class="flex h-[calc(100vh-6rem)] flex-row gap-4">
  <div class="w-full max-w-3/5 {BOX_STYLE}">
    <h1 class="{H1_STYLE} mb-4">Popular</h1>
    <h2 class="{H2_STYLE} mb-4">Movies</h2>
    <ShowcaseList media={movies} />
    <h2 class="{H2_STYLE} my-4">Shows</h2>
    <ShowcaseList media={shows} />
  </div>
  <div class="flex h-full w-full flex-col gap-4">
    <div class="h-full w-full {BOX_STYLE}">
      <h1 class="font-[Arvo] text-2xl dark:text-white">Genres</h1>
      <div class="h-64 overflow-y-auto dark:text-white">
        {#each Object.values(movieGenres) as genre}
          <a href="/search">
            <div class="bg-blue-400 p-2">
              {genre}
            </div>
          </a>
        {/each}
      </div>
    </div>
    <div class="h-80 w-full {BOX_STYLE}">
      <h1 class="font-[Arvo] text-2xl dark:text-white">Continue</h1>
    </div>
  </div>
</div>

<!-- <MediaRow -->
<!--   title="Popular Movies" -->
<!--   link="/popular" -->
<!--   mediaItems={movies} -->
<!--   {isLoading} -->
<!-- /> -->
<!-- <MediaRow -->
<!--   title="Popular Shows" -->
<!--   link="/popular/shows" -->
<!--   mediaItems={shows} -->
<!--   {isLoading} -->
<!-- /> -->

<!-- <style lang="postcss"> -->
<!--   :global(html) { -->
<!--     background-color: #262626; -->
<!--   } -->
<!-- </style> -->
