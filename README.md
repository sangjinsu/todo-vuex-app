# todo-vuex-app

### vuex 의 상태관리

![vuex](README.assets/vuex.png)

- State

  - 중앙에서 관리하는 모든 상태 정보
  - Vuex 는 single state tree 사용한다 
  - 단일 객체는 모든 애프리케이션 상태를 포함하는 원본 소스 역할을 한다 
  - 애플리케이션 마다 한 저장소만 소유하게 된다 

  - 특정  state 를 중앙에서 관리한다 
  - state 변경시 공유되는 여러 컴포넌트에 자동 렌더링
  - 컴포넌트느 vuex store 에서 state 정보를 가져와 사용한다 

- Mutations

  - state 를 변경하는 유일한 방법
  - handler 함수는 반드시 동기적이어야 한다 
    - 비동기적 로직은 state 가 변화되는 시점이 의도한 것과 달라질 수 있다 
    - 콜백이 실제로 호출될 시기를 알 수 있는 방법이 없다 

  - 첫번째 인자는 항상 state 이다 
  - Actions 에서 commit() 메서드에 의해 호출된다 

- Actions

  - vs Mutations

    - state 변경 대신 mutations commit() 메서드로 호출해서 실행

    - mutation 가 달리 비동기 작업이 포함될 수 있다 

      (Backend API와 통신하여 Data Fetching 등의 작업 수행)

  - context 객체 인자를 받는다 
    - context 객체를 통해 store.js 파일 내에 있는 모든 요소의 속성 접근과 메서드 호출이 가능하다 
    - 하지만 state 를 직접 변경하지 않는다 

  - 컴포넌트에서 dispatch() 메서드에 의해 호출된다 
  - **`state 는 역할 분리를 위해 Mutations 를 통해서 조작해야만 한다`**

- Getters
  - store의 상태를 기반하는 계산 값
  - 실제 상태를 변경하지 않으며 computed 속성과 유사하다 

### store/index.js 전체 코드 

```js
import Vue from 'vue'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
   
    ]
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

```



### Component Binding Helper 사용과 비교 

 #### TodoList

```js
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
```

### TodoListItem

```js
import { mapActions } from "vuex";
export default {
  name: "TodoListItem",
  props: {
    todo: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodoStatus"]),
    // deleteTodo() {
    //   this.$store.dispatch("deleteTodo", this.todo);
    // },
    // updateTodoStatus() {
    //   this.$store.dispatch("updateTodoStatus", this.todo);
    // },
  },
};
```



### vuex-persistedstate

- 자동으로 브라우저 localStorage 에 저장해주는 라이브러리

```js
import Vue from 'vue'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  plugins: [createPersistedState()],
```

