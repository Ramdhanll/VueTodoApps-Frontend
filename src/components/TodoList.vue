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
      <todo-check-all/>
      <todo-items-remaining/>

    </div>

    <div class="extra-container">
      <todo-filter/>
      <todo-clear-completed/>
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
    }
  },
  created(){
    this.$store.dispatch('retriveTodos');
  },
  computed: {
    remaining(){
      return this.$store.getters.remaining;
    },
    anyRemaining(){
      return this.$store.getters.anyRemaining;
    },
    todosFiltered(){
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedButton(){
      return this.$store.getters.showClearCompletedButton;
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

      this.$store.dispatch('addTodo',{
        id: this.idForTodo,
        title : this.newTodo
      })

      this.newTodo = '',
      this.idForTodo++
    },
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
    padding: 4px;
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
