<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<div
  class="card space-y-2 p-4"
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <h1 class="mb-8 text-2xl text-teal-400">
    Hello there, thanks for taking this survey!
  </h1>
  <p>
    It will take <i class="text-teal-400">~2 mins</i> and will help me to better
    understand how much knowledge people have about tracking in the internet.
  </p>
  <p>
    The <i class="text-teal-400">data</i> you provided will be part of my masters
    thesis.
  </p>
  <p>
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
  <div class="flex flex-col flex-wrap justify-end gap-4 pt-8 md:flex-row">
    <button class="variant-filled btn" onclick={handleNext}>Next</button>
  </div>
</div>
