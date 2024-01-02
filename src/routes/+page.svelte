<script lang="ts">
  import { fly } from "svelte/transition";
</script>

<section
  class="text-md pointer-events-none absolute right-0 top-0 flex h-screen w-full flex-col justify-end gap-y-4 p-6 md:text-xl lg:p-16 large:h-full large:w-1/3 large:-translate-y-[30%]"
  transition:fly|global={{ x: 500 }}
>
  <div class="flex flex-col gap-y-4">
    <h1 class="text-xl md:text-5xl">Hello!</h1>
    <p>
      I'm <span class="font-bold">Pierre</span>, <br />I'm a
      <span class="font-bold"> 3D & web developer</span>, <br />and this is my
      portfolio.
    </p>
  </div>
  <p class="pointer-events-none justify-self-end">
    Also, I'm looking for job opportunities !<br />
    Feel free to contact me at
    <a
      href="mailto:pierre.lespingal@gmail.com"
      class="pointer-events-auto text-blue-500"
    >
      pierre.lespingal@gmail.com
    </a>
  </p>
</section>
