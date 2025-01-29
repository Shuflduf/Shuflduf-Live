<script lang="ts">
  import type { mediaData } from "$lib/MediaCard.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import SearchBar from "$lib/SearchBar.svelte";
  import { goto } from "$app/navigation";

  let media: mediaData;
  let isMovie = false;

  onMount(async () => {
    const response = await fetch(
      `/api/media/${$page.params.id}?type=${$page.url.searchParams.get("type")}`,
    );
    media = await response.json();
    isMovie = !!media.original_title;
  });

  const handleGenreClick = (genreId: number) => {
    goto(`/genre/${genreId}`);
  };
</script>

{#if media}
  <div
    class="media-backdrop min-h-screen bg-cover bg-center"
    style="--backdrop-url: url('https://image.tmdb.org/t/p/original{media.backdrop_path}')"
  >
    <div class="backdrop-blur-md bg-black/50 w-full min-h-screen">
      <SearchBar />
      <div class="px-4">
        <div class="flex flex-col lg:flex-row w-full lg:gap-4">
          <div class="w-full lg:w-1/2 mb-4 lg:mb-0">
            <iframe
              src={`https://moviesapi.club/${isMovie ? "movie" : "tv"}/${media.id}`}
              title={media.original_title || media.name}
              allowfullscreen
              class="w-full aspect-video"
            ></iframe>
          </div>
          <div class="w-full lg:w-1/2">
            <h1 class="text-white font-bold text-3xl mb-4">
              {media.original_title || media.name}
            </h1>
            <p class="text-white mb-4 italic">{media.overview}</p>
            <div class="flex flex-wrap gap-2">
              {#each media.genres as genre}
                <button
                  on:click={() => handleGenreClick(genre.id)}
                  class="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  {genre.name}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style lang="postcss">
  :global(html) {
    background-color: #262626;
  }

  .media-backdrop {
    background-image: var(--backdrop-url);
  }
</style>
