<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import HomeButton from "$lib/HomeButton.svelte";

  let searchQuery = "";

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchPath = `/search/${encodeURIComponent(searchQuery.trim())}`;
      if ($page.route.id?.includes("/search/")) {
        window.location.href = searchPath;
      } else {
        goto(searchPath);
      }
      searchQuery = "";
    }
  };
</script>

<div class="relative w-full py-4">
  <div class="absolute left-4 top-1/2 -translate-y-1/2">
    <HomeButton />
  </div>
  <div class="w-full max-w-2xl mx-auto px-4">
    <form on:submit={handleSubmit} class="flex-1">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search movies..."
          class="w-full px-4 py-2 bg-gray-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</div>
