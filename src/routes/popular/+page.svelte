<script lang="ts">
  import { onMount } from "svelte";
  import Movie from "$lib/Movie.svelte";
  import SearchBar from "$lib/SearchBar.svelte";
  import type { movieData } from "$lib/Movie.svelte";
  import SkeletonCard from "$lib/SkeletonCard.svelte";

  let movies: movieData[] = [];
  let isLoading = false;
  let currentPage = 1;
  let hasMore = true;

  async function loadMoreMovies() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    const response = await fetch(`/api/popular?page=${currentPage}`);
    const data = await response.json();

    if (data.length === 0) {
      hasMore = false;
    } else {
      movies = [...movies, ...data];
      currentPage += 1;
    }
    isLoading = false;
  }

  function handleScroll() {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
    if (bottom) {
      loadMoreMovies();
    }
  }

  onMount(() => {
    const init = async () => {
      await loadMoreMovies();
      window.addEventListener("scroll", handleScroll);
    };
    init();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<main class="min-h-screen text-white">
  <SearchBar />
  <h1 class="text-2xl font-bold my-4 px-4">Popular Movies</h1>
  <div class="px-4">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {#each movies as movie}
        <div class="w-full">
          <Movie data={movie} />
        </div>
      {/each}
      {#if isLoading}
        {#each Array(12) as _}
          <SkeletonCard className="w-full" />
        {/each}
      {/if}
    </div>
  </div>
</main>
