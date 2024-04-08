import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ClientResponseError } from "pocketbase";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) {
    redirect(303, "/login");
  }
  try {
    const result = await locals.pb
      .collection("links")
      .getFirstListItem(`shortcut="${params.shortcut}"`);

    if (!result) {
      error(404, {
        message: `${params.shortcut} not found!`,
      });
    }

    return {
      redirect: result.url,
    };
  } catch (e) {
    if (e instanceof ClientResponseError) {
      if (e.status == 404) {
        error(404, `shortcut ${params.shortcut} not found!`);
      }
    }
    console.log(e);
    error(500, "An Error Occurred!");
  }
};
