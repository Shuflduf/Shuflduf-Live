<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { movieData } from "$lib/Movie.svelte";
  import type { GenreId } from "$lib/utils/genres";
  import { movieGenres } from "$lib/utils/genres";
  import Movie from "$lib/Movie.svelte";
  import SearchBar from "$lib/SearchBar.svelte";
  import SkeletonCard from "$lib/SkeletonCard.svelte";

  let movies: movieData[] = [];
  let isLoading = false;
  let currentPage = 1;
  let hasMore = true;
  let genreName = "";
  let genreId: GenreId;

  async function loadMoreMovies() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    const response = await fetch(`/api/genre/${genreId}?page=${currentPage}`);
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
      genreId = Number($page.params.id) as GenreId;
      if (genreId in movieGenres) {
        genreName = movieGenres[genreId];
        await loadMoreMovies();
        window.addEventListener("scroll", handleScroll);
      } else {
        genreName = "Invalid Genre";
      }
    };
    init();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<main class="min-h-screen text-white">
  <SearchBar />
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-4 px-4">
      <a href="/popular" class="hover:text-gray-300 transition-colors"
        >{genreName} Movies</a
      >
    </h1>
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
  </div>
</main>

<style lang="postcss">
  :global(html) {
    background-color: #262626;
  }
</style>
