<script lang="ts">
  	import { page } from "$app/stores";
	import { cn } from "$lib/utils.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {Menu, Sun, Moon, User as UserComp, FileSpreadsheet, PenBoxIcon, Contact, Link, Paintbrush2, LogOut, LogIn} from 'lucide-svelte'
	import { toggleMode } from "mode-watcher";
  	import { Button } from "$lib/components/ui/button/index.js";
  import type { User } from "$lib/models/User";
  import CommandMenu from "./command-menu.svelte";
  import type { MenuOptions } from "$lib/models/MenuOptions";

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

	let options: MenuOptions = [
        {
			groupName: 'Pages', 
			protected: false, 
			actions: [
            	{title: 'About', subtitle: 'About me!', link: '/about', icon: UserComp},
            	{title: 'Projects', subtitle: 'Projects I have worked on', link: '/projects', icon: PenBoxIcon},
            	{title: 'Resume', subtitle: 'My Work History', link: '/resume', icon: FileSpreadsheet},
            	{title: 'Contact', subtitle: 'Send me a message', link: '/contact', icon: Contact},
				{title: 'Change Theme', subtitle: 'Switch the Theme', action: toggleMode, icon: Paintbrush2},
				{title: 'Login', subtitle: 'Login to dashboard', link: '/login', icon: LogIn, hideLoggedIn: true},

			]
		},
		{
			groupName: 'Admin',
			protected: true,
			actions: [
            	{title: 'Links', subtitle: 'Saved Links', link: '/dashboard/links', icon: Link},
				{title: 'Logout', subtitle: 'See you next time!', link: '/logout', method: 'POST', icon: LogOut}

			]
          } 
        ]
	
</script>

<nav class={cn("flex items-center w-full gap-2", className)}>
	<div class="mr-auto">
        <a href="/">
			Chris Young
		</a>
    </div>
	<div class="hidden md:flex">
		<CommandMenu {user} {options} />
	</div>

    <div class="items-center justify-center space-x-4 hidden md:flex">
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
	<div class=" items-center justify-center space-x-4 flex md:hidden">
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