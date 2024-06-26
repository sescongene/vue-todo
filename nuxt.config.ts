require("dotenv").config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/apollo", "@pinia/nuxt"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  apollo: {
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",

    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || "http://localhost/graphql",
        tokenStorage: "cookie",
      },
    },
  },
  ui: {},
});
