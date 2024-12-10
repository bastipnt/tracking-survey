<script lang="ts">
  import type { GetResult } from "@fingerprintjs/fingerprintjs";
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
    fingerprint?: GetResult;
  };

  let { handleNext, handleTransitionFinished, fingerprint }: Props = $props();

  const fingerprintArr =
    fingerprint &&
    Object.entries(fingerprint.components).map(([componentName, component]) => {
      const name = componentName;
      let value;

      if ("value" in component) value = component.value;

      if (value && typeof value === "object") value = "Object";

      if (value === undefined || value === "") value = "Unknown";

      return {
        name,
        value,
      };
    });
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
        In order to better understand <i class="text-teal-400"
          >tracking methods</i
        >
        I would like to read out some of your
        <i class="text-teal-400">browser attributes</i> and save them to evaluate
        them for my masters thesis.
      </p>
      <p>
        <i class="text-teal-400">Browser attributes</i> are for example: your
        operating system, the browser and version you are using, your screen
        size, your installed system languages, and and and.
        <span class="text-white text-opacity-40"
          >(it's hard to give a complete list here, because it is pretty
          technical, but the important thing to say is, that none of this data
          is related to personal information about you)</span
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
        Of course, your data is <i class="text-teal-400">handled with care</i> in
        a way that you are not identifiable!
      </p>
    </section>
  </div>

  {#if fingerprint !== undefined && fingerprintArr !== undefined}
    <div class="card">
      <header class="card-header p-4">
        <h2 class="text-2xl">Your Device Fingerprint:</h2>
      </header>
      <section class="pt-4">
        <ul
          class="fingerprint-list flex flex-col overflow-hidden sm:grid sm:grid-cols-2"
        >
          <li
            class="flex-cols flex flex-wrap justify-between gap-2 px-4 py-2 sm:col-span-2 sm:grid sm:grid-cols-subgrid"
          >
            <p>Your Visitor-ID:</p>
            <p><i class="text-teal-400">{fingerprint.visitorId}</i></p>
          </li>
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
    <button class="variant-filled btn" onclick={handleNext}
      >Ok, you can use my browser data</button
    >
    <button class="variant-filled btn" onclick={handleNext}
      >No, I don't like to share this data</button
    >
  </div>
</section>
