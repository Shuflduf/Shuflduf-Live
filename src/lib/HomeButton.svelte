<script lang="ts">
  import { goto } from "$app/navigation";

  const goHome = () => goto("/");
</script>

<button
  on:click={goHome}
  class="font-bold font-[Arvo] text-3xl text-blue-500 hover:text-blue-400 transition-colors"
>
  Shuflduf Live
</button>
