<template>
  <UCard class="mx-auto card-width">
    <template #header>
      <todo-actions />
    </template>

    <div v-if="fetching">
      <USkeleton class="h-16 mb-2" />
      <USkeleton class="h-16 mb-2" />
      <USkeleton class="h-16 mb-2" />
    </div>

    <div v-if="todos.length == 0">No To-do available</div>
    <draggable
      v-if="todos.length > 0"
      v-model="todos"
      group="todos"
      @start="dragging = true"
      @end="dragging = false"
      item-key="id"
    >
      <template #item="{ element }">
        <todo :todo="element" />
      </template>
    </draggable>

    <template #footer>
      <todo-form />
      <div class="flex">
        <UButton size="xs" @click="logout">Logout</UButton>
      </div>
    </template>
  </UCard>
</template>

<script>
import draggable from "vuedraggable";
import { useTodoStore } from "@/stores/todo";

export default {
  components: {
    draggable,
  },
  setup() {
    const { onLogout } = useApollo();
    const todoStore = useTodoStore();
    const dragging = ref(false);
    const formLoading = ref(todoStore.formLoading);
    const todos = computed(() => todoStore.list);
    const fetching = computed(() => todoStore.fetching);
    const logout = () => {
      onLogout();
      todoStore.$reset();

      navigateTo("/login");
    };
    todoStore.fetch();

    return { logout, dragging, todos, formLoading, fetching };
  },
};
</script>

<style lang="scss" scoped>
.card-width {
  width: 550px;
}
</style>
