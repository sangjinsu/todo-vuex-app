<template>
  <div id="app">
    <h1>Todo List</h1>
    <h2>All todos: {{ allTodosCount }}</h2>
    <h2>completed Todo: {{ completedTodosCount }}</h2>
    <h2>uncompleted Todo: {{ uncompletedTodosCount }}</h2>
    <todo-list></todo-list>
    <todo-form></todo-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";

export default {
  name: "App",
  components: {
    TodoList,
    TodoForm,
  },
  computed: {
    ...mapGetters([
      "completedTodosCount",
      "uncompletedTodosCount",
      "allTodosCount",
    ]),
    // completedTodosCount() {
    //   return this.$store.getters.completedTodosCount;
    // },
    // uncompletedTodosCount() {
    //   return this.$store.getters.uncompletedTodosCount;
    // },
    // allTodosCount() {
    //   return this.$store.getters.allTodosCount;
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
