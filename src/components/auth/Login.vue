<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">

      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="email">Username/Email</label>
        <input type="email" name="username" id="username" class="login-input" v-model="username">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" :disabled="loading">
          <div class="lds-ring-container" v-if="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
          Login
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name:'login',
  props: {
    dataSuccessMessage: {
      type: Boolean,
    }
  },
  created() {
    if(this.dataSuccessMessage == true){
      window.toast.fire({
      icon: 'success',
      title: 'Registered successfully'
    })
      this.dataSuccessMessage = false;
    }
  },
  data(){
    return{
      username: '',
      password: '',
      serverError: '',
      loading: false
    }
  },
  methods: {
    login(){
      this.loading = true;
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        this.loading = false;
        this.$router.push({name: 'todo'})
        response;
      })
      .catch(error => {
        this.loading = false;
        this.serverError = error.response.data;
        this.password = '';
      });
    }
  },
}
</script>

<style>
  .server-error {
        margin-bottom: 12px;
        font-size: 16px;
        padding: 10px 16px;
        color: #A94442;
        background: #F3DEDE;
        border-radius: 4px;
      }
</style>