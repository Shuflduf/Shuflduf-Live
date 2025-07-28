<script lang="ts">
  import { ContentType, Media } from "$lib";
  import { movieGenres, showGenres } from "$lib/genres";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";

  let {
    text,
    type,
    query,
  }: { text: string; type: ContentType; query: string } = $props();

  const params = new URLSearchParams({
    query,
    type: type.toString(),
    page: String(1),
  });

  let currentContent: Media[] = $state([]);

  onMount(async () => {
    const res = await fetch(`/api/search?${params.toString()}`);
    const resJson = await res.json();
    const results = resJson.results;
    // currentContent = resJson.results;
    currentContent = results.map((r: any) => Media.from_data(r));

    // if (type == ContentType.Movie) {
    //   console.log(Media.from_movie_data(results[0]));
    // }
    console.log(currentContent);
  });
</script>

<div class="{BOX_STYLE} flex w-full flex-col gap-4 overflow-y-auto">
  <h1 class={H1_STYLE}>{text}</h1>
  <!-- {output.body} -->
  {#each currentContent as content}
    <div class="{BOX_STYLE} ">
      <Overview {content} />
    </div>
  {/each}
</div>
