<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<section
  class="text-md pointer-events-none absolute right-0 top-0 flex h-screen w-full flex-col justify-end gap-y-4 p-6 text-stone-100 md:text-xl horizontal:h-full horizontal:w-1/3 horizontal:-translate-y-[30%] horizontal:p-16"
  transition:fly|global={{ x: 500 }}
>
  <div class="flex flex-col gap-y-4">
    <p>
      <span class="font-bold">Pierre Lespingal</span>, <br />
      <span class="font-bold"> 3D & Web developer</span>
    </p>
  </div>
  <p class="pointer-events-none justify-self-end">
    Looking for job opportunities!<br />
    Feel free to contact me at
    <a
      href="mailto:pierre.lespingal@gmail.com"
      class="pointer-events-auto text-blue-500"
    >
      pierre.lespingal@gmail.com
    </a>
  </p>
</section>
