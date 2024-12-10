<script lang="ts">
  import { fly } from "svelte/transition";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
  };

  let { handleNext, handleTransitionFinished }: Props = $props();

  const FORM_FIELD_NAMES = [
    "interestInLearning8",
    "learningApproaches9",
    "age10",
    "work11",
    "gender12",
  ] as const;

  type ValidationErrors = {
    [K in (typeof FORM_FIELD_NAMES)[number]]: {
      required: boolean;
    };
  };

  let validationErrors = $state<Partial<ValidationErrors>>({});

  const validateForm = (formData: FormData): boolean => {
    validationErrors = Object.values(FORM_FIELD_NAMES).reduce(
      (oldErrors, formFieldName) => {
        const value = formData.get(formFieldName);
        if (value === null)
          return { ...oldErrors, [formFieldName]: { required: true } };
        return oldErrors;
      },
      {},
    );

    return Object.values(validationErrors).length === 0;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!e.target) return;

    const formData = new FormData(e.target as HTMLFormElement);

    if (!validateForm(formData)) return;

    handleNext();
  };
</script>

<section
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
>
  <form class="flex flex-col gap-8" onsubmit={handleSubmit}>
    <div class="card p-4">
      <label class="label space-y-4" for="interestInLearning8">
        <span>
          Would you be interested in learning more about <i
            class="text-teal-400">tracking</i
          >?
        </span>
        {#if validationErrors.interestInLearning8?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.interestInLearning8?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="interestInLearning8"
              value="1"
            />
            <p>Yes, very much!</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="interestInLearning8"
              value="2"
            />
            <p>
              Yes, but don't know if I would understand that technical stuff.
            </p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="interestInLearning8"
              value="3"
            />
            <p>I don't really care...</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="learningApproaches9" class="label space-y-4">
        <span
          >If you could learn about tracking, which of the following <i
            class="text-teal-400">learning approaches</i
          >
          would work for you?
          <span class="text-white text-opacity-40"
            >(multiple answers possible)</span
          ></span
        >
        {#if validationErrors.learningApproaches9?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.learningApproaches9?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9"
            />
            <p>
              Reading a <i class="text-teal-400">technical text</i> about it
            </p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9"
            />
            <p>
              Reading a <i class="text-teal-400">simple less technical text</i> about
              it
            </p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9"
            />
            <p>Watching an <i class="text-teal-400">explanation video</i></p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9"
            />
            <p>Learning through an <i class="text-teal-400">art project</i></p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="age10">
        <span> What is your <i class="text-teal-400">age</i>? </span>
        {#if validationErrors.age10?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.age10?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="1" />
            <p>{"<"} 18</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="2" />
            <p>18 - 25</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="3" />
            <p>25 - 40</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="4" />
            <p>{">"} 40</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="work11">
        <span> What do you <i class="text-teal-400">work</i>? </span>
        {#if validationErrors.work11?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.work11?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="1" />
            <p>Student</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="2" />
            <p>Working</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="3" />
            <p>School</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="4" />
            <p>Other</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="gender12">
        <span
          >Which <i class="text-teal-400">gender</i> do you identify with?</span
        >
        {#if validationErrors.gender12?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.gender12?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="gender12" value="1" />
            <p>Diverse</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="gender12" value="2" />
            <p>Male</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="gender12" value="3" />
            <p>Female</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="gender12" value="4" />
            <p>Other</p>
          </label>
        </div>
      </label>
    </div>

    <div class="flex flex-col flex-wrap justify-end gap-4 pt-8 md:flex-row">
      <button class="variant-filled btn" type="submit" name="submit"
        >Next</button
      >
    </div>
  </form>
</section>
