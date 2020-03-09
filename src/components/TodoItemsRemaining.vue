<template>
  <div>
    <div>{{ remaining }} items left</div>
  </div>
</template>

<script>
export default {
  name: 'todo-items-remaining',
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>