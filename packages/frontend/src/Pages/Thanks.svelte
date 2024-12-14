<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<section
  class="my-8 flex flex-col gap-8"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
>
  <div
    class="sm: flex flex-wrap justify-center gap-4 p-4 text-center text-4xl sm:justify-start sm:text-left"
  >
    <span>💜✨</span>
    <h1>Thanks for taking part in this survey!</h1>
  </div>

  <div class="card space-y-4 p-4">
    <p>
      If you are interested in reading more about <i class="text-teal-400"
        >browser fingerprints</i
      > and tracking here are yome links for you:
    </p>
    <ul class="ml-4 list-disc underline">
      <li>
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Device_fingerprint">Wikipedia</a
        >
      </li>
      <li>
        <a target="_blank" href="https://amiunique.org/">amiunique.org</a>
      </li>
      <li>
        <a target="_blank" href="https://browserleaks.com/">browserleaks.com</a>
      </li>
    </ul>
  </div>
</section>
