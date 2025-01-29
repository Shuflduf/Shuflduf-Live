<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { movieData } from "$lib/Movie.svelte";
  import Movie from "$lib/Movie.svelte";
  import SearchBar from "$lib/SearchBar.svelte";

  let movies: movieData[] = [];
  let isLoading = true;
  let query = $page.params.id;

  onMount(async () => {
    const response = await fetch(
      `/api/search/${encodeURIComponent($page.params.id)}`,
    );
    const data = await response.json();
    console.log(data);
    movies = data;
    isLoading = false;
  });
</script>

<main class="min-h-screen text-white py-4">
  <SearchBar />
  <h1 class="text-2xl font-bold mb-4 px-4">Search Results for "{query}"</h1>
  <div class="px-4">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {#if isLoading}
        {#each Array(12) as _}
          <div class="w-full">
            <div class="rounded-2xl overflow-hidden">
              <div class="w-full h-[225px] bg-gray-700 animate-pulse relative">
                <div
                  class="absolute bottom-3 left-3 right-3 h-6 bg-gray-600 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        {#each movies as movie}
          <div class="w-full">
            <Movie data={movie} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</main>

<style lang="postcss">
  :global(html) {
    background-color: #262626;
  }
</style>
