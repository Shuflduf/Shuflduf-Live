<script lang="ts">
  import type { Episode } from "$lib/MediaCard.svelte";
  import { createEventDispatcher } from "svelte";

  export let episode: Episode;
  export let selected = false;

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => dispatch("select", { episode })}
  class="group flex items-start w-full {selected
    ? 'bg-gray-800'
    : 'bg-black/75'} text-white rounded overflow-hidden h-24 transition-colors"
>
  <div
    class="overflow-hidden w-48 [mask-image:linear-gradient(to_right,black_90%,transparent)]"
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
      alt={episode.name}
      class="w-full aspect-video object-cover transition-all duration-300 group-hover:scale-110"
    />
  </div>
  <div class="p-2 flex-1 flex flex-col h-full">
    <h3 class="text-lg font-bold text-left">{episode.name}</h3>
    <div class="overflow-y-auto flex-1">
      <p class="text-sm text-left">{episode.overview}</p>
    </div>
  </div>
</button>
