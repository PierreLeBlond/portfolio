<script lang="ts">
  import { appState } from '$lib/state/appState';
  import Loading from './Loading.svelte';

  const loadingStates = ['mounting', 'loading', 'navigating', 'flying', 'navigatingWhileFlying', 'disolving'];
  $: loading = loadingStates.includes($appState);
</script>

{#if loading}
  <Loading />
{/if}
