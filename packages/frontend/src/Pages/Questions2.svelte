<script lang="ts">
  import { fly } from "svelte/transition";
  import type { SurveyParams2 } from "../Client";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
    submitSurvey: (params: SurveyParams2) => Promise<boolean>;
  };

  let { handleNext, handleTransitionFinished, submitSurvey }: Props = $props();

  type FormFieldName = keyof SurveyParams2;

  const FORM_FIELD_NAMES: FormFieldName[] = [
    "interestInLearning8",
    "learningApproaches9",
    "age10",
    "work11",
    "pronouns12",
  ] as const;

  const VALUES9 = [
    "reading-technical",
    "reading-non-technical",
    "video",
    "art",
  ] as const;

  type ValidationErrors = {
    [K in (typeof FORM_FIELD_NAMES)[number]]: {
      required: boolean;
    };
  };

  let validationErrors = $state<Partial<ValidationErrors>>({});

  const parseCheckboxes = (
    formData: FormData,
    baseName: string,
    ceckboxNames: readonly string[],
  ): string[] =>
    ceckboxNames.reduce<string[]>((prevValues, parameterName) => {
      const currValue = formData.get(`${baseName}.${parameterName}`);

      if (currValue === "on") return [...prevValues, parameterName];

      return prevValues;
    }, []);

  const parseForm = (formData: FormData): SurveyParams2 => {
    validationErrors = {};

    return FORM_FIELD_NAMES.reduce((prevParams, formFieldName) => {
      let value: FormDataEntryValue | string[] | null;

      if (formFieldName === "learningApproaches9") {
        value = parseCheckboxes(formData, formFieldName, VALUES9);
      } else {
        value = formData.get(formFieldName);
      }

      if (value === null || value.length === 0) {
        validationErrors[formFieldName] = { required: true };
      }

      return { ...prevParams, [formFieldName]: value };
    }, {} as SurveyParams2);
  };

  const validateForm = (): boolean => {
    return Object.values(validationErrors).length === 0;
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!e.target) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const parsedData = parseForm(formData);

    if (!validateForm()) return;

    const submited = await submitSurvey(parsedData);
    if (!submited) return;

    handleNext();
  };
</script>

<section
  in:fly={{ x: 200, duration: 500, delay: 0.001 }}
  out:fly={{ x: -200, duration: 100 }}
  onoutroend={handleTransitionFinished}
  class="my-8"
>
  <form class="flex flex-col gap-8" onsubmit={handleSubmit}>
    <div
      class="sm: flex flex-wrap justify-center gap-4 p-4 text-center text-4xl sm:justify-start sm:text-left"
    >
      <span>✨</span>
      <h1>About you</h1>
    </div>

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
              value="yes"
            />
            <p>Yes, very much!</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="interestInLearning8"
              value="kinda"
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
              value="no"
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
              name="learningApproaches9.reading-technical"
            />
            <p>
              Reading a <i class="text-teal-400">technical text</i> about it
            </p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9.reading-non-technical"
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
              name="learningApproaches9.video"
            />
            <p>Watching an <i class="text-teal-400">explanation video</i></p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="learningApproaches9.art"
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
            <input
              class="radio"
              type="radio"
              name="age10"
              value="less-than-18"
            />
            <p>{"<"} 18</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="18-25" />
            <p>18 - 25</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="age10" value="25-40" />
            <p>26 - 40</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="age10"
              value="more-than-40"
            />
            <p>{">"} 40</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="work11">
        <span>
          What is your current <i class="text-teal-400">occupation</i>?
        </span>
        {#if validationErrors.work11?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.work11?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="student" />
            <p>Student</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="working" />
            <p>Working</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="school" />
            <p>School</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="work11" value="other" />
            <p>Something else ...</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="pronouns12">
        <span>What are your <i class="text-teal-400">pronouns</i>?</span>
        {#if validationErrors.pronouns12?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.pronouns12?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="pronouns12"
              value="She/her"
            />
            <p>She/her</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="pronouns12"
              value="He/him"
            />
            <p>He/him</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="pronouns12"
              value="They/them"
            />
            <p>They/them</p>
          </label>
          <label class="flex items-center space-x-2">
            <input class="radio" type="radio" name="pronouns12" value="Other" />
            <p>Other</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="pronouns12"
              value="PreferNotToSay"
            />
            <p>Prefer not to say</p>
          </label>
        </div>
      </label>
    </div>

    <div class="flex flex-col flex-wrap justify-end gap-4 md:flex-row">
      <button class="variant-filled btn" type="submit" name="submit"
        >Next</button
      >
    </div>
  </form>
</section>
