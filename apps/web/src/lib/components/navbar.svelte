<script lang="ts">
  	import { page } from "$app/stores";
	import { cn } from "$lib/utils.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {Menu, Sun, Moon} from 'lucide-svelte'
	import { toggleMode } from "mode-watcher";
  	import { Button } from "$lib/components/ui/button/index.js";
  import type { User } from "$lib/models/User";

	let className: string | undefined | null = undefined;
	export { className as class };

	const routes = [
		{label: 'About', path: '/about'},
		{label: 'Projects', path: '/projects'},
		{label: 'Resume', path: '/resume'},
		{label: 'Contact', path: '/contact'}
	];

	$: currentPath = $page.url.pathname;

	export let user: User | undefined;
	
</script>

<nav class={cn("flex items-center justify-start w-full", className)}>
	<div class="mr-auto">
        <a href="/">
			Chris Young
		</a>
    </div>
    <div class=" items-center justify-center space-x-4 hidden sm:flex">
        {#each routes as route}
            <a href={route.path} class:active={currentPath.startsWith(route.path)}>
                {route.label}
            </a>
        {/each}
		{#if !!user}
			<a href='/dashboard' class:active={currentPath.startsWith('/dashboard')}>
				{'Dashboard'}
			</a>
		{/if}
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
			  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
			  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
    </div>
	<div class=" items-center justify-center space-x-4 flex sm:hidden">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>        
				<Menu class="cursor-pointer" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
			  <DropdownMenu.Group>
				{#each routes as route}
					<DropdownMenu.Item>
						<a style="width: 100%;" href={route.path} class:active={currentPath.startsWith(route.path)}>
							{route.label}
						</a>
					</DropdownMenu.Item>
				{/each}
				{#if !!user}
					<DropdownMenu.Item>
						<a style="width: 100%;" href='/dashboard' class:active={currentPath.startsWith('/dashboard')}>
							{'Dashboard'}
						</a>
					</DropdownMenu.Item>
				{/if}
				<DropdownMenu.Item class="cursor-pointer" on:click={toggleMode}>
					<Button class="m-auto" variant="outline" size="icon">
						<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenu.Item>

			  </DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
    </div>
</nav>

<style>
	a {
		text-decoration: none;
	}
	.active {
		text-decoration: underline;
	}
</style>