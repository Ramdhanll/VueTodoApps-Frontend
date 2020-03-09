<template>
  <div>
    <input type="text" 
      class="todo-input" 
      placeholder="What needs to be done"
      v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <TodoItem v-for="(todo,index) in todosFiltered" 
      :key="todo.id" 
      :todo="todo" 
      :index="index"
      :checkAll="!anyRemaining">

    </TodoItem>
    </transition-group>


    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"/>
      <todo-items-remaining :remaining="remaining" />

    </div>

    <div class="extra-container">
      <todo-filter :filter="filter" />
      <!-- <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted"> Clear Completed</button>
        </transition>
      </div> -->
      <todo-clear-completed :showClearCompletedButton="showClearCompletedButton" />
    </div>

  </div>
</template>

<script>

import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFilter from './TodoFilter'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
  },
  data(){
    return {
      newTodo : '',
      idForTodo : 3,
      beforeEditCache : '',
      filter : 'all',
      todos: [
        {
          'id' : 1,
          'title' : 'Finish Vue Screencast',
          'completed' : false,
          'editing' : false
        },
        {
          'id' : 2,
          'title' : 'Take Over World',
          'completed' : false,
          'editing' : false

        }
      ]
    }
  },
  created() {
    this.$Fire.$on('removedTodo', (index) => this.removeTodo(index))
    this.$Fire.$on('finishEdit', (data) => this.finishEdit(data))
    this.$Fire.$on('checkAllTodos', () => this.checkAllTodos())
    this.$Fire.$on('filterChanged', (filter) => {
      this.filter = filter;
      this.todosFiltered;
      })
    this.$Fire.$on('clearCompleted', () => this.clearCompleted())
  },
  beforeDestroy() {
    this.$Fire.$off('removedTodo', (index) => this.removeTodo(index))
    this.$Fire.$off('finishEdit', (data) => this.finishEdit(data))
    this.$Fire.$off('checkAllTodos', () => this.checkAllTodos())
    this.$Fire.$off('filterChanged', (filter) => {
      this.filter = filter;
      this.todosFiltered;
      })
    this.$Fire.$off('clearCompleted', () => this.clearCompleted())
  },
  computed: {
    remaining(){
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(){
      return this.remaining != 0; 
    },
    todosFiltered(){
      if (this.filter == 'all') {
        return this.todos;
      } else if (this.filter == 'active'){
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == 'completed'){
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showClearCompletedButton(){
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo(){
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.todos.push({
        id: this.idForTodo,
        title : this.newTodo,
        completed : false
      })

      this.newTodo = '',
      this.idForTodo++
    },
    removeTodo(index){
      this.todos.splice(index,1);
    },
    checkAllTodos(){
      this.todos.forEach(todo => {
        todo.completed = event.target.checked;
      });
    },
    clearCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishEdit(data){
      this.todos.splice(data.index, 1, data.todo);

    }
  },
  
}
</script>

<style lang="scss"> // lang="scss" => package scss yang baru dipasang "npm install sass-loader node-sass --save"

  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left { // later
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: rgb(0, 255, 0);
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background : lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
