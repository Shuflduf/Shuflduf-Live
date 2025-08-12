<script lang="ts">
  import { ContentType, ContentTypeText, Review, type Media } from "$lib";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import MediaReview from "./MediaReview.svelte";
  import { justWatched } from "$lib/continue";
  import { fly, slide } from "svelte/transition";
  import { json } from "@sveltejs/kit";
  import { goto } from "$app/navigation";

  let { data }: PageProps = $props();

  let id = data.id;
  let s = data.s;
  let e = data.e;
  let episodes: Media[] = JSON.parse(data.episodes);
  let content: Media = JSON.parse(data.content);
  let reviews: Review[] = JSON.parse(data.reviews);
  let seasons: string[] = data.seasons;

  let start: boolean = $state(false);
  let moviesApiUrl: string = $state("");

  onMount(() => {
    justWatched(content);
    start = true;
    moviesApiUrl = `https://moviesapi.club/${ContentTypeText(content.type)}/${id}`;
    if (content.type == ContentType.Show) {
      moviesApiUrl += `-${s}-${e}`;
    }
  });

  function onSeasonSelected(e: Event) {
    const select = e.target as HTMLSelectElement;
    console.log(select.selectedIndex);
    window.location.href = `/watch?id=${id}&s=${select.selectedIndex + 1}`;
  }
</script>

{#if start}
  <div class="flex h-[calc(100vh-7.5rem)] w-full flex-row gap-4">
    <div class="flex h-full w-full flex-col gap-4">
      <iframe
        src={moviesApiUrl}
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
          class="{BOX_STYLE} flex h-full flex-col gap-4 overflow-y-auto"
          in:fly|global={{ y: 100, duration: 300, delay: 200 }}
        >
          <div class="flex flex-row gap-4">
            <h1 class={H1_STYLE}>Episodes</h1>
            <select class="dark:text-white" onchange={onSeasonSelected}>
              {#each seasons as season, index}
                <option selected={index + 1 == s}>{season}</option>
              {/each}
            </select>
          </div>
          {#each episodes as episode, index}
            <div
              class="flex flex-row gap-4 {BOX_STYLE} h-28"
              in:fly|global={{
                y: 100,
                duration: 300,
                delay: 200 + index * 100,
              }}
            >
              <a
                class="w-48"
                href={`/watch?id=${id}&s=${s}&e=${index + 1}`}
                data-sveltekit-reload
              >
                <img
                  src="https://image.tmdb.org/t/p/w500/{episode.posterPath}"
                  alt="poster"
                  class="h-full rounded-md transition hover:scale-105"
                />
              </a>
              <div class="w-full overflow-y-auto">
                <h2 class={H2_STYLE}>
                  {episode.name}
                </h2>
                <p class="text-sm italic dark:text-white">
                  {episode.overview}
                </p>
              </div>
            </div>
          {/each}
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
