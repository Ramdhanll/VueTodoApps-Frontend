<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>

    <!-- <div v-if="successMessage" class="success-message">{{successMessage}}</div> -->

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
          <button type="submit" class="btn-submit">Create Account</button>
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
      serverErrors: '',
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
        this.successMessage = "Registered Successfully"
        this.$router.push({name: 'login', params: {
            dataSuccessMessage: true}
            })
        response;
      })
      .catch(error => {
        this.serverErrors =  error.response.data.errors;
      });
    }
  }
}
</script>

<style lang="scss">

.msg-pass {
  font-size: 20px;
  color: red;
}


.input-error {
  font-size: 16px;
  color: #a94442;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  margin-bottom: 12px;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 4px;
}
</style>