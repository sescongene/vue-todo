export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:error", (error) => {
    const toast = useToast();
    const error_message = error.response.errors
      .map((e) => e.message)
      .join("\n");

    try {
      const validation_messages = error.response?.errors.map((e) => {
        return Object.values(e.extensions.validation || {});
      });
      if (validation_messages) {
        toast.add({
          title: "Error",
          description: validation_messages.join("\n"),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {}

    toast.add({
      title: "Error",
      description: error_message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  });
});
