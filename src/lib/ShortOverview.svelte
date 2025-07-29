<script lang="ts">
  import { ContentType, type Media } from "$lib";
  import { movieGenres, showGenres } from "./genres";
  import { H2_STYLE } from "./styles";

  let { content }: { content: Media } = $props();
</script>

<div class="flex h-40 flex-row gap-4 dark:text-white">
  <a href={`/watch?id=${content.id}`}>
    <img
      src="https://image.tmdb.org/t/p/w500/{content.posterPath}"
      alt="{content.name} poster"
      class="h-full max-w-32 min-w-32 rounded-md object-cover"
    />
  </a>

  <div class="flex flex-col gap-2 overflow-y-auto">
    <h2 class={H2_STYLE}>{content.name}</h2>
    <p class="w-full text-sm italic">{content.overview}</p>
  </div>
</div>
