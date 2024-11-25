<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<section
  class="pointer-events-none absolute bottom-0 right-0 flex h-screen w-full flex-col justify-between gap-y-4 p-6 text-stone-100 horizontal:h-full horizontal:w-1/2 horizontal:flex-col horizontal:items-start horizontal:justify-center horizontal:p-16"
  transition:fly|global={{ x: 500, delay: 1 }}
>
  <div class="flex flex-col gap-y-4">
    <p>
      <span class="text-5xl font-bold">Pierre Lespingal</span> <br />
      <span class="text-4xl font-bold text-stone-400"> 3D & Web developer</span>
    </p>
  </div>
  <p
    class="pointer-events-none justify-self-end text-start text-xl horizontal:text-start xs:text-center"
  >
    Looking for job opportunities!<br />
    Feel free to contact me at
    <a
      href="mailto:pierre.lespingal@gmail.com"
      class="pointer-events-auto text-blue-400"
    >
      pierre.lespingal@gmail.com
    </a>
  </p>
</section>
