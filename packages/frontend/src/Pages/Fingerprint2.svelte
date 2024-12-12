<script lang="ts">
  import { fly } from "svelte/transition";
  import type { FingerprintArr } from "../utils/Fingerprinter";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
    fingerprintArr?: FingerprintArr;
    submitFP: () => Promise<void>;
  };

  let {
    handleNext,
    handleTransitionFinished,
    fingerprintArr,
    submitFP,
  }: Props = $props();

  const handleNextAndSubmitFP = async () => {
    await submitFP();
    handleNext();
  };
</script>

<section
  class="space-y-8 pb-8"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <div class="card">
    <header class="card-header p-4">
      <h2 class="text-2xl">
        This is your personal <i class="text-teal-400">Browser Fingerprint</i>
      </h2>
    </header>

    <section class="space-y-4 p-4">
      <p>
        In order to better understand this <i class="text-teal-400"
          >tracking method</i
        >
        I would like save it for my masters thesis.
      </p>
      <p>
        Of course, your data is <i class="text-teal-400">handled with care</i> in
        a way that you are not identifiable! ✨
      </p>
    </section>
  </div>

  {#if fingerprintArr !== undefined}
    <div class="card">
      <header class="card-header p-4">
        <h2 class="text-2xl">Your Device Fingerprint:</h2>
      </header>
      <section class="pt-4">
        <ul
          class="fingerprint-list flex flex-col overflow-hidden sm:grid sm:grid-cols-2"
        >
          {#each fingerprintArr as component, i}
            <li
              class={`flex-cols flex flex-wrap justify-between gap-2 px-4 py-2 sm:col-span-2 sm:grid sm:grid-cols-subgrid ${(i + 1) % 2 && "bg-surface-700"}`}
            >
              <p>{component.name}:</p>
              <p>{component.value}</p>
            </li>
          {/each}
        </ul>
      </section>
    </div>
  {/if}

  <div class="flex flex-col flex-wrap justify-end gap-4 md:flex-row">
    <button class="variant-filled btn" onclick={handleNextAndSubmitFP}
      >Ok, you can use my browser fingerprint</button
    >
    <button class="variant-filled btn" onclick={handleNext}
      >No, I don't like to share this data</button
    >
  </div>
</section>
