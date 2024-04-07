<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Textarea } from "$lib/components/ui/textarea";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { superForm } from "sveltekit-superforms";
    import  { aboutFormSchema } from "./schema";
    import type { PageData } from "./$types";
    import { toast } from "svelte-sonner";

    export let data: PageData;

    const form = superForm(data.form, {
        validators: zodClient(aboutFormSchema),
        onSubmit({ formData, cancel }) {
            if(!isTainted()) cancel();
            formData.set('id', data.id)
        },
        resetForm: false,
        onUpdated({form}) {
            if(form.message)
                toast.success(form.message)
        },
        onError({result}) {
          toast.error(result.error.message)
        },
        delayMs: 200,
        timeoutMs: 8000
    });

    const { form: formData, enhance ,allErrors, delayed, isTainted  } = form;

</script>

<form method="POST" use:enhance class="w-full flex flex-col gap-3">
    <Form.Field {form} name="text">
      <Form.Control let:attrs>
        <Form.Label>About Text</Form.Label>
        <Textarea disabled={$delayed} class="min-h-52" {...attrs} bind:value={$formData.text} />
      </Form.Control>
      <Form.Description />
      <Form.FieldErrors />
    </Form.Field>
    {#if $allErrors.length}
      <ul>
        {#each $allErrors as error}
          {#if error.path == '_errors'}
            <li class="text-primary">
              {error.messages.join('. ')}
            </li>          
          {/if}
        {/each}
      </ul>
    {/if}
    <Form.Button disabled={$delayed} class="w-full">Submit</Form.Button>
  </form>
