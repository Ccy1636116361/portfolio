<script lang="ts">
    import type { PageData } from "./$types";
    import { browser } from '$app/environment';

    export let data: PageData;

    if(data.redirect && browser){
        window.location.href = data.redirect;
    }
</script>

Redirecting...