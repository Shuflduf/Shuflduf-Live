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

<div class="absolute h-full w-[calc(100vw-2rem)] md:relative">
  <button
    class="absolute top-4 right-4 z-30 block h-12 w-12 rounded-md bg-blue-400 text-white md:hidden"
    onclick={() => (mobileOpen = !mobileOpen)}
  >
    {#if mobileOpen}
      &gt
    {:else}
      &lt
    {/if}
  </button>

  {#if mobileOpen}
    {@render children()}
  {/if}
</div>
