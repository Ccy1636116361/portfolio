import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import type { User } from "$lib/models/User";
import { serializeNonPOJOs } from "$lib/utils";
import { redirect, type Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(env.POCKETBASE_URL);
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs<User>(
      event.locals.pb.authStore.model as User
    );
  } else {
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ secure: dev })
  );

  if (event.url.pathname.includes("/dashboard") && !event.locals.user) {
    redirect(307, "/");
  }

  return response;
};
