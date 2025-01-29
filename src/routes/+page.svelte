<script lang="ts">
  import { onMount } from "svelte";
  import type { movieData } from "../lib/Movie.svelte";
  import Movie from "../lib/Movie.svelte";

  let movies: movieData[] = [];
  let scrollContainer: HTMLDivElement;
  let showLeftShadow = false;
  let showRightShadow = true;

  function handleScroll(e: Event) {
    const target = e.target as HTMLDivElement;
    showLeftShadow = target.scrollLeft > 0;
    showRightShadow =
      target.scrollLeft < target.scrollWidth - target.clientWidth;
  }

  onMount(async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    movies = data;
  });
</script>

<main class="min-h-screen text-white py-4">
  <h1 class="text-2xl font-bold mb-4 px-4">Popular Movies</h1>
  <div class="relative">
    <div
      bind:this={scrollContainer}
      on:scroll={handleScroll}
      class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-3 px-4"
    >
      {#each movies as movie}
        <div class="flex-none w-[150px]">
          <Movie data={movie} />
        </div>
      {/each}
    </div>
    <div
      class="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/40 to-transparent pointer-events-none transition-opacity duration-300"
      class:opacity-0={!showLeftShadow}
    ></div>
    <div
      class="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/40 to-transparent pointer-events-none transition-opacity duration-300"
      class:opacity-0={!showRightShadow}
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
