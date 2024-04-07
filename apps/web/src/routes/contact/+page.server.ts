import { fail, message, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { contactFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { MAILTRAP_TOKEN } from "$env/static/private";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    form: await superValidate(zod(contactFormSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(contactFormSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { name, email, message: messageText } = form.data;

    try {
      await fetch("https://send.api.mailtrap.io/api/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: {
            email: "mailtrap@demomailtrap.com",
            name: "Portfolio",
          },
          to: [{ email: "ccy3691@gmail.com" }],
          subject: "Message Recived via website!",
          html: `${messageText}<br><br>sent from: ${name}<br>contact email: ${email}`,
          category: "Portfolio Website",
        }),
      });

      return message(form, "Message Sent!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! Message was not sent!");
    }
  },
};
