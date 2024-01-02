<script lang="ts">
  import { Home } from "lucide-svelte";
  import Button from "$lib/components/reusable/Button.svelte";
</script>

<div class="absolute left-8 top-8 z-40 large:left-16 large:top-16">
  <Button href="/">
    <Home class="large:h-8 large:w-8"></Home>
  </Button>
</div>
