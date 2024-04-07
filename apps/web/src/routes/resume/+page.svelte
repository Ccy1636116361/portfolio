<script lang="ts">
    import type { PageData } from "./$types";

  import H1 from "$lib/components/h1.svelte";
  export let data: PageData;

</script>
<svelte:head>
    <title>Chris Young • Resume</title> 
</svelte:head>
<div class="flex flex-col gap-4 max-h-[650px]">
    <H1>Resume</H1>
    <iframe src={`${data.imgUrl}/api/files/${data.resume.collectionId}/${data.resume.id}/${data.resume.resume}`} height="650" title="PDF"/>
</div>