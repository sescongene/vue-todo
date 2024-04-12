<template>
  <UCard class="mx-auto card-width">
    <template #header> Login </template>
    <UForm @submit="login" :state="state">
      <UAlert v-if="invalid" type="error" title="Invalid Credentials" />
      <UInput
        class="mb-3 mt-3"
        v-model="state.email"
        label="Email"
        type="email"
        size="lg"
        :disabled="isLoading"
        placeholder="Enter your emails"
      />
      <UInput
        class="mb-3"
        v-model="state.password"
        label="Password"
        type="password"
        size="lg"
        :disabled="isLoading"
        placeholder="Enter your password"
      />
      <UButton type="submit" :disabled="isLoading" class="mr-2">Login</UButton>
      <UButton to="/register" color="gray" class="mr-2">Sign Up</UButton>
    </UForm>
  </UCard>
</template>

<script>
import { ref } from "vue";
import loginMutation from "~/graphql/mutations/login";

export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const isLoading = ref(false);
    const invalid = ref(false);

    const { mutate, onDone, onError } = useMutation(loginMutation);

    const { onLogin } = useApollo();

    const login = async () => {
      isLoading.value = true;
      const variables = {
        email: state.email,
        password: state.password,
      };

      onDone(({ data }) => {
        onLogin(data.login.token);
        navigateTo("/");
      });

      onError((error) => {
        invalid.value = true;
      });
      await mutate(variables);
      isLoading.value = false;
    };

    return {
      state,
      login,
      isLoading,
      invalid,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-width {
  width: 500px;
}
</style>
