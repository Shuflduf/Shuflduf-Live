<script lang="ts">
  import type { movieData } from "$lib/Movie.svelte";
  import { onMount, tick } from "svelte";
  import { page } from "$app/stores";
  import SearchBar from "$lib/SearchBar.svelte";
  import { goto } from "$app/navigation";

  let movie: movieData;
  let isFullscreen = false;

  onMount(async () => {
    const response = await fetch(`/api/movies/${$page.params.id}`);
    movie = await response.json();
  });

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }

  const handleGenreClick = (genreId: number) => {
    goto(`/genre/${genreId}`);
  };
</script>

{#if movie}
  <div
    class="movie-backdrop min-h-screen bg-cover bg-center"
    style="--backdrop-url: url('https://image.tmdb.org/t/p/original{movie.backdrop_path}')"
  >
    <div class="backdrop-blur-md bg-black/50 w-full min-h-screen">
      <div class={isFullscreen ? "hidden" : ""}>
        <SearchBar />
      </div>
      <div class="px-4">
        <div class="flex flex-col lg:flex-row w-full lg:gap-4">
          <div
            class={isFullscreen
              ? "w-screen mb-4"
              : "w-full lg:w-1/2 mb-4 lg:mb-0"}
          >
            <iframe
              src={`https://moviesapi.club/movie/${movie.id}`}
              title={movie.title}
              class="w-full aspect-video"
            ></iframe>
            <div
              class="p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <p class="text-sm text-gray-500">
                Note: Fullscreen functionality may not work in embedded view.
                Press this button to scale up the stream. (On Desktop, press F11
                to hide browser UI)
              </p>
              <button
                on:click={toggleFullscreen}
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          </div>
          <div class="w-full lg:w-1/2">
            <h1 class="text-white font-bold text-3xl mb-4">{movie.title}</h1>
            <p class="text-white mb-4 italic">{movie.overview}</p>
            <div class="flex flex-wrap gap-2">
              {#each movie.genres as genre}
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

  .movie-backdrop {
    background-image: var(--backdrop-url);
  }
</style>
