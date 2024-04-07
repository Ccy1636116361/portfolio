import { fail, message, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { contactFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { MAILTRAP_TOKEN } from "$env/static/private";
import { MailtrapClient } from "mailtrap";

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
      const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

      const sender = {
        email: "mailtrap@demomailtrap.com",
        name: "Portfilio website",
      };
      const recipients = [
        {
          email: "ccy3691@gmail.com",
        },
      ];

      await client.send({
        from: sender,
        to: recipients,
        subject: "Message Recived via website!",
        html: `${messageText}<br><br>sent from: ${name}<br>contact email: ${email}`,
        category: "Integration Test",
      });

      return message(form, "Message Sent!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! Message was not sent!");
    }
  },
};
