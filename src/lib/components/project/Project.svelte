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

<div class="pointer-events-none relative flex h-full w-full">
  <div class="w-full overflow-hidden horizontal:w-3/5">
    {@render project?.()}
  </div>
  <div
    class="absolute top-0 flex h-full w-full items-center justify-start p-16 horizontal:relative horizontal:w-2/5 horizontal:pr-16"
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
