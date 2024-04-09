<script lang="ts">
    import { Command } from 'cmdk-sv';
    import * as ShadCommand from '$lib/components/ui/command';
    import type { MenuOptions } from "$lib/models/MenuOptions";
    import type { User } from '$lib/models/User';
    import Input from './ui/input/input.svelte';
    import Button from './ui/button/button.svelte';
    import { Search } from 'lucide-svelte';
  import { browser } from '$app/environment';

    let open = false

    export let options: MenuOptions;
    export let user: User | undefined
    
    const handleKeyPress = (event: KeyboardEvent) => {
        if(event.key == 'Escape'){
            event.preventDefault();
            open = false;
        }
        if(event.ctrlKey && event.key === 'k'){
            event.preventDefault();
            open = !open
        }
    }

    const keydown = (event:KeyboardEvent) => {
        handleKeyPress(event)
    }
    
    let isMac = false;
    if(browser){
        isMac = navigator.userAgent.toLowerCase().includes('mac');
    }
</script>

<Button variant="outline" class="flex gap-4 rounded-3xl " on:click={() => open = true}>
    <Search/>
    <div class="flex items-center">
        {#if isMac}
            <span class="text-base mt-[-1px]">⌘</span>+K
        {:else}
            <span>Ctrl</span>+K
        {/if}
    </div>
</Button>


<svelte:window on:keydown={keydown}/>



<ShadCommand.Dialog bind:open>
    <div class="linear">
        <Command.Root class="max-w-[450px] rounded-lg border shadow-md">
            <Command.Input autofocus placeholder="Type a command or search..." />
            <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            {#each options as group}
                {#if group.protected && user}    
                    <Command.Group heading={group.groupName}>
                        {#each group.actions as action}
                            {#if action?.link && !action?.method && !action.hideLoggedIn}
                                <a on:click={() => open = !open} href={action.link}>
                                    <Command.Item >
                                        <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                        <div class="flex flex-col" >
                                            <span>{action.title}</span>
                                            <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                        </div>
                                    </Command.Item>
                                </a>
                            {:else if action?.action}
                                <Command.Item on:click={action.action}>
                                    <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                    <div class="flex flex-col" >
                                        <span>{action.title}</span>
                                        <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                    </div>
                                </Command.Item>
                            {:else if action?.method}
                                <form action={action.link} method="POST">
                                    <button type="submit" class="w-full">
                                        <Command.Item>
                                            <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                            <div class="flex flex-col items-start" >
                                                <span>{action.title}</span>
                                                <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                            </div>
                                        </Command.Item>
                                    </button>
                                </form>
                            {/if}
                        {/each}
                    </Command.Group>
                    <Command.Separator />
                {:else if !group.protected}
                    <Command.Group heading={group.groupName}>
                        {#each group.actions as action}
                            {#if action?.link && !action?.method && ((user && !action.hideLoggedIn) || (!user))}
                                <a on:click={() => open = !open} href={action.link}>
                                    <Command.Item >
                                        <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                        <div class="flex flex-col" >
                                            <span>{action.title}</span>
                                            <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                        </div>
                                    </Command.Item>
                                </a>
                            {:else if action?.action}
                                <button on:click={action.action} on:click={() => open = !open} class="w-full">
                                    <Command.Item>
                                        <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                        <div class="flex flex-col" >
                                            <span>{action.title}</span>
                                            <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                        </div>
                                    </Command.Item>
                                </button>
                            {:else if action?.method}
                                <form action={action.link} method="POST">
                                    <button type="submit" class="w-full">
                                        <Command.Item>
                                            <svelte:component this={action.icon} class="mr-2 h-4 w-4" />
                                            <div class="flex flex-col items-start" >
                                                <span>{action.title}</span>
                                                <span class="text-xs text-opacity-30">{action.subtitle}</span>
                                            </div>
                                        </Command.Item>
                                    </button>
                                </form>
                            {/if}
                        {/each}
                    </Command.Group>
                    <Command.Separator />       
                {/if}
            {/each}
            </Command.List>
        </Command.Root> 
    </div>
</ShadCommand.Dialog>
