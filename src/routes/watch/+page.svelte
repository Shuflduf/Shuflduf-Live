<script lang="ts">
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let id = data.id ?? "0";
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
    <div class="{BOX_STYLE} h-full">
      <h1 class={H1_STYLE}>Overview</h1>
    </div>
  </div>
  <div class="flex w-full flex-col gap-4">
    <div class="{BOX_STYLE} h-full">
      <h1 class={H1_STYLE}>Episodes</h1>
    </div>
    <div class="{BOX_STYLE} h-full">
      <h1 class={H1_STYLE}>Reviews</h1>
    </div>
  </div>
</div>
