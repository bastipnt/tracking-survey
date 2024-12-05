import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    skeleton({
      themes: { preset: ["skeleton"] },
    }),
  ],
} satisfies Config;

export default config;
