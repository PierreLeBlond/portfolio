<script lang="ts">
  import type { Snippet } from "svelte";
  import ProjectPanel from "./ProjectPanel.svelte";

  interface Props {
    title: string;
    githubLink?: string | null;
    link?: string | null;
    screenshots?: string[];
    project?: Snippet;
    about: Snippet;
    excerpt?: Snippet;
  }

  let {
    title,
    githubLink = null,
    link = null,
    screenshots = [],
    project,
    about,
    excerpt,
  }: Props = $props();
</script>

<div class="grid h-full w-full horizontal:grid-cols-5">
  <div class="h-full overflow-hidden horizontal:col-span-3">
    {@render project?.()}
  </div>
  <div
    class="fixed bottom-0 flex w-full justify-center justify-self-center horizontal:relative horizontal:col-span-2"
  >
    <ProjectPanel {title} {githubLink} {link} {screenshots}>
      {#snippet about()}
        {@render about()}
      {/snippet}
      {#snippet excerpt()}
        {@render excerpt?.()}
      {/snippet}
    </ProjectPanel>
  </div>
</div>
