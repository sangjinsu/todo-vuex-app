<template>
  <div>
    <todo-list-item
      v-for="todo in $store.state.todos"
      :key="todo.date"
      :todo="todo"
    ></todo-list-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoListItem from "@/components/TodoListItem";

export default {
  name: "TodoList",
  components: {
    TodoListItem,
  },
  // 아래 예시와 동일
  // computed: {
  //   todos() {
  //     return this.$store.state.todos;
  //   },
  // },
  computed: {
    ...mapState(["todos"]),
  },
};
</script>