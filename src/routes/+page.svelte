<script lang="ts">
  import type { Media } from "$lib";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import ShowcaseList from "./ShowcaseList.svelte";
  import { lastWatched, removeLastWatched } from "$lib/continue";
  import Overview from "$lib/Overview.svelte";
  import { fly, slide } from "svelte/transition";

  let { data }: PageProps = $props();
  const movies: Media[] = JSON.parse(data.movies);
  const shows: Media[] = JSON.parse(data.shows);

  let start: boolean = $state(false);
  let continueMedia: Media[] = $state([]);

  onMount(() => {
    continueMedia = lastWatched();
    start = true;

    // setTimeout(() => {
    //   start = true;
    // }, 1000);
  });

  function removeTop() {
    continueMedia.shift();
    removeLastWatched();
  }
</script>

{#if start}
  <div class="flex h-full max-h-[calc(100vh-6rem)] flex-row gap-4">
    <div
      class="max-w-3/5 min-w-3/5 {BOX_STYLE}"
      in:fly|global={{ y: -100, duration: 300 }}
    >
      <h1 class="{H1_STYLE} mb-4">Popular</h1>
      <h2 class="{H2_STYLE} mb-4">Movies</h2>
      <ShowcaseList media={movies} />
      <h2 class="{H2_STYLE} my-4">Shows</h2>
      <ShowcaseList media={shows} />
    </div>
    <div
      class="max-h-[calc(100vh-7.5rem)] w-full {BOX_STYLE} flex flex-col overflow-y-auto"
      in:fly|global={{ y: 100, duration: 300 }}
    >
      <h1 class="mb-4 font-[Arvo] text-2xl dark:text-white">Continue</h1>
      {#if continueMedia.length > 0}
        <button
          class="mb-4 w-full cursor-pointer rounded-md bg-red-400 p-2 font-[Arvo] font-bold text-white transition hover:bg-red-500"
          onclick={removeTop}
        >
          Remove Top
        </button>
        <div class="flex flex-col gap-4">
          {#each continueMedia as content, index (content)}
            <div
              class={BOX_STYLE}
              in:fly|global={{
                y: 100,
                duration: 300,
                delay: index * 100,
              }}
            >
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
{/if}
