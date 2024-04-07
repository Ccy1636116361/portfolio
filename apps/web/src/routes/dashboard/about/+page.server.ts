import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { aboutFormSchema } from "./schema";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    if (!locals.user) {
      throw redirect(303, "/login");
    }

    const result = await locals.pb
      .collection("about")
      .getList(1, 1, { sort: "-created" });
    const lastItem = result.items[0];

    return {
      id: lastItem.id,
      form: await superValidate(
        { text: lastItem.about_text },
        zod(aboutFormSchema)
      ),
    };
  } catch (e) {
    console.error(e);
    error(500, "An Error Occurred!");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(aboutFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { text, id } = form.data;
    try {
      await event.locals.pb
        .collection("about")
        .update(id, { about_text: text });

      return message(form, "About updated successfully!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! About was not updated!");
    }
  },
};
