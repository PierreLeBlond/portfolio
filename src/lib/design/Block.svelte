<script lang="ts">
  export let label = '';
  export let shadow = false;

  // Does the block appears facing left ?
  export let left = false;
</script>

<div class="z-10 relative w-full group">
  {#if left}
    <div
      class="face absolute h-full w-8 origin-left -right-8 top-0 -skew-y-[45deg] bg-gray-400"
      style:box-shadow={'rgba(0, 0, 0, 0.1) 0px 0px 0.5em 0.3em inset'}
    />
    <div
      class="face absolute w-full h-8 origin-bottom right-0 -top-8 -skew-x-[45deg] bg-gray-300"
      style:box-shadow={'rgba(0, 0, 0, 0.1) 0px 0px 0.5em 0.3em inset'}
    />
  {:else}
    <div
      class="face absolute h-full w-8 origin-right -left-8 top-0 skew-y-[45deg] bg-gray-400"
      style:box-shadow={'rgba(0, 0, 0, 0.1) 0px 0px 0.5em 0.3em inset'}
    />
    <div
      class="face absolute w-full h-8 origin-bottom left-0 -top-8 skew-x-[45deg] bg-gray-300"
      style:box-shadow={'rgba(0, 0, 0, 0.1) 0px 0px 0.5em 0.3em inset'}
    />
  {/if}
  <div
    class="face w-full px-4 py-2 bg-gray-200"
    style:box-shadow={'rgba(0, 0, 0, 0.1) 0px 0px 0.5em 0.3em inset'}
  >
    <slot />
    {label}
  </div>
</div>
{#if shadow}
  {#if left}
    <div
      class="w-full h-8 origin-bottom right-0 -translate-y-4 -skew-x-[45deg] bg-gray-800"
      style:filter={'blur(0.6em)'}
    />
  {:else}
    <div
      class="w-full h-8 origin-bottom left-0 -translate-y-4 skew-x-[45deg] bg-gray-800"
      style:filter={'blur(0.6em)'}
    />
  {/if}
{/if}

<style>
  .face {
    @apply border border-gray-800 group-hover:bg-orange-600 group-hover:text-gray-200 transition-colors;
  }
</style>
