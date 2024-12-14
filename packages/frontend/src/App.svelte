<script lang="ts">
  import { onMount } from "svelte";
  import Client, { type FingerprintParams } from "./Client";
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
  const client = new Client();

  const init = async () => {
    if (fingerprintArr !== undefined) return;

    await fingerprinter.createFingerprint();
    fingerprintArr = fingerprinter.fingerprintArr;
  };

  const signIn = async () => {
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
    if (page === 0) signIn();
    if (page >= 4) return (page = 4);

    window.scrollTo(0, 0);
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

<main
  class="grid-rows-layout grid min-h-screen w-full grid-flow-row items-center p-4"
>
  <section class="max-w-screen-md justify-self-center">
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
      <FingerprintPage
        {handleNext}
        {handleTransitionFinished}
        {fingerprintArr}
        {submitFP}
      />
    {:else if page === 4 && transitioning !== 3}
      <Thanks />
    {/if}
  </section>

  <footer class="text-surface-400 mt-4 flex justify-end">
    <p>
      Contact: <a href="mailto:gt46nevl0@mozmail.com">Email</a> |
      <a target="_blank" href="https://github.com/bastipnt">GitHub</a>
    </p>
  </footer>
</main>
