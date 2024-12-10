<script lang="ts">
  import { onMount } from "svelte";
  import FingerprintPage from "./Pages/Fingerprint.svelte";
  import Questions from "./Pages/Questions.svelte";
  import Questions2 from "./Pages/Questions2.svelte";
  import Thanks from "./Pages/Thanks.svelte";
  import Welcome from "./Pages/Welcome.svelte";
  import Fingerprinter, { type FingerprintArr } from "./utils/Fingerprinter";

  let page = $state(0);
  let transitioning = $state<number | null>(null);
  let fingerprintArr = $state<FingerprintArr>();

  const fingerprinter = new Fingerprinter();

  onMount(() => {
    if (fingerprintArr !== undefined) return;

    const createFingerprint = async () => {
      await fingerprinter.createFingerprint();

      fingerprintArr = fingerprinter.fingerprintArr;
    };

    createFingerprint();
  });

  $effect(() => {
    const anchor = Number(document.location.hash);
    if (!Number.isNaN(anchor)) page = anchor;

    document.location.hash = page.toString();
  });

  const handleNext = () => {
    if (page === 0) {
      fingerprinter.createFingerprint();
    }
    if (page >= 4) return (page = 4);
    transitioning = page;
    page++;
  };

  const handleTransitionFinished = () => {
    transitioning = null;
  };
</script>

<main class="flex w-full max-w-screen-md flex-col justify-stretch p-4">
  {#if page === 0}
    <Welcome {handleNext} {handleTransitionFinished} />
  {:else if page === 1 && transitioning !== 0}
    <Questions {handleNext} {handleTransitionFinished} />
  {:else if page === 2 && transitioning !== 1}
    <Questions2 {handleNext} {handleTransitionFinished} />
  {:else if page === 3 && transitioning !== 2}
    <FingerprintPage {handleNext} {handleTransitionFinished} {fingerprintArr} />
  {:else if page === 4 && transitioning !== 3}
    <Thanks />
  {/if}
</main>
