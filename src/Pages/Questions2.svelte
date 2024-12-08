<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();
</script>

<section
  class="flex flex-col gap-8"
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <div class="card p-4">
    <label class="label space-y-4" for="radio-num-of-ads">
      <span>
        Would you be interested in learning more about <i class="text-teal-400"
          >tracking</i
        >?
      </span>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="1" />
          <p>Yes, very much!</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="2" />
          <p>Yes, but don't know if I would understand that technical stuff.</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="3" />
          <p>I don't really care...</p>
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-clue" class="label space-y-4">
      <span
        >If you could learn about tracking, which of the following <i
          class="text-teal-400">learning approaches</i
        >
        would work for you?
        <span class="text-white text-opacity-40"
          >(multiple answers possible)</span
        ></span
      >
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Reading a <i class="text-teal-400">technical text</i> about it</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>
            Reading a <i class="text-teal-400">simple less technical text</i> about
            it
          </p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Watching an <i class="text-teal-400">explanation video</i></p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Learning through an <i class="text-teal-400">art project</i></p>
        </label>
      </div>
    </label>
  </div>

  <div class="flex flex-col flex-wrap justify-end gap-4 pt-8 md:flex-row">
    <button class="variant-filled btn" onclick={handleNext}>Next</button>
  </div>
</section>
