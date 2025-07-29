<script lang="ts">
  import type { Review } from "$lib";

  let { review }: { review: Review } = $props();
</script>

{review.content}
