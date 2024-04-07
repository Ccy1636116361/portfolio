import type { Actions, PageServerLoad } from "./$types.js";
import { setError, superValidate } from "sveltekit-superforms";
import { loginFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { error, fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, "/dashboard");
  }

  return {
    form: await superValidate(zod(loginFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { email, password } = form.data;
    try {
      await event.locals.pb
        .collection("users")
        .authWithPassword(email, password);

      if (!event.locals.pb.authStore.model?.verified) {
        return setError(form, "", "Email not verified!");
      }
    } catch (e) {
      throw error(500, "Something went wrong!");
    }

    throw redirect(303, "/dashboard");
  },
};
