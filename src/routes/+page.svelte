<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { movieData } from "../lib/Movie.svelte";
  import Movie from "../lib/Movie.svelte";
  import SearchBar from "$lib/SearchBar.svelte";

  let movies: movieData[] = [];
  let scrollContainer: HTMLDivElement;
  let showLeftShadow = false;
  let showRightShadow = true;
  let isLoading = true;
  let searchQuery = "";

  function handleScroll(e: Event) {
    const target = e.target as HTMLDivElement;
    showLeftShadow = target.scrollLeft > 0;
    showRightShadow =
      target.scrollLeft < target.scrollWidth - target.clientWidth;
  }

  function handleSearch(e: Event) {
    e.preventDefault();
    if (searchQuery.trim()) {
      goto(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  onMount(async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    movies = data;
    isLoading = false;
  });
</script>

<main class="min-h-screen text-white">
  <SearchBar></SearchBar>

  <h1 class="text-2xl font-bold mb-4 px-4">Popular Movies</h1>
  <div class="relative">
    <div
      bind:this={scrollContainer}
      onscroll={handleScroll}
      class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-3 px-4"
    >
      {#if isLoading}
        {#each Array(20) as _}
          <div class="flex-none w-[150px]">
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
          <div class="flex-none w-[150px]">
            <Movie data={movie} />
          </div>
        {/each}
      {/if}
    </div>
    <div
      class="absolute left-0 top-0 h-full w-8 bg-gradient-to-r to-transparent pointer-events-none transition-opacity duration-300 {!showLeftShadow
        ? 'opacity-0'
        : ''} {isLoading ? 'from-white/10' : 'from-white/40'}"
    ></div>
    <div
      class="absolute right-0 top-0 h-full w-8 bg-gradient-to-l to-transparent pointer-events-none transition-opacity duration-300 {!showRightShadow
        ? 'opacity-0'
        : ''} {isLoading ? 'from-white/10' : 'from-white/40'}"
    ></div>
  </div>
</main>

<style lang="postcss">
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  :global(html) {
    background-color: #262626;
  }
</style>
