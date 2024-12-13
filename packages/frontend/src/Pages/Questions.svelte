<script lang="ts">
  import { fly } from "svelte/transition";
  import type { SurveyParams1 } from "../Client";

  type Props = {
    handleNext: () => void;
    handleTransitionFinished: () => void;
    submitSurvey: (params: SurveyParams1) => Promise<boolean>;
  };

  let { handleNext, handleTransitionFinished, submitSurvey }: Props = $props();

  type FormFieldName = keyof SurveyParams1;

  const FORM_FIELD_NAMES: FormFieldName[] = [
    "numLastWeeksAds1",
    "howDoAdvertisersKnow2",
    "knowledgeTargetedAds3",
    "IAmTrackedKnowledge4",
    "okToBeTracked5",
    "knowledgeHowTracking6",
    "trackingMethodsFamiliar7",
  ] as const;

  const VALUES7 = [
    "ip-address",
    "cookie",
    "tracking-pixels",
    "tracking-links",
    "browser-fingerprinting",
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

  const parseForm = (formData: FormData): SurveyParams1 => {
    validationErrors = {};

    return FORM_FIELD_NAMES.reduce((prevParams, formFieldName) => {
      let value: FormDataEntryValue | string[] | null;

      if (formFieldName === "trackingMethodsFamiliar7") {
        value = parseCheckboxes(formData, formFieldName, VALUES7);
      } else {
        value = formData.get(formFieldName);
      }

      if (formFieldName !== "trackingMethodsFamiliar7" && value === null) {
        validationErrors[formFieldName] = { required: true };
      }

      return { ...prevParams, [formFieldName]: value };
    }, {} as SurveyParams1);
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
      <span>🕵️‍♀️</span>
      <h1>Advertisement and tracking</h1>
    </div>

    <div class="card p-4">
      <label class="label space-y-4" for="numLastWeeksAds1">
        <span>
          How many times in the last few weeks did you get <i
            class="text-teal-400">advertisement</i
          > and wondered why it is so accurate?
        </span>
        {#if validationErrors.numLastWeeksAds1?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.numLastWeeksAds1?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="numLastWeeksAds1"
              value="none"
            />
            <p>Not at all</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="numLastWeeksAds1"
              value="once"
            />
            <p>Maybe once</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="numLastWeeksAds1"
              value="sometimes"
            />
            <p>More than once</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="numLastWeeksAds1"
              value="often"
            />
            <p>A lot</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="howDoAdvertisersKnow2" class="label space-y-4">
        <span
          >Do you have a clue, how <i class="text-teal-400">advertisers</i> get information
          on what you like/ you are interested in?</span
        >
        {#if validationErrors.howDoAdvertisersKnow2?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.howDoAdvertisersKnow2?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="howDoAdvertisersKnow2"
              value="no"
            />
            <p>No, how do they do that?</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="howDoAdvertisersKnow2"
              value="yes"
            />
            <p>Yes, I know.</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="knowledgeTargetedAds3" class="label space-y-4">
        <span
          >Do you know what <i class="text-teal-400"
            >personalised/targeted advertisement</i
          > is?</span
        >
        {#if validationErrors.knowledgeTargetedAds3?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.knowledgeTargetedAds3?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="knowledgeTargetedAds3"
              value="no"
            />
            <p>Not really</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="knowledgeTargetedAds3"
              value="yes"
            />
            <p>Yes!</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="IAmTrackedKnowledge4" class="label space-y-4">
        <span
          >Did you know, that a lot of your online activity is <i
            class="text-teal-400">tracked</i
          >?</span
        >
        {#if validationErrors.IAmTrackedKnowledge4?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.IAmTrackedKnowledge4?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="IAmTrackedKnowledge4"
              value="no"
            />
            <p>Not I didn't know :(</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="IAmTrackedKnowledge4"
              value="yes"
            />
            <p>Yes...</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="okToBeTracked5" class="label space-y-4">
        <span
          >On a scale from <b class="text-teal-400">1</b> (not at all) to
          <b class="text-teal-400">5</b> (very much), how much would you agree
          to the statement:<br />It is ok for me to be
          <i class="text-teal-400">tracked</i> in order to get better
          <i class="text-teal-400">advertisement</i>
          on products that really interest me.</span
        >
        {#if validationErrors.okToBeTracked5?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`grid gap-2 sm:grid-cols-5 ${validationErrors.okToBeTracked5?.required && "text-error-300"}`}
        >
          <label
            class="flex flex-row items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2"
          >
            <input
              class="radio m-0"
              type="radio"
              name="okToBeTracked5"
              value="1"
            />
            <p>1 (not at all)</p>
          </label>
          <label
            class="flex flex-row items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2"
          >
            <input class="radio" type="radio" name="okToBeTracked5" value="2" />
            <p>2</p>
          </label>
          <label
            class="flex flex-row items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2"
          >
            <input class="radio" type="radio" name="okToBeTracked5" value="3" />
            <p>3</p>
          </label>
          <label
            class="flex flex-row items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2"
          >
            <input class="radio" type="radio" name="okToBeTracked5" value="4" />
            <p>4</p>
          </label>
          <label
            class="flex flex-row items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2"
          >
            <input class="radio" type="radio" name="okToBeTracked5" value="5" />
            <p>5 (very much)</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="knowledgeHowTracking6" class="label space-y-4">
        <span>Do you know how <i class="text-teal-400">tracking</i> works?</span
        >
        {#if validationErrors.knowledgeHowTracking6?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.knowledgeHowTracking6?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="knowledgeHowTracking6"
              value="no"
            />
            <p>No, I don't know :(</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="radio"
              type="radio"
              name="knowledgeHowTracking6"
              value="yes"
            />
            <p>Yes!</p>
          </label>
        </div>
      </label>
    </div>

    <div class="card p-4">
      <label for="trackingMethodsFamiliar7" class="label space-y-4">
        <span
          >Which of the following <i class="text-teal-400">tracking methods</i>
          have you heared of?
          <span class="text-white text-opacity-40"
            >(multiple answers possible)</span
          ></span
        >
        {#if validationErrors.trackingMethodsFamiliar7?.required}
          <span class="text-error-300">This field is required</span>
        {/if}
        <div
          class={`space-y-2 ${validationErrors.trackingMethodsFamiliar7?.required && "text-error-300"}`}
        >
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="trackingMethodsFamiliar7.ip-address"
            />
            <p>IP-Adress Tracking</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="trackingMethodsFamiliar7.cookie"
            />
            <p>Cookie based tracking</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="trackingMethodsFamiliar7.tracking-pixels"
            />
            <p>Tracking Pixels (Web Beacons)</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="trackingMethodsFamiliar7.tracking-links"
            />
            <p>Tracking Links</p>
          </label>
          <label class="flex items-center space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name="trackingMethodsFamiliar7.browser-fingerprinting"
            />
            <p>Browser Fingerprinting</p>
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
