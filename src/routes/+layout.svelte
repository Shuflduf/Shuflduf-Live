<script lang="ts">
  import "../app.css";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  let { children } = $props();
  injectAnalytics();
</script>

{@render children()}
