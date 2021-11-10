import Vue from 'vue'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  plugins: [createPersistedState()],
  mutations: {
    CREATE_TODO({ todos }, todoItem){
      todos.push(todoItem)
    },
    DELETE_TODO({todos}, todoItem){
      const index = todos.indexOf(todoItem)
      todos.splice(index, 1)
    },
    UPDATE_TODO_STATUS(state, todoItem){
      state.todos = state.todos.map(todo => {
        if (todo === todoItem) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          }
        }
        return todo
      })
    }
  },
  actions: {
    createTodo({ commit }, todoItem){
      commit('CREATE_TODO', todoItem)
    },
    deleteTodo({commit}, todoItem){
      commit('DELETE_TODO', todoItem)
    },
    updateTodoStatus({commit}, todoItem){
      commit('UPDATE_TODO_STATUS', todoItem)
    }
  },
  getters: {
    completedTodosCount(state){
      return state.todos.filter(todo => todo.isCompleted).length
    },
    uncompletedTodosCount(state){
      return state.todos.filter(todo => !todo.isCompleted).length
    },
    allTodosCount(state){
      return state.todos.length
    }
  },
  modules: {
  }
})
