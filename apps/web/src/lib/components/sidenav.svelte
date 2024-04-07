<script lang="ts">
  import { page } from "$app/stores";

    $: currentPath = $page.url.pathname;

</script>

<div class="flex-col hidden sm:flex items-center border-r-2">
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

<style>
	a {
		text-decoration: none;
	}
	.active {
		text-decoration: underline;
	}
</style>