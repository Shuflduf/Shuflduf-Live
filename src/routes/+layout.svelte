<script lang="ts">
  import "../app.css";

  let { children } = $props();

  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import Navbar from "$lib/Navbar.svelte";
  import { onMount } from "svelte";

  injectAnalytics({ mode: dev ? "development" : "production" });

  let start = $state(false);
  onMount(() => {
    start = true;
  });
</script>

<div
  class="fixed flex h-screen w-screen flex-col gap-4 p-4 dark:backdrop-invert"
>
  <Navbar />
  {@render children()}
</div>
