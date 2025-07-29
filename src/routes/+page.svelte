<script lang="ts">
  import type { Media } from "$lib";
  import HorizontalScroll from "$lib/HorizontalScroll.svelte";
  import ShortOverview from "$lib/ShortOverview.svelte";
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let movies: Media[] = JSON.parse(data.movies);
</script>

<div class="flex h-[calc(100vh-6rem)] flex-row gap-4">
  <div class="w-full max-w-1/2 {BOX_STYLE}">
    <h1 class="{H1_STYLE} mb-4">Popular</h1>
    <div class="flex flex-row gap-4 overflow-x-auto">
      {#each movies as content}
        <div class="{BOX_STYLE} min-w-72">
          <ShortOverview {content} />
        </div>
      {/each}
    </div>
  </div>
  <div class="flex h-full w-full flex-col gap-4">
    <div class="h-full w-full {BOX_STYLE}">
      <h1 class="font-[Arvo] text-2xl dark:text-white">Tags</h1>
    </div>
    <div class="h-80 w-full {BOX_STYLE}">
      <h1 class="font-[Arvo] text-2xl dark:text-white">Continue</h1>
    </div>
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
