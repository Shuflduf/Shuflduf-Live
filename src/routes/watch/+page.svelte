<script lang="ts">
  import { BOX_STYLE } from "$lib/styles";
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
    <div class="{BOX_STYLE} h-full"></div>
  </div>
  <div class="flex w-full flex-col gap-4">
    <div class="{BOX_STYLE} h-full"></div>
    <div class="{BOX_STYLE} h-full"></div>
  </div>
</div>
