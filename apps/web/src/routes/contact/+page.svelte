<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import {Input} from "$lib/components/ui/input";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { superForm } from "sveltekit-superforms";
    import  { contactFormSchema } from "./schema";
    import type { PageData } from "./$types";
    import H1 from '$lib/components/h1.svelte';
  import { Textarea } from '$lib/components/ui/textarea';
  import { toast } from 'svelte-sonner';
  import FormDescription from '$lib/components/ui/form/form-description.svelte';
  
    export let data: PageData;
  
    const form = superForm(data.form, {
        validators: zodClient(contactFormSchema),
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

    const getTextColor = (length: number) => {
        if(length > 200 && length <= 250) {
            return 'text-orange-500'
        }

        if(length > 250){
            return 'text-destructive'
        }

        return
    }
  
  </script>
  
  <svelte:head>
    <title>Chris Young • Contact</title> 
</svelte:head>
  <div class="px-2 flex flex-col gap-3 items-center">
    <H1>Contact</H1>
    <form method="POST" use:enhance class="w-full flex flex-col gap-3 max-w-[50rem]">
        <Form.Field {form} name="name">
            <Form.Control let:attrs>
                <Form.Label>Name</Form.Label>
                <Input disabled={$delayed} {...attrs} bind:value={$formData.name} />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input disabled={$delayed} {...attrs} bind:value={$formData.email} />
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field  {form} name="message">
            <Form.Control let:attrs>
                <Form.Label>Message</Form.Label>
                <Textarea disabled={$delayed} class="min-h-64" {...attrs} bind:value={$formData.message} />
                <Form.Description class={getTextColor($formData.message.length)}>{`${$formData.message.length} / 250`}</Form.Description>
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
        </Form.Field>
        <Form.Button disabled={$delayed} class="w-full">Submit</Form.Button>
    </form>
  </div>