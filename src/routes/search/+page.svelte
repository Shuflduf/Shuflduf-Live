<script>
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
</script>

<div class="flex h-[calc(100vh-7.5rem)] flex-row gap-4">
  <div class="{BOX_STYLE} flex w-full flex-col gap-4 overflow-y-auto">
    <h1 class={H1_STYLE}>Movies</h1>
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
