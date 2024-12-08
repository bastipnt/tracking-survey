<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<div
  class="card space-y-4 p-4"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <h2 class="text-lg text-teal-400">Nice, you made it this far!</h2>
  <p>
    In order to better understand <i class="text-teal-400">tracking methods</i>
    I would like to read out some of your
    <i class="text-teal-400">browser attributes</i> and save them to evaluate them
    for my masters thesis.
  </p>
  <p>
    <i class="text-teal-400">Browser attributes</i> are for example: your
    operating system, the browser and version you are using, your screen size,
    your installed system languages, and and and.
    <span class="text-white text-opacity-40"
      >(it's hard to give a complete list here, because it is pretty technical,
      but the important thing to say is, that none of this data is related to
      personal information about you)</span
    >
  </p>
  <p>
    But, did you know, that these attributes can be used to <i
      class="text-teal-400">track</i
    >
    you? A lot of websites regularly collect this information and put them together
    to create something called a
    <i class="text-teal-400">browser fingerprint</i>.
  </p>
  <p>
    💜💜💜<br />It would help me a lot if I could create such a
    <i class="text-teal-400">browser fingerprint</i>
    from your browser now to better understand how it works.<br />💜💜💜
  </p>
  <p>
    Of course, your data is <i class="text-teal-400">handled with care</i> in a way
    that you are not identifiable!
  </p>
  <div class="flex flex-col flex-wrap justify-end gap-4 pt-8 md:flex-row">
    <button class="variant-filled btn" onclick={handleNext}
      >Ok, you can use my browser data</button
    >
    <button class="variant-filled btn" onclick={handleNext}
      >No, I don't like to share this data</button
    >
  </div>
</div>
