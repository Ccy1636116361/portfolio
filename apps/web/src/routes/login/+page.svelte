<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import {Input} from "$lib/components/ui/input";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import  { loginFormSchema } from "./schema";
  import type { PageData } from "./$types";
  import H1 from '$lib/components/h1.svelte';

  export let data: PageData;

  const form = superForm(data.form, {
      validators: zodClient(loginFormSchema),
      delayMs: 200,
      timeoutMs: 8000
  });

  const { form: formData, allErrors, delayed, enhance } = form;

</script>
<svelte:head>
    <title>Chris Young • Login</title> 
</svelte:head>

<div class="px-2 flex flex-col gap-3 items-center">
  <H1>Login</H1>
  <form use:enhance method="POST" class="w-full flex flex-col gap-3 max-w-96">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>Email</Form.Label>
        <Input disabled={$delayed} {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>Password</Form.Label>
        <Input disabled={$delayed} type="password" {...attrs} bind:value={$formData.password} />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    {#if $allErrors.length}
      <ul>
        {#each $allErrors as error}
          {#if error.path == '_errors'}
            <li class="text-destructive">
              {error.messages.join('. ')}
            </li>          
          {/if}
        {/each}
      </ul>
    {/if}
    <Form.Button disabled={$delayed} class="w-full">Submit</Form.Button>
  </form>
</div>