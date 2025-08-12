<script lang="ts">
  import { ContentType, Media } from "$lib";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE, H2_STYLE } from "$lib/styles";
  import { onMount } from "svelte";
  import { fly, slide } from "svelte/transition";

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
  let lastAddedIndex: number = $state(0);
  let loadingMore: boolean = $state(false);
  let page: number = 2;

  onMount(async () => {
    const res = await fetch(`/api/search?${params.toString()}`);
    const resJson = await res.json();
    const results = resJson.results;
    // currentContent = resJson.results;
    currentContent = results.map((r: any) => Media.fromData(r));

    // if (type == ContentType.Movie) {
    //   console.log(Media.from_movie_data(results[0]));
    // }
    console.log(currentContent);
  });

  function onListScroll(e: Event) {
    const target = e.target as HTMLElement;
    if (target.scrollTop + target.offsetHeight + 200 > target.scrollHeight) {
      console.log("load more");
      loadMore();
    }
  }

  async function loadMore() {
    if (loadingMore) {
      return;
    }

    lastAddedIndex = currentContent.length - 1;
    loadingMore = true;
    const params = new URLSearchParams({
      query,
      type: type.toString(),
      page: String(page),
    });

    const res = await fetch(`/api/search?${params.toString()}`);
    const resJson = await res.json();
    const results = resJson.results;
    currentContent = currentContent.concat(
      results.map((r: any) => Media.fromData(r)),
    );
    page++;
    loadingMore = false;
  }
</script>

<div
  onscroll={onListScroll}
  class="{BOX_STYLE} flex w-full flex-col gap-4 overflow-y-auto"
  in:fly|global={{ y: 100, duration: 300 }}
>
  <h1 class={H1_STYLE}>{text}</h1>
  <!-- {output.body} -->
  {#each currentContent as content, index}
    <div
      class={BOX_STYLE}
      in:fly|global={{
        y: 100,
        duration: 300,
        delay: (index - lastAddedIndex) * 100,
      }}
    >
      <Overview {content} />
    </div>
  {/each}
  {#if loadingMore}
    <p class="text-center text-slate-500">Loading...</p>
  {/if}
</div>
