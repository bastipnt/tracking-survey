<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<div
  class="card p-4 md:mt-24"
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <h1 class="mb-4 text-2xl text-teal-400">
    Hello there, thanks for taking this survey!
  </h1>
  <p class="my-2">
    It will take <i class="text-teal-400">~2 mins</i> and will help me to better
    understand how much knowledge people have about tracking in the internet.
  </p>
  <p class="my-2">
    The <i class="text-teal-400">data</i> you provided will be part of my masters
    thesis.
  </p>
  <p class="my-2">
    All the <i class="text-teal-400">data</i> collected will be handled with care
    and in a way that individuals are not identifiable.
  </p>
  <p>
    In the first part there will be some questions regarding <i
      class="text-teal-400">advertisement</i
    >
    and
    <i class="text-teal-400">tracking</i>. In the second (optional) part I would
    like to collect some information about your browser to better understand how
    tracking companies track you.
  </p>
  <div class="flex justify-end pt-4">
    <button class="variant-filled btn" onclick={handleNext}>Next</button>
  </div>
</div>
