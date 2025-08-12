<script lang="ts">
  import type { Media } from "$lib";
  import { lastWatched, removeLastWatched } from "$lib/continue";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let continueMedia: Media[] = $state([]);

  onMount(() => {
    continueMedia = lastWatched();
  });

  function removeTop() {
    continueMedia.shift();
    removeLastWatched();
  }
</script>

<div
  class="mx-4 max-h-[calc(100vh-7.5rem)] w-[calc(100vw-2rem)] md:mx-0 md:w-full {BOX_STYLE} absolute left-0 flex-col overflow-y-auto backdrop-blur-md md:relative md:flex"
  in:fly|global={{ y: 100, duration: 300, delay: 100 }}
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
            delay: 100 + index * 100,
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
