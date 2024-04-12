<template>
  <div class="flex mb-3">
    <UInput
      class="mr-2 grow"
      v-model="title"
      label="Password"
      type="text"
      size="lg"
      placeholder="Create new task"
    />
    <UButton type="submit" @click="createTodo(title)" :disabled="loading">
      <UIcon name="plus-solid" class="i-heroicons-plus-20-solid text-white" />
    </UButton>
  </div>
</template>
<script>
export default {
  setup() {
    const toast = useToast();
    const todoStore = useTodoStore();
    const loading = computed(() => todoStore.formLoading);
    const title = ref("");

    const createTodo = async (t) => {
      await todoStore.create(t);
      toast.add({
        title: "Success",
        description: `To-do has been created`,
        status: "success",
      });
      title.value = "";
    };
    return {
      title,
      createTodo,
      loading,
    };
  },
};
</script>
