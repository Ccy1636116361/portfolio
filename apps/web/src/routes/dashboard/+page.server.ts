import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  if (url.pathname === "/dashboard") {
    throw redirect(303, "/dashboard/about");
  }
};
