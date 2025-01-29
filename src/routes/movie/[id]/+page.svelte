<script lang="ts">
  import type { movieData } from "$lib/Movie.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let movie: movieData;

  onMount(async () => {
    const response = await fetch(`/api/movies/${$page.params.id}`);
    movie = await response.json();
  });
</script>

{#if movie}
  <h1>{movie.title}</h1>
  <p>{movie.overview}</p>
{:else}
  <p>Loading...</p>
{/if}
