export default defineNuxtRouteMiddleware(
  async (to, from) => {
    const user = useSupabaseUser();

    const userHasAccess =
      user.value?.user_metadata.courses?.includes(1);

    if (
      userHasAccess ||
      to.params.chapterSlug === '1-chapter-1'
    ) {
      return;
    } else if (user.value && !userHasAccess) {
      // We're logged in to Github but can't access the course
      // Log us out of Github and redirect to the login page
      const { auth } = useSupabaseClient();
      await auth.signOut();
    }

    return navigateTo(`/login?redirectTo=${to.path}`);
  }
);
