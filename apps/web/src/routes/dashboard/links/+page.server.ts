import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {
  deleteLinksFormSchema,
  editLinksFormSchema,
  linksFormSchema,
} from "./schema";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, "/login");
  }
  try {
    const result = await locals.pb
      .collection("links")
      .getFullList({ sort: "-created" });

    return {
      links: result,
      addForm: await superValidate(zod(linksFormSchema), { id: "add" }),
      delForm: await superValidate(zod(deleteLinksFormSchema), {
        id: "delete",
      }),
      editForm: await superValidate(zod(editLinksFormSchema), {
        id: "edit",
      }),
    };
  } catch (e) {
    console.error(e);
    error(500, "An Error Occurred!");
  }
};

export const actions: Actions = {
  create: async (event) => {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(event, zod(linksFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      await event.locals.pb.collection("links").create(form.data);

      return message(form, "Link Added!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred!");
    }
  },
  delete: async (event) => {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(event, zod(deleteLinksFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { id } = form.data;
    try {
      await event.locals.pb.collection("links").delete(id);

      return message(form, "Link Deleted!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! Link was not deleted!");
    }
  },
  edit: async (event) => {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(event, zod(editLinksFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { id, ...updateObj } = form.data;
    try {
      await event.locals.pb.collection("links").update(id, updateObj);

      return message(form, "Link Updated!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! Link was not updated!");
    }
  },
};
