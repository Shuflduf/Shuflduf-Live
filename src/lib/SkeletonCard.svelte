<script lang="ts">
  export let className = "";
</script>

<div class={className}>
  <div class="rounded-2xl overflow-hidden animate-pulse">
    <div class="w-full aspect-[2/3] bg-gray-700 relative">
      <div
        class="absolute bottom-3 left-3 right-3 h-6 bg-gray-600 rounded-full"
      ></div>
    </div>
  </div>
</div>
