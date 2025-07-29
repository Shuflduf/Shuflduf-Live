<script lang="ts">
  let { children, class: className } = $props();

  let area: HTMLDivElement | undefined = $state();

  function onWheelHandle(e: WheelEvent) {
    var delta = e.deltaY;
    if (area) {
      area.scrollBy({ left: delta, behavior: "smooth" });
    }
    console.log(delta);
  }
</script>

<div onwheel={onWheelHandle} bind:this={area} class={className}>
  {@render children()}
</div>
