import { defineStore } from "pinia";
import toggleTodo from "~/graphql/mutations/toggleTodo";
import createTodo from "~/graphql/mutations/createTodo";

import deleteTodo from "~/graphql/mutations/deleteTodo";
import todosQuery from "~/graphql/queries/todos";
import deleteDoneTodo from "~/graphql/mutations/deleteDoneTodo";
import deleteAllTodo from "~/graphql/mutations/deleteAllTodo";

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      fetching: false,
      formLoading: false,
      title: "",
      list: [],
      todo: {
        title: "",
        status: "todo",
      },
    };
  },
  actions: {
    async create(title) {
      const { mutate, onDone, onError } = useMutation(createTodo);
      this.formLoading = true;
      onDone(({ data }) => {
        this.list = [...this.list, data.createTodo];
        this.formLoading = false;
      });

      onError((error) => {
        this.formLoading = false;
      });

      await mutate({ title: title });
    },

    async delete(id) {
      const { mutate, onDone } = useMutation(deleteTodo);

      await mutate({ id: id });
      this.list = this.list.filter((t) => t.id !== id);
    },

    async toggle(id) {
      const { mutate, onDone } = useMutation(toggleTodo);
      onDone(({ data }) => {
        this.list = this.list.map((t) => {
          if (t.id === id) {
            return data.toggleTodo;
          }
          return t;
        });
      });
      await mutate({ id: id });
    },

    async deleteDone() {
      const { mutate, onDone } = useMutation(deleteDoneTodo);
      onDone(({ data }) => {
        this.list = data.deleteDoneTodo;
      });
      await mutate();
    },

    async deleteAll() {
      const { mutate, onDone } = useMutation(deleteAllTodo);
      onDone(() => {
        this.list = [];
      });
      await mutate();
    },

    async fetch() {
      this.fetching = true;
      const { onResult, loading, onError } = useQuery(todosQuery);
      onResult(({ data }) => {
        if (!loading.value) {
          this.list = data.todos.data;
        }
        this.fetching = false;
      });

      onError((error) => {
        this.fetching = false;
      });
    },
  },
});
