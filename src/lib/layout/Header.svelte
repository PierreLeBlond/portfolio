<script>
  import SpriteSheetAnimator from '$lib/layout/reusable/SpriteSheetAnimator.svelte';
  import house from '$lib/icons/house.png';
  import LoadingCue from './loading/LoadingCue.svelte';
</script>

<div class="flex h-full w-full items-center justify-between bg-black">
  <a
    href="/"
    class="ml-3 h-12 w-12 hover:cursor-pointer"
  >
    <SpriteSheetAnimator
      url={house}
      columns={8}
      frames={50}
      width={48}
      height={48}
      activateOnHover={true}
    />
  </a>
  <div class="relative mr-3 h-12 w-12 sm:hidden">
    <LoadingCue />
  </div>
</div>
