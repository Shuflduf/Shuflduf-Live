<script lang="ts">
  import SearchBar from "$lib/SearchBar.svelte";
  import MediaRow from "$lib/MediaRow.svelte";
  import mediaData from "$lib/MediaCard.svelte";
  import { onMount } from "svelte";
  import { BOX_STYLE } from "$lib/styles";

  let movies: mediaData[] = [];
  let shows: mediaData[] = [];
  let isLoading = true;

  onMount(async () => {
    const movieResponse = await fetch("/api/movies");
    movies = await movieResponse.json();
    const showResponse = await fetch("/api/movies/shows");
    shows = await showResponse.json();
    isLoading = false;
  });
</script>

<main class="flex h-screen flex-col gap-4 p-4">
  <SearchBar />
  <div class="flex h-[calc(100vh-6rem)] flex-row gap-4">
    <div class="w-full {BOX_STYLE}">
      <h1 class="font-[Arvo] text-2xl dark:text-white">Popular</h1>
    </div>
    <div class="flex h-full w-2xl flex-col gap-4">
      <div class="h-full w-full {BOX_STYLE}">
        <h1 class="font-[Arvo] text-2xl dark:text-white">Tags</h1>
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
</main>

<!-- <style lang="postcss"> -->
<!--   :global(html) { -->
<!--     background-color: #262626; -->
<!--   } -->
<!-- </style> -->
