<script lang="ts">
  import "../app.pcss";
  import Navbar from "$lib/components/navbar.svelte"
  import Footer from "$lib/components/footer.svelte";
  import CommandMenu from "$lib/components/command-menu.svelte";

  import { ModeWatcher } from "mode-watcher";
  import { page } from "$app/stores";
  import { Toaster } from "$lib/components/ui/sonner";
  import type {MenuOptions} from '$lib/models/MenuOptions';
  import { User } from "lucide-svelte";

  //const user = $page.data.user;
  $: ({ user } = $page.data)
</script>

<Toaster />

<main class="relative min-h-dvh">
  <ModeWatcher defaultMode="dark" />
  <div class="pb-12">
    <div class="border-b">
      <div class="flex h-16 items-center px-4 justify-center">
        <Navbar class="mx-6" bind:user={user} />
      </div>
    </div>
    <div class="p-8 h-full">
        <slot>
        </slot>
    </div>
  </div>
  <div class="border-t absolute bottom-0 w-full h-12">
    <div class="flex items-center h-full px-4 justify-center">
      <Footer {user} />
    </div>
  </div>
</main>