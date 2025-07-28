<script lang="ts">
  import { render } from "svelte/server";
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";
  import { ContentType } from "$lib";
  import { onMount } from "svelte";

  let { data }: PageProps = $props();

  let query = data.query ?? "shrek";
  // const output = render(Search, {
  //   props: {
  //     query,
  //     type: ContentType.Movie,
  //     page: 0,
  //   },
  // });
  const params = new URLSearchParams({
    query,
    type: ContentType.Movie.toString(),
    page: String(1),
  });
  onMount(async () => {
    const res = await fetch(`/api/search?${params.toString()}`);
    console.log(await res.json());
  });
</script>

<div class="flex h-[calc(100vh-7.5rem)] flex-row gap-4">
  <div class="{BOX_STYLE} flex w-full flex-col gap-4 overflow-y-auto">
    <h1 class={H1_STYLE}>Movies</h1>
    <!-- {output.body} -->
    {#each Array(20)}
      <div class="{BOX_STYLE} min-h-32"></div>
    {/each}
  </div>
  <div class="{BOX_STYLE} flex h-full w-full flex-col gap-4 overflow-y-scroll">
    <h1 class={H1_STYLE}>Shows</h1>
    {#each Array(20)}
      <div class="{BOX_STYLE} min-h-32"></div>
    {/each}
  </div>
</div>
