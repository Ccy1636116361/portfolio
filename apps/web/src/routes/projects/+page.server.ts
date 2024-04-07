import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Project } from "$lib/models/Project";
import { POCKETBASE_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const results = await locals.pb
      .collection("projects")
      .getFullList<Project>({
        expand: "tags",
        sort: "-created",
      });

    return {
      projects: results,
      imgUrl: POCKETBASE_URL,
    };
  } catch (e) {
    console.error(e);
    error(500, "An Error Occurred!");
  }
};
