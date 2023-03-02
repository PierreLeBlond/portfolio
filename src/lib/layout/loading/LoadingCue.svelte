<script lang="ts">
  import Loading from './Loading.svelte';
  import { globalState } from '$lib/stores/globalState';
  import { pageState } from '$lib/stores/pageState';
  import { viewerState } from '$lib/stores/viewerState';
  const viewerStates = ['mounting', 'flying'];
  const globalStates = ['navigating'];
  const pageStates = ['loading'];

  $: loading =
    viewerStates.includes($viewerState) || globalStates.includes($globalState) || pageStates.includes($pageState);
</script>

{#if loading}
  <Loading />
{/if}
