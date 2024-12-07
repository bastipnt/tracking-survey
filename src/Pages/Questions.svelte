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
        How many times in the last few weeks did you get <i
          class="text-teal-400">advertisement</i
        > and wondered why it is so accurate?
      </span>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="1" />
          <p>Not at all</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="2" />
          <p>Maybe once</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="3" />
          <p>More than once</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-num-of-ads" value="3" />
          <p>A lot</p>
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-clue" class="label space-y-4">
      <span
        >Do you have a clue, how <i class="text-teal-400">advertisers</i> know what
        you like?</span
      >
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-clue" value="1" />
          <p>Not really</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-clue" value="2" />
          <p>Yes!</p>
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-knowlede" class="label space-y-4">
      <span
        >Do you know what <i class="text-teal-400"
          >personalised/targeted advertisement</i
        > is?</span
      >
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-knowlede" value="1" />
          <p>Not really</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="radio" type="radio" name="radio-knowlede" value="2" />
          <p>Yes!</p>
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-i-am-tracked-knowlede" class="label space-y-4">
      <span
        >Did you know, that a lot of your online activity is <i
          class="text-teal-400">tracked</i
        >?</span
      >
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="1"
          />
          <p>Not I didn't know :(</p>
        </label>
        <label class="flex items-center space-x-2">
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="2"
          />
          <p>Yes...</p>
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-i-am-tracked-knowlede" class="label space-y-4">
      <span
        >On a scale from <b class="text-teal-400">1</b> (not at all) to
        <b class="text-teal-400">5</b> (very much), how much would you agree to
        the statement:<br />It is ok for me to be
        <i class="text-teal-400">tracked</i> in order to get better
        <i class="text-teal-400">advertisement</i>
        on products that really interest me.</span
      >
      <div class="grid grid-cols-5 gap-8">
        <label class="flex flex-col items-center space-y-2">
          <p>1 (not at all)</p>
          <input
            class="radio m-0"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="1"
          />
        </label>
        <label class="flex flex-col items-center space-y-2">
          <p>2</p>
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="2"
          />
        </label>
        <label class="flex flex-col items-center space-y-2">
          <p>3</p>
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="3"
          />
        </label>
        <label class="flex flex-col items-center space-y-2">
          <p>4</p>
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="4"
          />
        </label>
        <label class="flex flex-col items-center space-y-2">
          <p>5 (very much)</p>
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="5"
          />
        </label>
      </div>
    </label>
  </div>

  <div class="card p-4">
    <label for="radio-i-am-tracked-knowlede" class="label space-y-4">
      <span>Do you know how <i class="text-teal-400">tracking</i> works?</span>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="1"
          />
          <p>No, I don't know :(</p>
        </label>
        <label class="flex items-center space-x-2">
          <input
            class="radio"
            type="radio"
            name="radio-i-am-tracked-knowlede"
            value="2"
          />
          <p>Yes!</p>
        </label>
      </div>
    </label>
    If yes...
    <label for="radio-i-am-tracked-knowlede" class="label space-y-4">
      <span
        >Which of the following <i class="text-teal-400">tracking methods</i> do
        you know?</span
      >
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>IP-Adress Tracking</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Cookie based tracking</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Tracking Pixels (Web Beacons)</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Tracking Links</p>
        </label>
        <label class="flex items-center space-x-2">
          <input class="checkbox" type="checkbox" />
          <p>Browser Fingerprinting</p>
        </label>
      </div>
    </label>
  </div>

  <div class="flex justify-end pt-4">
    <button class="variant-filled btn" onclick={handleNext}>Next</button>
  </div>
</section>
