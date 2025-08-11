<script lang="ts">
  import type { Media } from "$lib";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import ShowcaseList from "./ShowcaseList.svelte";
  import { lastWatched } from "$lib/continue";
  import Overview from "$lib/Overview.svelte";

  let { data }: PageProps = $props();
  const movies: Media[] = JSON.parse(data.movies);
  const shows: Media[] = JSON.parse(data.shows);

  let continueMedia: Media[] = $state([]);

  onMount(() => {
    continueMedia = lastWatched();
  });
</script>

<div class="flex h-full max-h-[calc(100vh-6rem)] flex-row gap-4">
  <div class="w-full max-w-3/5 {BOX_STYLE}">
    <h1 class="{H1_STYLE} mb-4">Popular</h1>
    <h2 class="{H2_STYLE} mb-4">Movies</h2>
    <ShowcaseList media={movies} />
    <h2 class="{H2_STYLE} my-4">Shows</h2>
    <ShowcaseList media={shows} />
  </div>
  <div
    class="max-h-[calc(100vh-7.5rem)] w-full {BOX_STYLE} flex flex-col overflow-y-auto"
  >
    <h1 class="mb-4 font-[Arvo] text-2xl dark:text-white">Continue</h1>
    {#if continueMedia.length > 0}
      <div class="flex flex-col gap-4">
        {#each continueMedia as content}
          <div class={BOX_STYLE}>
            <Overview {content} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex h-full items-center justify-center">
        <p class="text-slate-500">Your continue watching list is empty.</p>
      </div>
    {/if}
  </div>
</div>

<!-- <MediaRow -->
<!--   title="Popular Movies" -->
<!--   link="/popular" -->
<!--   mediaItems={movies} -->
<!--   {isLoading} -->
<!-- /> -->
<!-- <MediaRow -->
<!--   title="Popular Shows" -->
<!--   link="/popular/shows" -->
<!--   mediaItems={shows} -->
<!--   {isLoading} -->
<!-- /> -->

<!-- <style lang="postcss"> -->
<!--   :global(html) { -->
<!--     background-color: #262626; -->
<!--   } -->
<!-- </style> -->
