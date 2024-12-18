<script lang="ts">
  const meta = {
    title: "✨Tracking Survey✨",
    description: "A survey about advertisement and tracking",
    url: "https://tracking-survey.bastipnt.de",
    image: "https://tracking-survey.bastipnt.de/Tracking_Survey_Screenshot.png",
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={meta.url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={meta.url} />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
</svelte:head>
