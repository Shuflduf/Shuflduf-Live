<script lang="ts">
  import type { PageProps } from "./$types";
  import { ContentType } from "$lib";
  import ContentList from "./ContentList.svelte";

  let { data }: PageProps = $props();

  let query = data.query ?? "shrek";
</script>

<div class="flex h-[calc(100vh-7.5rem)] flex-row gap-4">
  <ContentList {query} text="Movies" type={ContentType.Movie} />
  <ContentList {query} text="Shows" type={ContentType.Show} />
</div>
