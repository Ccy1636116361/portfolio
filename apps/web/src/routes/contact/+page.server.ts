import { fail, message, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { contactFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { createTransport } from "nodemailer";
import { GMAIL_APP_PASS } from "$env/static/private";

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

    const mailMessage = {
      from: "sender@server.com",
      to: "ccy3691@gmail.com",
      subject: "Message Recived via website!",
      html: `${messageText}<br><br>sent from: ${name}<br>contact email: ${email}`,
    };

    try {
      const transporter = createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ccy3691@gmail.com",
          pass: GMAIL_APP_PASS,
        },
      });

      await transporter.sendMail(mailMessage);

      return message(form, "Message Sent!");
    } catch (e) {
      console.error(e);
      error(500, "An Error Occurred! Message was not sent!");
    }
  },
};
