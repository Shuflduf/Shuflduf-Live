<script lang="ts">
  import { ContentType, type Media } from "$lib";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let id = data.id ?? "0";
  let content: Media = JSON.parse(data.content);
</script>

<div class="flex h-full w-full flex-row gap-4">
  <div class="flex w-full flex-col gap-4">
    <iframe
      src="https://moviesapi.club/movie/{id}"
      title="moviesapi.club"
      class="aspect-video rounded-md"
      allowfullscreen
    >
    </iframe>
    <div class="{BOX_STYLE} h-full overflow-y-auto">
      <h1 class="{H1_STYLE} mb-4">Overview</h1>
      <Overview {content} />
    </div>
  </div>
  <div class="flex w-full flex-col gap-4">
    {#if content.type == ContentType.Show}
      <div class="{BOX_STYLE} h-full">
        <h1 class={H1_STYLE}>Episodes</h1>
      </div>
    {/if}
    <div class="{BOX_STYLE} h-full">
      <h1 class={H1_STYLE}>Reviews</h1>
    </div>
  </div>
</div>
