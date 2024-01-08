<script lang="ts">
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";

  let boxWidth: number;
  let boxHeight: number;
</script>

<div
  class="relative h-full w-full"
  out:fade|global={{
    duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
  }}
>
  <Mask
    name="Ustom"
    columns={6}
    frames={30}
    width={boxWidth}
    height={boxHeight}
  >
    <div class="flex h-full w-full justify-center">
      <div class="flex h-full w-full justify-center large:pr-[25%]">
        <RatioBox ratio={112.5 / 157.5} bind:boxWidth bind:boxHeight>
          <div class="h-full w-full scale-95">
            <iframe
              title="ustom"
              src="https://ustom.pierrelespingal.com"
              class="h-full w-full bg-stone-100"
            />
          </div>
        </RatioBox>
      </div>
    </div>
  </Mask>
</div>

<DescriptionPanel
  title="App"
  githubLink="https://github.com/PierreLeBlond/ustom"
>
  <div class="flex flex-col items-center justify-center gap-y-2">
    <p>
      Clone of the sutom app, which is itself a clone of wordle.<br />
      You are probably a clone too.
    </p>
    <p>I added custom game generation, and a leaderboard.</p>
    <p>
      You can find the original app <a
        class="font-bold text-stone-900 underline"
        href="https://ustom.fly.dev/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
      >
        here
      </a>
    </p>
  </div>
</DescriptionPanel>
