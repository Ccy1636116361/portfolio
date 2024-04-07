<script lang="ts">
    import type { Project } from "$lib/models/Project";
    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
  
    export let project: Project;
    export let imgUrl: string
</script>
  
    {#if project.link}
        <a href={project.link} target="_blank" class="flex gap-2 max-w-lg">
            <Card.Root>
                <Card.Header class="md:min-h-60">
                    <Card.Title class="text-2xl">{project.title}</Card.Title>
                    <Card.Description>{project.description}</Card.Description>
                </Card.Header>
                <Card.Content class="md:min-h-80">
                    <img src={`${imgUrl}/api/files/${project.collectionId}/${project.id}/${project.thumbnail}?thumb=100x250`} alt={project.title}/>
                </Card.Content>
                <Card.Footer class="flex flex-wrap gap-2">
                {#if project?.expand?.tags}
                    {#each project.expand?.tags as tag}
                        <Badge variant="default"><a href={tag.url} target="_blank">{tag.text}</a></Badge>
                    {/each}
                {/if}
                </Card.Footer>
            </Card.Root>
        </a>
    {:else}
        <div class="flex gap-2 max-w-lg">
            <Card.Root>
                <Card.Header class="md:min-h-60">
                    <Card.Title class="text-2xl">{project.title}</Card.Title>
                    <Card.Description>{project.description}</Card.Description>
                </Card.Header>
                <Card.Content class="md:min-h-80">
                    <img src={`${imgUrl}/api/files/${project.collectionId}/${project.id}/${project.thumbnail}?thumb=100x250`} alt={project.title}/>
                </Card.Content>
                <Card.Footer class="flex flex-wrap gap-2">
                {#if project?.expand?.tags}
                    {#each project.expand?.tags as tag}
                        <Badge variant="default"><a href={tag.url} target="_blank">{tag.text}</a></Badge>
                    {/each}
                {/if}
                </Card.Footer>
            </Card.Root>
        </div>
    {/if}

  
  
  