<script lang="ts">
  import { goto } from "$app/navigation";

  const goHome = () => goto("/");
</script>

<button
  on:click={goHome}
  class="font-bold text-2xl text-blue-500 hover:text-blue-400 transition-colors"
>
  FreeStreammm
</button>
