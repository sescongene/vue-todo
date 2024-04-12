<template>
  <div class="flex content-end justify-end">
    <UBadge size="sm"
      >Tasks
      <span class="ml-1 bg-white rounded-full count">{{
        todoStore.list.length
      }}</span>
    </UBadge>
    <UBadge size="sm" class="ml-2"
      >Tasks Done
      <span class="ml-1 bg-white rounded-full count">{{ taskDone }}</span>
    </UBadge>
    <UBadge
      size="sm"
      class="ml-2 cursor-pointer bg-red-600"
      color="orange"
      v-if="taskDone > 0"
      @click="deleteDone"
    >
      Delete Done
      <UIcon name="trash" class="ml-1 i-heroicons-trash-20-solid text-white" />
    </UBadge>
    <UBadge
      size="sm"
      class="ml-2 cursor-pointer"
      color="red"
      v-if="todoStore.list.length"
      @click="deleteAll"
    >
      Delete All
      <UIcon name="trash" class="ml-1 i-heroicons-trash-20-solid text-white" />
    </UBadge>
  </div>
</template>
<script setup>
const toast = useToast();
const todoStore = useTodoStore();
const taskDone = computed(
  () => todoStore.list.filter((todo) => todo?.status === "completed").length
);

const deleteAll = async () => {
  await todoStore.deleteAll();

  toast.add({
    title: "Success",
    status: "Success",
    description: "All tasks have been deleted",
  });
};
const deleteDone = async () => {
  await todoStore.deleteDone();

  toast.add({
    title: "Success",
    status: "Success",
    description: "All done tasks have been deleted",
  });
};
</script>
<style lang="scss" scoped>
.count {
  padding: 2px 6px;
  line-height: 1;
}
</style>
