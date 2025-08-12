<script lang="ts">
  import type { PageProps } from "./$types";
  import { ContentType } from "$lib";
  import ContentList from "./ContentList.svelte";
  import { onMount } from "svelte";

  let { data }: PageProps = $props();

  let query = data.query ?? "shrek";
  let start: boolean = $state(false);
  let isMobile: boolean = $state(false);

  let tabIndex: number = $state(0);

  onMount(() => {
    start = true;

    isMobile = window.innerWidth < 768;
    window.addEventListener(
      "resize",
      (_) => (isMobile = window.innerWidth < 768),
    );
  });
</script>

{#if start}
  <div class="flex flex-row gap-4 md:hidden">
    <button
      class="w-full cursor-pointer rounded-md border border-slate-500 py-2 font-[Arvo] text-white backdrop-blur-xs transition
      {tabIndex == 0 ? 'bg-slate-300/10' : ''}"
      onclick={(_) => (tabIndex = 0)}
    >
      Movies
    </button>
    <button
      class="w-full cursor-pointer rounded-md border border-slate-500 py-2 font-[Arvo] text-white backdrop-blur-xs transition
      {tabIndex == 1 ? 'bg-slate-300/10' : ''}"
      onclick={(_) => (tabIndex = 1)}
    >
      Shows
    </button>
  </div>
  <div class="flex h-[calc(100vh-7.5rem)] flex-row gap-4">
    {#if isMobile}
      {#if tabIndex == 0}
        <ContentList {query} text="Movies" type={ContentType.Movie} />
      {:else if tabIndex == 1}
        <ContentList {query} text="Shows" type={ContentType.Show} />
      {/if}
    {:else}
      <ContentList {query} text="Movies" type={ContentType.Movie} />
      <ContentList {query} text="Shows" type={ContentType.Show} />
    {/if}
  </div>
{/if}
