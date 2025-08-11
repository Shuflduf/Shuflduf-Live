<script lang="ts">
  import { ContentType, Review, type Media } from "$lib";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import MediaReview from "./MediaReview.svelte";
  import { justWatched } from "$lib/continue";
  import { fly, slide } from "svelte/transition";

  let { data }: PageProps = $props();

  let id = data.id ?? "0";
  let content: Media = JSON.parse(data.content);
  let reviews: Review[] = JSON.parse(data.reviews);

  let start: boolean = $state(false);

  onMount(() => {
    justWatched(content);
    start = true;
  });
</script>

{#if start}
  <div class="flex h-[calc(100vh-7.5rem)] w-full flex-row gap-4">
    <div class="flex h-full w-full flex-col gap-4">
      <iframe
        src="https://moviesapi.club/movie/{id}"
        title="moviesapi.club"
        class="aspect-video rounded-md"
        allowfullscreen
        in:fly|global={{ y: -100, duration: 300, delay: 400 }}
      >
      </iframe>
      <div
        class="{BOX_STYLE} h-full overflow-y-auto"
        in:fly|global={{ x: -100, duration: 300 }}
      >
        <h1 class="{H1_STYLE} mb-4">Overview</h1>
        <Overview {content} />
      </div>
    </div>
    <div class="flex w-full flex-col gap-4">
      {#if content.type == ContentType.Show}
        <div
          class="{BOX_STYLE} h-full"
          in:fly|global={{ y: 100, duration: 300, delay: 200 }}
        >
          <h1 class={H1_STYLE}>Episodes</h1>
        </div>
      {/if}
      <div
        class="{BOX_STYLE} flex h-full flex-col gap-4 overflow-y-auto"
        in:fly|global={{ y: 100, duration: 300, delay: 100 }}
      >
        <h1 class={H1_STYLE}>Reviews</h1>
        {#each reviews as review}
          <MediaReview {review} />
        {/each}
      </div>
    </div>
  </div>
{/if}
