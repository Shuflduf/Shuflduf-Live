<script lang="ts">
  import type { Media } from "$lib";
  import HorizontalScroll from "$lib/HorizontalScroll.svelte";
  import ShortOverview from "$lib/ShortOverview.svelte";
  import { BOX_STYLE } from "$lib/styles";

  let { media }: { media: Media[] } = $props();
</script>

<HorizontalScroll class="flex flex-row gap-4 overflow-x-auto">
  {#each media as content}
    <div class="{BOX_STYLE} min-w-72">
      <ShortOverview {content} />
    </div>
  {/each}
</HorizontalScroll>
