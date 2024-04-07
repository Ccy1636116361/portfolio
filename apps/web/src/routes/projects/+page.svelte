<script lang="ts">
    import H1 from "$lib/components/h1.svelte";
    import ProjectCard from "$lib/components/project-card.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
  
</script>
<svelte:head>
    <title>Chris Young • Projects</title> 
</svelte:head>
<div class="flex flex-col gap-4">
    <H1>Projects</H1>
    <div class="flex flex-wrap gap-4">
        {#each data.projects as project}
            <ProjectCard {project} imgUrl={data.imgUrl}></ProjectCard>
        {/each}
    </div>
</div>