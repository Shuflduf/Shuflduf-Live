<script lang="ts">
  import "../app.css";

  let { children } = $props();

  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<div class="fixed h-screen w-screen dark:backdrop-invert">
  {@render children()}
</div>
