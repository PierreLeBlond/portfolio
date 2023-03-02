<script lang="ts">
  import { onMount } from 'svelte';
  import { dialogState } from '$lib/stores/dialogState';
  import { typewritter } from '$lib/layout/reusable/typewritter';

  let dialogText: string;
  dialogState.subscribe((value: string) => {
    dialogText = value;
  });

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

<div class="contents text-base text-white">
  {#if mounted}
    {#key dialogText}
      <span
        class="p-1"
        in:typewritter={{}}
      >
        {dialogText}
      </span>
    {/key}
  {/if}
</div>
