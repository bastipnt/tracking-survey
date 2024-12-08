<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<div
  class="card space-y-4 px-4 py-16"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
>
  <h1 class="mb-16 text-center text-4xl text-teal-400">
    Thanks for taking part in this survey! 💜✨
  </h1>
  <p>
    If you are interested in reading more about <i class="text-teal-400"
      >browser fingerprints</i
    > and tracking here are yome links for you:
  </p>
  <ul class="ml-4 list-disc underline">
    <li>
      <a href="https://en.wikipedia.org/wiki/Device_fingerprint"
        >https://en.wikipedia.org/wiki/Device_fingerprint</a
      >
    </li>
    <li><a href="https://amiunique.org/">https://amiunique.org/</a></li>
    <li><a href="https://browserleaks.com/">https://browserleaks.com/</a></li>
  </ul>
</div>
