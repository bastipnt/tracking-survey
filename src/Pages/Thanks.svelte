<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<div
  class="card space-y-4 px-4 py-16"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
>
  <h1 class="text-center text-4xl text-teal-400">
    Thanks for taking part in this survey! 💜✨
  </h1>
</div>
