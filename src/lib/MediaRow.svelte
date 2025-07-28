<script lang="ts">
  import SkeletonCard from "./SkeletonCard.svelte";
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
  <h1 class="mb-4 px-4 text-2xl font-bold">
    <a
      href={link}
      class="inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-gray-300"
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
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
      class="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth px-4"
    >
      {#if isLoading}
        {#each Array(20) as _}
          <div class="w-[150px] flex-none">
            <SkeletonCard className="w-full" />
          </div>
        {/each}
      {:else}
        {#each mediaItems as media}
          <div class="w-[150px] flex-none">
            <!-- <Movie data={media} /> -->
            <MediaCard data={media} />
          </div>
        {/each}
      {/if}
    </div>
    <div
      class="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r to-transparent transition-opacity duration-300 {!showLeftShadow
        ? 'opacity-0'
        : ''} {isLoading ? 'from-white/10' : 'from-white/40'}"
    ></div>
    <div
      class="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l to-transparent transition-opacity duration-300 {!showRightShadow
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
