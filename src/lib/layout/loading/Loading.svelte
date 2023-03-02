<script>
  import SpriteSheetAnimator from '$lib/layout/reusable/SpriteSheetAnimator.svelte';
  import loading from '$lib/icons/loading.png';
</script>

<div class="z-50 h-full w-full">
  <SpriteSheetAnimator
    url={loading}
    columns={5}
    frames={25}
    width={48}
    height={48}
  />
</div>
