<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { mediaData } from "$lib/MediaCard.svelte";
  import { movieGenres, tvGenres } from "$lib/utils/genres";
  import SearchBar from "$lib/SearchBar.svelte";
  import MediaCard from "$lib/MediaCard.svelte";
  import SkeletonCard from "$lib/SkeletonCard.svelte";

  let mediaItems: mediaData[] = [];
  let isLoading = false;
  let genreName = "";
  let genreId: number;
  let type: string;
  let currentPage = 1;
  let hasMore = true;

  async function loadMedia() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    const response = await fetch(
      `/api/genre/${genreId}?type=${type}&page=${currentPage}`,
    );
    if (response.ok) {
      const newItems = await response.json();
      if (newItems.length === 0) {
        hasMore = false;
      } else {
        mediaItems = [...mediaItems, ...newItems];
        currentPage += 1;
      }
    } else {
      console.error("Failed to fetch media items");
    }
    isLoading = false;
  }

  function handleScroll() {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom) {
      loadMedia();
    }
  }

  onMount(() => {
    async function initialize() {
      genreId = Number($page.params.id);
      if (genreId in movieGenres) {
        genreName = movieGenres[genreId];
        type = "movie";
      } else if (genreId in tvGenres) {
        genreName = tvGenres[genreId];
        type = "tv";
      } else {
        genreName = "Invalid Genre";
        return;
      }

      await loadMedia();
      window.addEventListener("scroll", handleScroll);
    }

    initialize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<main class="min-h-screen text-white">
  <SearchBar />
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-4 px-4">
      {genreName}
      {type === "movie" ? "Movies" : "Shows"}
    </h1>
    <div class="px-4">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {#each mediaItems as media}
          <MediaCard data={media} />
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
