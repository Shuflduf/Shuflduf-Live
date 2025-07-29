<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import HomeButton from "$lib/HomeButton.svelte";
  import { BOX_STYLE } from "./styles";

  let searchQuery = "";

  const handleSubmit = (e: SubmitEvent) => {
    console.log(searchQuery);
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchPath = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      goto(searchPath);
    }
  };
</script>

<!-- TODO: fix this buggy bs -->
<div class="flex items-center justify-between {BOX_STYLE}">
  <HomeButton />
  <form onsubmit={handleSubmit}>
    <input
      bind:value={searchQuery}
      placeholder="Search"
      class="w-80 rounded-md border border-slate-500 px-4 py-2 backdrop-blur-xs outline-none dark:text-white"
    />
  </form>
</div>
<!-- <div class="w-full p-4"> -->
<!--   <div class="flex items-center gap-4"> -->
<!--     <div class="md:absolute md:left-4 z-10"> -->
<!--       <HomeButton /> -->
<!--     </div> -->
<!--     <div class="flex-1"> -->
<!--       <form on:submit={handleSubmit} class="max-w-[512px] mx-auto"> -->
<!--         <div class="relative"> -->
<!--           <input -->
<!--             type="text" -->
<!--             bind:value={searchQuery} -->
<!--             placeholder="Search content..." -->
<!--             class="w-full px-4 py-2 bg-gray-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500" -->
<!--           /> -->
<!--           <button -->
<!--             type="submit" -->
<!--             class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 rounded-full text-white hover:bg-blue-600" -->
<!--           > -->
<!--             Search -->
<!--           </button> -->
<!--         </div> -->
<!--       </form> -->
<!--     </div> -->
<!--   </div> -->
<!-- </div> -->
