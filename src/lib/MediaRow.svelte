<script lang="ts">
  import SkeletonCard from "./SkeletonCard.svelte";
  import Movie from "./Movie.svelte";
  import type { mediaData } from "./MediaCard.svelte";
  import MediaCard from "./MediaCard.svelte";

  export let title: string;
  export let link: string;
  export let mediaItems: mediaData[] = [];
  export let isLoading: boolean = true;

  let scrollContainer: HTMLDivElement;
  let showLeftShadow = false;
  let showRightShadow = true;

  function handleScroll(e: Event) {
    const target = e.target as HTMLDivElement;
    showLeftShadow = target.scrollLeft > 0;
    showRightShadow =
      target.scrollLeft < target.scrollWidth - target.clientWidth;
  }
</script>

<div class="mt-4">
  <h1 class="text-2xl font-bold mb-4 px-4">
    <a
      href={link}
      class="hover:text-gray-300 transition-colors inline-flex items-center gap-1 underline underline-offset-4"
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </h1>
  <div class="relative mb-4">
    <div
      bind:this={scrollContainer}
      onscroll={handleScroll}
      class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-3 px-4"
    >
      {#if isLoading}
        {#each Array(20) as _}
          <div class="flex-none w-[150px]">
            <SkeletonCard className="w-full" />
          </div>
        {/each}
      {:else}
        {#each mediaItems as media}
          <div class="flex-none w-[150px]">
            <!-- <Movie data={media} />
              -->
            <MediaCard data={media} />
          </div>
        {/each}
      {/if}
    </div>
    <div
      class="absolute left-0 top-0 h-full w-8 bg-gradient-to-r to-transparent pointer-events-none transition-opacity duration-300 {!showLeftShadow
        ? 'opacity-0'
        : ''} {isLoading ? 'from-white/10' : 'from-white/40'}"
    ></div>
    <div
      class="absolute right-0 top-0 h-full w-8 bg-gradient-to-l to-transparent pointer-events-none transition-opacity duration-300 {!showRightShadow
        ? 'opacity-0'
        : ''} {isLoading ? 'from-white/10' : 'from-white/40'}"
    ></div>
  </div>
</div>

<style lang="postcss">
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
