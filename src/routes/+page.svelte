<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "$lib/SearchBar.svelte";
  import MediaRow from "$lib/MediaRow.svelte";
  import mediaData from "$lib/MediaCard.svelte";

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

<main class="min-h-screen text-white">
  <SearchBar />
  <MediaRow
    title="Popular Movies"
    link="/popular"
    mediaItems={movies}
    {isLoading}
  />
  <MediaRow
    title="Popular Shows"
    link="/popular/shows"
    mediaItems={shows}
    {isLoading}
  />
</main>

<!-- <style lang="postcss"> -->
<!--   :global(html) { -->
<!--     background-color: #262626; -->
<!--   } -->
<!-- </style> -->
