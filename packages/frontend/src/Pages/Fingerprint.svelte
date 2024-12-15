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
  class="my-8 space-y-8"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <div
    class="flex-wrap justify-center gap-4 p-4 text-center text-4xl sm:flex sm:justify-start sm:text-left"
  >
    <span>💻</span>
    <h1>Device Fingerprint</h1>
  </div>

  <div class="card">
    <section class="space-y-4 p-4">
      <p>
        What you can see here is your personal <i class="text-teal-400"
          >Device Fingerprint</i
        >.
        <span class="text-surface-400">(also called Browser Fingerprint)</span>
      </p>
      <p>
        It consists of values from your device/browser that can be read out by
        websites via <i class="text-teal-400">JavaScript</i>.
      </p>
      <p>
        Because <i class="text-teal-400">device/broswer combinations</i> are often
        unique, these values can be used to track you!
      </p>
      <p>
        This is used by a lot of websites to understand your <i
          class="text-teal-400">online behaviour</i
        >.
      </p>
      <p>✨✨✨</p>
      <p>
        In my master thesis I want to learn about <i class="text-teal-400"
          >how websites track you</i
        >
        and how to <i class="text-teal-400">prevent</i> them from doing it.
      </p>
      <p>
        For this you can help me by sending me your <i class="text-teal-400"
          >Device Fingerprint</i
        >.
      </p>
      <p>
        If you want to learn more about the different <i class="text-teal-400"
          >attributes</i
        >, I will provide some ressources in the end.
      </p>
      <p>Thank you!!! 💜</p>
    </section>
  </div>

  {#if fingerprintArr !== undefined}
    <div class="card overflow-hidden">
      <header class="card-header p-4">
        <h2 class="text-2xl">Your Device Fingerprint</h2>
        <p class="text-surface-400">
          Created with the help of <a
            class="underline"
            href="https://fingerprint.com/"
            target="_blank"
            rel="noopener noreferrer">https://fingerprint.com</a
          >
        </p>
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
    <button class="variant-outline btn" onclick={handleNext}
      >No, I don't like to share this data</button
    >
    <button class="variant-filled btn" onclick={handleNextAndSubmitFP}
      >Ok, you can use my device fingerprint</button
    >
  </div>
</section>
