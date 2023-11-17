<script lang="ts">
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { HelpCircle, X } from "lucide-svelte";
  import { fly } from "svelte/transition";
</script>

<section class="pointer-events-none absolute right-0 top-0 flex w-1/3 p-16">
  <div
    class="pointer-events-auto hidden w-full rounded border-2 border-stone-200 bg-gradient-to-tr from-stone-100/70 to-stone-300/70 p-4 pb-8 text-stone-800 shadow-lg backdrop-blur large:flex"
    transition:fly|global={{ duration: 400, x: 500 }}
  >
    <slot />
  </div>
</section>

{#if !$descriptionOpenStatus}
  <button
    class="absolute right-8 top-8 rounded-full border-2 border-stone-200 bg-gradient-to-tr from-stone-100/70 to-stone-300/70 p-2 text-stone-800 shadow-lg large:hidden"
    on:click={() => descriptionOpenStatus.set(true)}
    on:keydown={() => descriptionOpenStatus.set(true)}
    transition:fly|global={{ duration: 400, x: 500 }}
  >
    <HelpCircle></HelpCircle>
  </button>
{/if}

{#if $descriptionOpenStatus}
  <div
    class="pointer-events-none absolute right-0 top-0 flex w-full p-4 large:hidden"
    transition:fly|global={{ duration: 400, x: 500 }}
  >
    <div
      class="pointer-events-auto w-full rounded border-2 border-stone-200 bg-gradient-to-tr from-stone-100/70 to-stone-300/70 p-4 pb-8 text-stone-800 shadow-lg backdrop-blur"
    >
      <button
        class="absolute right-4 top-4 rounded-full border-2 border-stone-200 bg-gradient-to-tr from-stone-100/70 to-stone-300/70 p-2 text-stone-800 shadow-lg large:hidden"
        on:click={() => descriptionOpenStatus.set(false)}
        on:keydown={() => descriptionOpenStatus.set(false)}
      >
        <X></X>
      </button>
      <slot />
    </div>
  </div>
{/if}
