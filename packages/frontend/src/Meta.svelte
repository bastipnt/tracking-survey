<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
  title="✨Tracking Survey✨"
  titleTemplate="%s"
  description="A survey about advertisement and tracking."
  canonical="https://tracking-survey.bastipnt.de"
  openGraph={{
    url: "https://tracking-survey.bastipnt.de",
    title: "✨Tracking Survey✨",
    description: "A survey about advertisement and tracking.",
    images: [
      {
        url: "https://tracking-survey.bastipnt.de/Tracking_Survey_Screenshot.png",
        alt: "Screenshot of tracking survey webpage",
      },
    ],
    siteName: "tracking-survey",
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "✨Tracking Survey✨",
    description: "A survey about advertisement and tracking.",
    image: "https://tracking-survey.bastipnt.de/Tracking_Survey_Screenshot.png",
    imageAlt: "Screenshot of tracking survey webpage",
  }}
/>
