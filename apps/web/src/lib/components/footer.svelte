<script lang="ts">
  import type { User } from "$lib/models/User";

  export let user: User;
</script>

<div class="flex items-center gap-2">
    {#if !user}
        <a class="opacity-50" href="/login">Admin Log in</a>
    {:else}
        <p class="opacity-50">{user.email}</p>
        <form action="/logout" method="POST">
            <button type="submit" class="w-full text-start opacity-50">Logout</button>
        </form>
    {/if}
</div>


