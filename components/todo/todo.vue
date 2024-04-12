<template>
  <div
    class="p-3 bg-slate-800 mb-2 rounded-sm flex justify-between space-x-2 items-center"
  >
    <UCheckbox v-model="complete" :label="todo.title" onchange="" />
    <div>
      <UButton size="sm" @click="deleteItem(todo.id)" color="red">
        <UIcon name="trash" class="i-heroicons-trash-20-solid text-white" />
      </UButton>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    todo: {
      type: Object,
      default: {
        label: "",
        complete: false,
      },
    },
  },
  setup(props, { emit }) {
    const todoStore = useTodoStore();
    const toast = useToast();

    const complete = computed({
      get: () => props.todo.status === "completed",
      set: async (value) => {
        await todoStore.toggle(props.todo.id);
        toast.add({
          title: "Success",
          description: `To-do has been updated`,
          status: "success",
        });
      },
    });

    const deleteItem = async (id) => {
      await todoStore.delete(id);
      toast.add({
        title: "Success",
        description: `To-do has been deleted`,
        status: "success",
      });
    };

    return {
      complete,
      deleteItem,
    };
  },
};
</script>
