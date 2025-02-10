<script lang="ts">
  import "../app.css";
  import { inject } from "@vercel/analytics";
  let { children } = $props();
  inject();
</script>

{@render children()}
