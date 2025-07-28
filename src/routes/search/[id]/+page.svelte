<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { page } from "$app/stores";
  import type { mediaData } from "$lib/MediaCard.svelte";
  import MediaRow from "$lib/MediaRow.svelte";
  import MediaCard from "$lib/MediaCard.svelte";
  import SkeletonCard from "$lib/SkeletonCard.svelte";

  let movies: mediaData[] = [];
  let shows: mediaData[] = [];
  let mediaItems: mediaData[] = [];
  let isLoading = false;
  let query = $page.params.id;
  let currentPage = 1;
  let hasMore = true;
  let type = $page.url.searchParams.get("type");

  async function loadMedia(type: string) {
    if (isLoading || !hasMore) return;

    isLoading = true;
    const response = await fetch(
      `/api/search/${encodeURIComponent(query)}?type=${type}&page=${currentPage}`,
    );
    if (response.ok) {
      const newItems = await response.json();
      if (newItems.length === 0) {
        hasMore = false;
      } else {
        if (type === "movie") {
          movies = [...movies, ...newItems];
        } else {
          shows = [...shows, ...newItems];
        }
        currentPage += 1;
      }
    } else {
      console.error("Failed to fetch media items");
    }
    isLoading = false;
  }

  async function loadAllMedia() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    const response = await fetch(
      `/api/search/${encodeURIComponent(query)}?type=${type}&page=${currentPage}`,
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
      if (!type) {
        loadMedia("movie");
        loadMedia("tv");
      } else {
        loadAllMedia();
      }
    }
  }

  function resetState() {
    movies = [];
    shows = [];
    mediaItems = [];
    isLoading = false;
    currentPage = 1;
    hasMore = true;
  }

  async function initialize() {
    resetState();
    if (!type) {
      await loadMedia("movie");
      await loadMedia("tv");
    } else {
      await loadAllMedia();
    }
  }

  onMount(() => {
    initialize();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  afterUpdate(() => {
    const newQuery = $page.params.id;
    const newType = $page.url.searchParams.get("type");

    if (newQuery !== query || newType !== type) {
      query = newQuery;
      type = newType;
      initialize();
    }
  });
</script>

<main class="min-h-screen py-4 text-white">
  <SearchBar />
  <h1 class="mb-4 px-4 text-2xl font-bold">Search Results for "{query}"</h1>
  <div class="px-4">
    {#if !type}
      <MediaRow
        title="Movies"
        link={`/search/${query}?type=movie`}
        mediaItems={movies}
        {isLoading}
      />
      <MediaRow
        title="Shows"
        link={`/search/${query}?type=tv`}
        mediaItems={shows}
        {isLoading}
      />
    {:else}
      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {#if isLoading && mediaItems.length === 0}
          {#each Array(12) as _}
            <SkeletonCard className="w-full" />
          {/each}
        {:else}
          {#each mediaItems as media}
            <MediaCard data={media} />
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</main>
