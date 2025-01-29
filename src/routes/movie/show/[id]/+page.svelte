<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    goto(`/media/${$page.params.id}?type=tv`);
  });
</script>

<style lang="postcss">
  :global(html) {
    background-color: #262626;
  }
</style>
