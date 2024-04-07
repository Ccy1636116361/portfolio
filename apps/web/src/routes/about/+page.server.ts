import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const result = await locals.pb
      .collection("about")
      .getList(1, 1, { sort: "-created" });
    const lastItem = result.items[0];

    return {
      about: lastItem.about_text,
    };
  } catch (e) {
    console.error(e);
    error(500, "An Error Occurred!");
  }
};
