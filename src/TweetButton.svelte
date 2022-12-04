<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  let container: HTMLElement;

  export let text: string;

  const tryRenderButton = () => {
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
    const twttr = (window as any).twttr;
    if (twttr) {
      twttr.widgets
        .createShareButton(location.href, container, {
          size: "large",
          lang: "ja",
          text: text,
          related: "motemen",
          hashtags: "ポケモン",
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.onload = () => {
      tryRenderButton();
    };
    document.body.appendChild(script);
  });

  afterUpdate(() => {
    tryRenderButton();
  });
</script>

<div bind:this={container} />
