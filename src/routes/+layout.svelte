<script lang="ts">
  import "../app.css";

  let { children } = $props();

  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import Navbar from "$lib/Navbar.svelte";

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<div
  class="fixed flex h-screen w-screen flex-col gap-4 p-4 dark:backdrop-invert"
>
  <Navbar />
  {@render children()}
</div>
