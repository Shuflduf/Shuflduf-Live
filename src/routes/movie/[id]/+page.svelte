<script lang="ts">
  import type { movieData } from "$lib/Movie.svelte";
  import { onMount, tick } from "svelte";
  import { page } from "$app/stores";

  let movie: movieData;
  let isFullscreen = false;

  onMount(async () => {
    const response = await fetch(`/api/movies/${$page.params.id}`);
    movie = await response.json();
  });

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }
</script>

{#if movie}
  <div
    style="background-image: url('https://image.tmdb.org/t/p/original{movie.backdrop_path}'); background-size: cover; background-position: center; min-height: 100vh;"
  >
    <div
      class="backdrop-blur-md bg-black/50 w-full min-h-screen {isFullscreen
        ? ''
        : 'p-4'}"
    >
      <a
        href="/"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block mb-4 {isFullscreen
          ? 'hidden'
          : ''}"
      >
        ← Back to Home
      </a>
      <div
        class={isFullscreen
          ? "flex flex-col w-full"
          : "flex flex-row w-full gap-4"}
      >
        <div class={isFullscreen ? "w-screen mb-4" : "w-1/2"}>
          <iframe
            src={`https://moviesapi.club/movie/${movie.id}`}
            title={movie.title}
            class="w-full aspect-video"
          ></iframe>
          <div class="p-2 flex justify-between items-center">
            <p class="text-sm mr-2 text-gray-500">
              Note: Fullscreen functionality may not work in embedded view.
              Press this button to scale up the stream. (On Desktop, press F11
              to hide browser UI)
            </p>
            <button
              on:click={toggleFullscreen}
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
        <div class="w-1/2">
          <h1 class="text-white font-bold text-3xl">{movie.title}</h1>
          <p class="text-white mt-2 italic">{movie.overview}</p>
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
</style>
