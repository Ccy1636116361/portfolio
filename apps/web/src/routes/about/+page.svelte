<script lang="ts">
    import H1 from "$lib/components/h1.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
  
</script>
<svelte:head>
    <title>Chris Young • About</title> 
</svelte:head>
<div class="flex flex-col gap-4">
    <H1>About</H1>
    {data.about}
</div>