<script lang="ts">
  import { ContentType, Media } from "$lib";
  import { movieGenres, showGenres } from "$lib/genres";
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
    <div class="{BOX_STYLE} flex h-52 flex-row gap-4 dark:text-white">
      <a href={`/watch?id=${content.id}`}>
        <img
          src="https://image.tmdb.org/t/p/w500/{content.poster_path}"
          alt="{content.name} poster"
          class="h-full rounded-md object-cover"
        />
      </a>

      <div class="flex flex-col gap-2">
        <h2 class={H2_STYLE}>{content.name}</h2>
        <p class="w-full overflow-y-auto text-sm italic">{content.overview}</p>
      </div>
      <div class="flex w-64 min-w-64 flex-col justify-between gap-2">
        <div class="flex flex-col gap-1 overflow-y-auto">
          {#each content.genres as genre_id}
            <p class="rounded-sm bg-blue-400 p-2 text-center">
              {(content.type == ContentType.Movie ? movieGenres : showGenres)[
                genre_id
              ]}
            </p>
          {/each}
        </div>
        <p class="text-center font-[Arvo] text-lg">
          {Math.round(content.vote_average * 10) / 10}/10
        </p>
      </div>
    </div>
  {/each}
</div>
