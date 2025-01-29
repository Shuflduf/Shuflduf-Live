<script lang="ts">
  import SkeletonCard from "../lib/SkeletonCard.svelte";

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
  <SearchBar />
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-4 px-4">
      <a
        href="/popular"
        class="hover:text-gray-300 transition-colors inline-flex items-center gap-1 underline underline-offset-4"
      >
        Popular Movies
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </h1>
    <div class="relative">
      <div
        bind:this={scrollContainer}
        onscroll={handleScroll}
        class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-3 px-4"
      >
        {#if isLoading}
          {#each Array(20) as _}
            <SkeletonCard />
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
