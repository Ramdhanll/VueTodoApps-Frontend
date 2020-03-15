<template>
  <div class="login-form">
    <h2 class="login-heading">Register</h2>

    <div v-if="serverErrors" class="server-error">
      <div v-for="(serverError, index) in serverErrors" :key="index">
        {{ serverError[0] }}
      </div>
    </div>

    <ValidationObserver v-slot="{handleSubmit}">
      <form @submit.prevent="handleSubmit(register)">
        <ValidationProvider rules="required" v-slot="{ errors }" class="form-control">
          <label for="name">Name</label>
          <input type="text" 
                  name="name" 
                  id="name" 
                  class="login-input" 
                  v-model="name">
          <span class="msg-pass">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider rules="email|required" v-slot="{ errors }" class="form-control">
          <label for="email">Email</label>
          <input type="text" 
                  name="email" id="email" 
                  class="login-input" 
                  v-model="email">
        <span class="msg-pass">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider rules="password|required" v-slot="{ errors }"  class="form-control mb-more">
          <label for="password">Password</label>
          <input type="password" 
                  name="password" 
                  id="password" 
                  class="login-input" 
                  v-model="password">
        <span class="msg-pass">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="form-control">
          <button type="submit" :disabled="invalid" class="btn-submit">Create Account</button>
        </div>
    </form>
      </ValidationObserver>
  </div>
</template>

<script>

export default {
  name:'register',
  data(){
    return{
      name: '',
      email: '',
      password: '',
      serverErrors: ''
    }
  },
  methods: {
    register(){
      this.$store.dispatch('register',{
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.$router.push({name: 'login'})
        response;
      })
      .catch(error => {
        this.serverErrors =  error.response.data.errors;
      });
    }
  },
}
</script>

<style>
.msg-pass {
  font-size: 20px;
  color: red;
}

.form-control {
    margin-bottom: 16px;
  }

.input-error {
  font-size: 16px;
  color: #a94442;
}
</style>