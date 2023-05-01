import { fail, redirect, type RequestEvent } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../$types";
import type { Actions } from "./$types";

export const load = (async ({ locals }) => {
  // Already authenticated user are redirected to the home page
  if (await locals.getSession()) {
    throw redirect(307, '/');
  }
}) satisfies LayoutServerLoad;

export const actions = {
  signup: async (event: RequestEvent) => {
    const formData = await event.request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await event.locals.supabase.auth.signUp({
      email,
      password
    })

    if (error && error.status) {
      console.error(`${error.status} : ${error.message}`);
      console.error(`${error.stack}`);
      return fail(error.status)
    }

    return {
      success: true
    }
  }
} satisfies Actions
