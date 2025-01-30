<script lang="ts">
  import type {
    showData,
    movieData,
    Season,
    Episode,
  } from "$lib/MediaCard.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import SearchBar from "$lib/SearchBar.svelte";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";
  import EpisodeButton from "$lib/EpisodeButton.svelte";
  import SkeletonEpisode from "$lib/SkeletonEpisode.svelte";

  let media: showData | movieData;
  let isMovie = false;
  let selectedSeason = writable<Season | null>(null);
  let episodes = writable<Episode[]>([]);
  let iframeUrl = writable<string>("");
  let currentSeasonNumber = writable<number>(1);
  let selectedEpisodeNumber = writable<number | null>(null);
  let loading = writable<boolean>(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  onMount(async () => {
    const [mediaId, seasonNumber, episodeNumber] = $page.params.id.split("-");
    const response = await fetch(
      `/api/media/${mediaId}?type=${$page.url.searchParams.get("type")}`,
    );
    media = await response.json();
    isMovie = "title" in media;
    console.log(media);

    if (!isMovie && (media as showData).seasons?.length > 0) {
      // Find season by season_number or use first season as default
      const targetSeason = seasonNumber
        ? (media as showData).seasons.find(
            (s) => s.season_number === parseInt(seasonNumber, 10),
          )
        : (media as showData).seasons[0];

      selectedSeason.set(targetSeason ?? null);
      currentSeasonNumber.set(targetSeason?.season_number ?? 1);
      if (!targetSeason) return;
      const episodesResponse = await fetch(
        `/api/seasons/${targetSeason.season_number}?showId=${media.id}`,
      );
      const episodesData = await episodesResponse.json();
      episodes.set(episodesData);
    }

    if (episodeNumber) {
      selectedEpisodeNumber.set(parseInt(episodeNumber, 10));
    }

    iframeUrl.set(
      `https://moviesapi.club/${isMovie ? "movie" : "tv"}/${mediaId}${$selectedSeason ? `-${$selectedSeason.season_number}` : ""}${$selectedEpisodeNumber ? `-${$selectedEpisodeNumber}` : ""}`,
    );
  });

  const handleGenreClick = (genreId: number) => {
    goto(`/genre/${genreId}`);
  };

  const handleSeasonChange = async (event: Event) => {
    loading.set(true);
    const seasonNumber = parseInt(
      (event.target as HTMLSelectElement).value,
      10,
    );
    const selected = (media as showData).seasons.find(
      (s) => s.season_number === seasonNumber,
    );
    if (!selected) return;

    selectedSeason.set(selected);
    currentSeasonNumber.set(seasonNumber);

    // await delay(2000); // Add 2 seconds delay

    const response = await fetch(
      `/api/seasons/${selected.season_number}?showId=${media.id}`,
    );
    const data = await response.json();
    episodes.set(data);
    loading.set(false);

    // Update URL without reloading
    const url = new URL(window.location.href);
    const [mediaId] = $page.params.id.split("-");
    goto(`/media/${mediaId}-${seasonNumber}?type=tv`, { replaceState: true });
  };

  const handleEpisodeSelect = (event: CustomEvent<{ episode: Episode }>) => {
    const episode = event.detail.episode;
    selectedEpisodeNumber.set(episode.episode_number);

    const [mediaId] = $page.params.id.split("-");
    const newUrl = `/media/${mediaId}-${episode.season_number}-${episode.episode_number}?type=tv`;

    iframeUrl.set(
      `https://moviesapi.club/tv/${mediaId}-${episode.season_number}-${episode.episode_number}`,
    );
    goto(newUrl, { replaceState: true });
  };
</script>

{#if media}
  <div
    class="media-backdrop min-h-screen bg-cover bg-center"
    style="--backdrop-url: url('https://image.tmdb.org/t/p/original{media.backdrop_path}')"
  >
    <div class="backdrop-blur-md bg-black/50 w-full min-h-screen">
      <SearchBar />
      <div class="px-4">
        <div class="flex flex-col lg:flex-row w-full lg:gap-4">
          <div class="w-full lg:w-1/2 mb-4 lg:mb-0">
            <iframe
              src={$iframeUrl}
              title={isMovie
                ? (media as movieData).title
                : (media as showData).name}
              allowfullscreen
              class="w-full aspect-video"
            ></iframe>
          </div>
          <div class="w-full lg:w-1/2">
            <h1 class="text-white font-bold text-3xl mb-4">
              {isMovie ? (media as movieData).title : (media as showData).name}
            </h1>
            <p class="text-white mb-4 italic">{media.overview}</p>
            <div class="flex flex-wrap gap-2">
              {#each media.genres as genre}
                <button
                  on:click={() => handleGenreClick(genre.id)}
                  class="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  {genre.name}
                </button>
              {/each}
            </div>
            <div>
              {#if !isMovie && (media as showData).seasons?.length}
                <div class="mt-4 bg-black/50 rounded p-4">
                  <label for="season-select" class="text-white font-bold"
                    >Select Season:</label
                  >
                  <select
                    id="season-select"
                    bind:value={$currentSeasonNumber}
                    on:change={handleSeasonChange}
                    class="bg-gray-800 text-white px-2 py-1 rounded ml-2"
                  >
                    {#each (media as showData).seasons as season}
                      <option value={season.season_number}>{season.name}</option
                      >
                    {/each}
                  </select>
                  {#if $selectedSeason}
                    <div class="mt-4">
                      <div class="flex flex-col gap-4">
                        {#if $loading}
                          {#each Array(6) as _}
                            <SkeletonEpisode />
                          {/each}
                        {:else}
                          {#each $episodes as episode}
                            <EpisodeButton
                              {episode}
                              selected={$selectedEpisodeNumber ===
                                episode.episode_number}
                              on:select={handleEpisodeSelect}
                            />
                          {/each}
                        {/if}
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style lang="postcss">
  :global(html) {
    background-color: #262626;
  }

  .media-backdrop {
    background-image: var(--backdrop-url);
  }
</style>
