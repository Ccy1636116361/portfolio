<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { deleteLinksFormSchema, editLinksFormSchema } from "./schema";
  import { toast } from "svelte-sonner";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Form from '$lib/components/ui/form';
  import {Input} from '$lib/components/ui/input';


  export let id: string;
  export let url: string;
  export let shortcut: string;
  export let delForm: SuperValidated<{
      id: string;
  }, any, {
      id: string;
  }>

  export let editForm: SuperValidated<{
    id: string;
    url: string;
    shortcut: string;
  }, any, {
    id: string;
    url: string;
    shortcut: string;
  }>

  const delFormEle = superForm(delForm, {
      validators: zodClient(deleteLinksFormSchema),
      onSubmit({formData}) {
        formData.set('id', id)
      },
      onUpdated({form}) {
        if(form.message)
          toast.success(form.message)
      },
      onError({result}) {
        toast.error(result.error.message)
      },
      delayMs: 200,
      timeoutMs: 8000,
      invalidateAll: "force"
  });

  const { form: formData, enhance ,allErrors, delayed, isTainted  } = delFormEle;
  
  const editFormEle = superForm(editForm, {
      validators: zodClient(editLinksFormSchema),
      onSubmit({formData}) {
        formData.set('id', id)
      },
      onUpdated({form}) {
        if(form.message) {
          toast.success(form.message)
          dialogOpen = false;
        }
          
      },
      onError({result}) {
        dialogOpen = false;
        toast.error(result.error.message)
      },
      delayMs: 200,
      timeoutMs: 8000,
      invalidateAll: "force"
  });

  const { form: formDataEdit, enhance: enhanceEdit , delayed: delayedEdit  } = editFormEle;

  let dialogOpen = false;

</script>
   
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-8 w-8 p-0"
    >
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item on:click={() => {
        formDataEdit.set({shortcut, url, id})
        dialogOpen = true
      }}>
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <form use:enhance method="POST" action="?/delete">
          <button disabled={$delayed} type="submit">Delete</button>
        </form>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <a href={url} target="_blank">
        <DropdownMenu.Item>
          Visit
        </DropdownMenu.Item>
      </a>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/edit" method="POST" use:enhanceEdit class="w-full flex flex-col gap-3">
      <Form.Field form={editFormEle} name="shortcut">
        <Form.Control let:attrs>
          <Form.Label>Shortcut</Form.Label>
          <Input disabled={$delayedEdit} {...attrs} bind:value={$formDataEdit.shortcut} />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field form={editFormEle} name="url">
        <Form.Control let:attrs>
          <Form.Label>URL</Form.Label>
          <Input disabled={$delayedEdit} {...attrs} bind:value={$formDataEdit.url} />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button disabled={$delayedEdit} class="w-full">Submit</Form.Button>
    <Dialog.Footer>
    </Dialog.Footer>
  </form>
  </Dialog.Content>
</Dialog.Root>