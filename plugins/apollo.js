export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    // access cookie for auth
    const cookie = useCookie(`apollo:${client}.token`);

    // apply apollo client token
    token.value = cookie.value ?? null;
  });
});
