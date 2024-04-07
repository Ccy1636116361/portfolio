<script>
  import { page } from "$app/stores";
    import SideNav from "$lib/components/sidenav.svelte";

    $: currentPath = $page.url.pathname;

</script>
<svelte:head>
    <title>Chris Young • Dashboard</title> 
</svelte:head>
  
<main class="relative sm:flex block h-full">
    <div class="sm:pr-10 p-0 sm:min-w-40">
        <SideNav />
    </div>
    <div class="sm:hidden block">
        <div class="items-center flex flex-row gap-10">
            <div class="h-10">
                <a href="/dashboard/about" class:active={currentPath == "/dashboard/about"}>
                    About
                </a>
            </div>
            <div class="h-10">
                <a href="/dashboard/projects" class:active={currentPath == "/dashboard/projects"}>
                    Projects
                </a>
            </div>
            <div class="h-10">
                Resume
            </div>
        </div>
    </div>
    <div class="w-full">
        <slot></slot>
    </div>
</main>

<style>
	a {
		text-decoration: none;
	}
	.active {
		text-decoration: underline;
	}
</style>