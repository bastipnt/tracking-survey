<script lang="ts">
  import { onMount } from "svelte";
  import Client, { type FingerprintParams } from "./Client";
  import FingerprintPage from "./Pages/Fingerprint.svelte";
  import FingerprintPage2 from "./Pages/Fingerprint2.svelte";
  import Questions from "./Pages/Questions.svelte";
  import Questions2 from "./Pages/Questions2.svelte";
  import Thanks from "./Pages/Thanks.svelte";
  import Welcome from "./Pages/Welcome.svelte";
  import Fingerprinter, { type FingerprintArr } from "./utils/Fingerprinter";

  let page = $state(0);
  let transitioning = $state<number | null>(null);
  let fingerprintArr = $state<FingerprintArr>();

  const fingerprinter = new Fingerprinter();
  const client = new Client();

  const init = async () => {
    if (fingerprintArr !== undefined) return;

    await fingerprinter.createFingerprint();
    fingerprintArr = fingerprinter.fingerprintArr;
    const visitorId = fingerprinter.fingerprint?.visitorId;
    if (!visitorId) return;

    await client.signIn(visitorId);
  };

  onMount(() => init());

  $effect(() => {
    const anchor = Number(document.location.hash);
    if (!Number.isNaN(anchor)) page = anchor;

    document.location.hash = page.toString();
  });

  const handleNext = () => {
    if (page === 0) {
      fingerprinter.createFingerprint();
    }
    if (page >= 5) return (page = 5);
    transitioning = page;
    page++;
  };

  const handleTransitionFinished = () => {
    transitioning = null;
  };

  const submitFP = async () => {
    const fingerprintParams: FingerprintParams = {
      components: fingerprinter.fingerprint?.components,
    };

    await client.submitFP(fingerprintParams);
  };
</script>

<main class="flex w-full max-w-screen-md flex-col justify-stretch p-4">
  {#if page === 0}
    <Welcome {handleNext} {handleTransitionFinished} />
  {:else if page === 1 && transitioning !== 0}
    <Questions
      {handleNext}
      {handleTransitionFinished}
      submitSurvey={client.submitPart1}
    />
  {:else if page === 2 && transitioning !== 1}
    <Questions2
      {handleNext}
      {handleTransitionFinished}
      submitSurvey={client.submitPart2}
    />
  {:else if page === 3 && transitioning !== 2}
    <FingerprintPage {handleNext} {handleTransitionFinished} />
  {:else if page === 4 && transitioning !== 3}
    <FingerprintPage2
      {handleNext}
      {handleTransitionFinished}
      {fingerprintArr}
      {submitFP}
    />
  {:else if page === 5 && transitioning !== 4}
    <Thanks />
  {/if}
</main>
