<script lang="ts">
  import { onMount } from "svelte";

  let { children } = $props();

  let mobileOpen: boolean = $state(false);

  onMount(() => {
    mobileOpen = window.innerWidth > 768;
    window.addEventListener(
      "resize",
      (_) => (mobileOpen = window.innerWidth > 768),
    );
  });
</script>

<div
  class="absolute w-[calc(100vw-2rem)] md:relative {mobileOpen ? 'h-full' : ''}"
>
  <button
    class="absolute top-4 right-4 z-30 block rounded-md bg-blue-400 px-4 py-2 font-[Arvo] text-xl font-bold text-white md:hidden"
    onclick={() => (mobileOpen = !mobileOpen)}
  >
    {#if mobileOpen}
      Hide Menu
    {:else}
      Show Menu
    {/if}
  </button>

  {#if mobileOpen}
    {@render children()}
  {/if}
</div>
