<script lang="ts">
  let { children, class: className } = $props();
  const SCROLL_BUTTONS =
    "absolute bottom-1/2 z-10 h-12 w-12 translate-y-1/2 rounded-md bg-blue-400/80 font-[Arvo] text-xl text-white backdrop-blur-xs";

  enum Dir {
    Left,
    Right,
  }

  let area: HTMLDivElement | undefined = $state();

  function scrollArea(dir: Dir) {
    if (!area) {
      return;
    }
    const delta = dir == Dir.Right ? 500 : -500;
    area.scrollBy({ left: delta, behavior: "smooth" });
  }
</script>

<div class="relative h-fit">
  <button
    class="{SCROLL_BUTTONS} right-4"
    onclick={() => scrollArea(Dir.Right)}
  >
    &gt
  </button>
  <button class="{SCROLL_BUTTONS} left-4" onclick={() => scrollArea(Dir.Left)}>
    &lt
  </button>
  <div bind:this={area} class={className}>
    {@render children()}
  </div>
</div>
