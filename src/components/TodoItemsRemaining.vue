<template>
  <div>
    <div>{{ remaining }} items left</div>
  </div>
</template>

<script>
export default {
  name: 'todo-items-remaining',
  computed: {
    remaining(){
      return this.$store.getters.remaining;
    }
  },
}
</script>

<style>

</style>