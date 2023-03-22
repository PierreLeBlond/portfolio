<script lang="ts">
  import WaveMonsterCollapse from '@s0rt/wave-monster-collapse';
  import Mask from './Mask.svelte';
  import mask from './mask.png';

  let offsetHeight: number;
</script>

<div
  bind:offsetHeight
  class="relative h-full w-full"
>
  <Mask
    url={mask}
    columns={5}
    frames={24}
    size={offsetHeight}
  >
    <div class="h-full w-full px-[10%]">
      <WaveMonsterCollapse />
    </div>
  </Mask>
</div>
