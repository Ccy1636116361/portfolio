<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { zodClient } from "sveltekit-superforms/adapters";
  import { superForm } from "sveltekit-superforms";
  import  { linksFormSchema } from "./schema";
  import type { PageData } from "./$types";
  import { toast } from "svelte-sonner";
  import { Input } from '$lib/components/ui/input';
  import { createTable, Render, Subscribe, createRender, HeaderRow, BodyRow, type TableAttributes, type TableBodyAttributes } from "svelte-headless-table";
  import type { AnyPlugins } from "svelte-headless-table/plugins";
  import { readable, type Readable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import type { RecordModel } from 'pocketbase';

  export let data: PageData;

  const form = superForm(data.addForm, {
      validators: zodClient(linksFormSchema),
      onUpdated({form}) {
          if(form.message)
              toast.success(form.message)
      },
      onError({result}) {
        toast.error(result.error.message)
      },
      delayMs: 200,
      timeoutMs: 8000,
      invalidateAll: 'force'
  });

  const { form: formData, enhance ,allErrors, delayed  } = form;

  let headerRows: Readable<HeaderRow<RecordModel, AnyPlugins>[]>, 
  pageRows: Readable<BodyRow<RecordModel, AnyPlugins>[]>, 
  tableAttrs: Readable<TableAttributes<RecordModel, AnyPlugins>>, 
  tableBodyAttrs: Readable<TableBodyAttributes<RecordModel, AnyPlugins>>;

  $: if(data.links) initTable();

  function initTable() {
    return new Promise<void>((res) => {
      const table = createTable(readable(data.links));

      const columns = table.createColumns([
        table.column({
          accessor: "id",
          header: "ID",
        }),
        table.column({
          accessor: "shortcut",
          header: "Shortcut",
        }),
        table.column({
          accessor: "url",
          header: "URL",
        }),
        table.column({
          accessor: ({ id, url, shortcut }) => {return {id, url, shortcut}},
          header: "",
          cell: ({ value }) => {
            return createRender(DataTableActions, { id: value.id, url: value.url, shortcut: value.shortcut, delForm: data.delForm, editForm: data.editForm });
          }})
      ]);

      const obj = table.createViewModel(columns);
      headerRows = obj.headerRows;
      pageRows = obj.pageRows;
      tableAttrs = obj.tableAttrs;
      tableBodyAttrs = obj.tableBodyAttrs;

      res();
    })
  }

</script>

<div class="flex flex-col gap-4">
  <div>

    <form method="POST" action="?/create" use:enhance class="w-full flex gap-3 flex-col">
      <Form.Field {form} name="shortcut">
        <Form.Control let:attrs>
          <Form.Label>Shortcut</Form.Label>
          <Input disabled={$delayed} {...attrs} bind:value={$formData.shortcut} />
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="url">
        <Form.Control let:attrs>
          <Form.Label>Url</Form.Label>
          <Input disabled={$delayed} {...attrs} bind:value={$formData.url} />
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
  </div>
  <div>
    {#await initTable()}
      <div class="flex w-full justify-center">
        Loading...
      </div>
    {:then value}
      <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
          <Table.Header>
            {#each $headerRows as headerRow}
              <Subscribe rowAttrs={headerRow.attrs()}>
                <Table.Row>
                  {#each headerRow.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                      <Table.Head {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Head>
                    </Subscribe>
                  {/each}
                </Table.Row>
              </Subscribe>
            {/each}
          </Table.Header>
          <Table.Body {...$tableBodyAttrs}>
            {#each $pageRows as row (row.id)}
              <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                <Table.Row {...rowAttrs}>
                  {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                      <Table.Cell {...attrs}>
                        <Render of={cell.render()} />
                      </Table.Cell>
                    </Subscribe>
                  {/each}
                </Table.Row>
              </Subscribe>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    {/await}
  </div>
</div>

