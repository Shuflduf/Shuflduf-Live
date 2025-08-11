<script lang="ts">
  import type { PageProps } from "./$types";
  import { ContentType } from "$lib";
  import ContentList from "./ContentList.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let { data }: PageProps = $props();

  let query = data.query ?? "shrek";

  let start: boolean = $state(false);

  onMount(() => {
    start = true;
  });
</script>

{#if start}
  <div class="flex h-[calc(100vh-7.5rem)] flex-row gap-4">
    <ContentList {query} text="Movies" type={ContentType.Movie} />
    <ContentList {query} text="Shows" type={ContentType.Show} />
  </div>
{/if}
