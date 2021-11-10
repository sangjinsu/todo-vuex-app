<template>
  <div>
    <input type="text" v-model.trim="todoTitle" @keyup.enter="createTodo" />
    <button @click="createTodo">+</button>
  </div>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return {
      todoTitle: null,
    };
  },
  methods: {
    createTodo() {
      const todoItem = {
        title: this.todoTitle,
        isCompleted: false,
        date: new Date().getTime(),
      };
      if (todoItem.title) {
        this.$store.dispatch("createTodo", todoItem);
      }
      this.clearInput();
    },
    clearInput() {
      this.todoTitle = null;
    },
  },
};
</script>