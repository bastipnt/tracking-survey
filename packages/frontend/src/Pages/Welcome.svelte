<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<div
  class="my-8 space-y-8"
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <div
    class="sm: flex flex-wrap justify-center gap-4 p-4 text-center text-4xl sm:justify-start sm:text-left"
  >
    <h1 class="text-4xl">Hello there 👋</h1>
  </div>

  <div class="card">
    <header class="card-header">
      <h2 class="text-2xl text-teal-400">
        This is a survey about advertisement and tracking ...
      </h2>
    </header>

    <section class="space-y-2 p-4">
      <p>
        🕐 It will take <i class="text-teal-400">~2 mins</i> and will help me to
        better understand how much knowledge people have about tracking on the internet.
      </p>
      <p>
        📝 The <i class="text-teal-400">data</i> you provide will be part of my masters
        thesis.
      </p>
      <p>
        😎 Everything I collect with this study is <i class="text-teal-400"
          >stored anonymously</i
        > and will be deleted after 12 months.
      </p>
      <p>
        🍪 In order to make this survey work, this website uses <i
          class="text-teal-400">cookies</i
        > to save your answers in the correct context.
      </p>
    </section>
  </div>

  <div class="card">
    <header class="card-header">
      <h3 class="text-2xl text-teal-400">Structure</h3>
    </header>
    <section class="space-y-2 p-4">
      <ol class="space-y-2">
        <li>
          🕵️‍♀️ Questions about <i class="text-teal-400"
            >advertisement and tracking</i
          >
        </li>
        <li>✨ Questions about <i class="text-teal-400">you</i></li>
        <li>
          💻 Your personal device fingerprint <span class="text-surface-400"
            >(will be explained later)</span
          >
        </li>
      </ol>
    </section>
  </div>

  <div class="flex flex-col flex-wrap justify-end gap-4 md:flex-row">
    <button class="variant-filled btn" onclick={handleNext}
      >Let's get started</button
    >
  </div>
</div>
