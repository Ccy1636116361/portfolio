import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Project } from "$lib/models/Project";
import { POCKETBASE_URL } from "$env/static/private";
import type { Resume } from "$lib/models/Resume";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const results = await locals.pb.collection("resumes").getFullList<Resume>({
      filter: "active = true",
    });

    return {
      resume: results[0],
      imgUrl: POCKETBASE_URL,
    };
  } catch (e) {
    console.error(e);
    error(500, "An Error Occurred!");
  }
};
