import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import { myCustomTheme } from "./customTheme";

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
    extend: {
      colors: {
        headingColor: "#1fb6ff",
      },
      gridTemplateRows: {
        layout: "1fr auto",
      },
    },
  },
  plugins: [
    forms,
    skeleton({
      themes: {
        // preset: ["skeleton"],
        custom: [myCustomTheme],
      },
    }),
  ],
} satisfies Config;

export default config;
