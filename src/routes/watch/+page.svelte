<script lang="ts">
  import { ContentType, Review, type Media } from "$lib";
  import Overview from "$lib/Overview.svelte";
  import { BOX_STYLE, H1_STYLE } from "$lib/styles";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let id = data.id ?? "0";
  let content: Media = JSON.parse(data.content);
  let reviews: Review[] = JSON.parse(data.reviews);
</script>

<div class="flex h-[calc(100vh-7.5rem)] w-full flex-row gap-4">
  <div class="flex w-full flex-col gap-4">
    <iframe
      src="https://moviesapi.club/movie/{id}"
      title="moviesapi.club"
      class="aspect-video rounded-md"
      allowfullscreen
    >
    </iframe>
    <div class="{BOX_STYLE} h-full overflow-y-auto">
      <h1 class="{H1_STYLE} mb-4">Overview</h1>
      <Overview {content} />
    </div>
  </div>
  <div class="flex w-full flex-col gap-4">
    {#if content.type == ContentType.Show}
      <div class="{BOX_STYLE} h-full">
        <h1 class={H1_STYLE}>Episodes</h1>
      </div>
    {/if}
    <div class="{BOX_STYLE} flex h-full flex-col gap-4 overflow-y-auto">
      <h1 class={H1_STYLE}>Reviews</h1>
      {#each reviews as review}
        <div class="flex flex-row gap-4">
          <img
            src={review.avatarPath
              ? `https://image.tmdb.org/t/p/w185${review.avatarPath}`
              : `https://nyc.cloud.appwrite.io/v1/avatars/initials?name=${review.username}`}
            alt="{review.username} avatar"
            class="aspect-square h-16 w-16 rounded-full object-cover"
          />
          <div class="dark:text-white">
            <p class="font-[Arvo]">{review.username}</p>
            <p class="text-sm">
              {review.content}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
