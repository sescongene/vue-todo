<template>
  <UCard class="mx-auto card-width">
    <template #header>Sign Up</template>
    <UForm @submit="register" :state="state">
      <UInput
        class="mb-3 mt-3"
        v-model="state.name"
        label="Name"
        type="text"
        size="lg"
        required
        placeholder="Enter your name"
      />
      <UInput
        class="mb-3"
        v-model="state.email"
        label="Email"
        type="email"
        size="lg"
        required
        placeholder="Enter your email"
      />
      <UInput
        class="mb-3"
        v-model="state.password"
        label="Password"
        type="password"
        size="lg"
        required
        placeholder="Enter your password"
      />
      <UInput
        class="mb-3"
        v-model="state.password_confirmation"
        label="Confirm Password"
        type="password"
        size="lg"
        required
        placeholder="Confrim password"
      />
      <UButton type="submit">Create Account</UButton>
    </UForm>
    <template #footer>
      Already have an account?
      <UButton to="/login" class="mr-2" size="xs">Sign In</UButton>
    </template>
  </UCard>
</template>

<script setup>
import createUser from "~/graphql/mutations/register";
const state = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const { onLogin } = useApollo();

const register = async (event) => {
  const { mutate, onDone, onError } = useMutation(createUser);

  const variables = {
    name: state.name,
    email: state.email,
    password: state.password,
    password_confirmation: state.password_confirmation,
  };

  onDone(({ data }) => {
    onLogin(data.register.token);
    navigateTo("/");
  });

  await mutate(variables);
};
</script>

<style lang="scss" scoped>
.card-width {
  width: 500px;
}
</style>
