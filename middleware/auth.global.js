import me from "~/graphql/queries/me";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicPath = to.path === "/login" || to.path === "/register";

  const { getToken, onLogout } = useApollo();

  const token = await getToken();

  if (publicPath) {
    return token ? navigateTo("/") : null;
  }

  if (!token) {
    return navigateTo("/login");
  }

  const { onError, onResult, result, query } = useQuery(me);

  onError(async (error) => {
    await onLogout();
    if (publicPath) {
      return;
    } else {
      return navigateTo("/login");
    }
  });

  onResult(async (data) => {
    if (data.loading) {
      return;
    }
    if (!data?.data?.me?.id) {
      await onLogout();
      return publicPath ? null : navigateTo("/login");
    } else {
      return publicPath ? navigateTo("/") : null;
    }
  });
  await query;
  return;
});
