<script lang="ts">
  import { fly } from "svelte/transition";
  import type { FingerprintArr } from "../utils/Fingerprinter";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<section
  class="space-y-8 pb-8"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <div class="card">
    <header class="card-header p-4">
      <h2 class="text-2xl">Nice, you made it this far!</h2>
    </header>

    <section class="space-y-4 p-4">
      <p>
        On the next page you will see an example of a tracking method called <i
          class="text-teal-400">Browser Fingerprint</i
        >.
      </p>
    </section>
  </div>

  <div class="flex flex-col flex-wrap justify-end gap-4 md:flex-row">
    <button class="variant-filled btn" onclick={handleNext}>Next</button>
  </div>
</section>
