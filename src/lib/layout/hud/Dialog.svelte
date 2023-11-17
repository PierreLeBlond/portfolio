<script lang="ts">
  import { dialogState } from "$lib/stores/dialogState";
  import { typewritter } from "$lib/layout/reusable/typewritter";
  import TextBox from "./TextBox.svelte";
</script>

{#if $dialogState}
  <TextBox>
    {$dialogState}
  </TextBox>
{/if}
