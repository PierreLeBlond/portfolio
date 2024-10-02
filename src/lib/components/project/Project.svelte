<script lang="ts">
  import ProjectPanel from "./ProjectPanel.svelte";

  export let title: string;
  export let githubLink: string | null = null;
  export let link: string | null = null;
  export let screenshots: string[] = [];
</script>

<div class="grid h-full w-full horizontal:grid-cols-5">
  <div class="h-full overflow-hidden horizontal:col-span-3">
    <slot name="project" />
  </div>
  <div
    class="fixed bottom-0 flex w-full justify-center justify-self-center horizontal:relative horizontal:col-span-2"
  >
    <ProjectPanel {title} {githubLink} {link} {screenshots}>
      <slot name="about" />
      <slot name="excerpt" slot="excerpt" />
    </ProjectPanel>
  </div>
</div>
