<script lang="ts">
  import type { Media } from "$lib";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import ShowcaseList from "./ShowcaseList.svelte";
  import { fly } from "svelte/transition";
  import ContinueList from "./ContinueList.svelte";

  let { data }: PageProps = $props();
  const movies: Media[] = JSON.parse(data.movies);
  const shows: Media[] = JSON.parse(data.shows);

  let start: boolean = $state(false);

  onMount(() => {
    start = true;
  });
</script>

{#if start}
  <div class="md flex h-full max-h-[calc(100vh-6rem)] flex-row gap-4">
    <div
      class="min-w-3/5 md:max-w-3/5 {BOX_STYLE}"
      in:fly|global={{ y: -100, duration: 300 }}
    >
      <h1 class="{H1_STYLE} mb-4">Popular</h1>
      <h2 class="{H2_STYLE} mb-4">Movies</h2>
      <ShowcaseList media={movies} />
      <h2 class="{H2_STYLE} my-4">Shows</h2>
      <ShowcaseList media={shows} />
    </div>
    <ContinueList />
  </div>
{/if}
