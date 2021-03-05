<template>
  <div class="login-area bg-white mx-auto px-2 py-4">
      <small class="d-block text-center mb-3"> {{$t(`__loginTitle`)}} </small>
      <form @submit.prevent="login">
        <validation-observer v-slot="{ valid }">
          <div class="form-group position-relative">
            <validation-provider rules='email|required' v-slot="{errors, classes}">
              <label for="email" class="position-absolute text-secondary"
              style="z-index: 1200; right: 28px; top: 3px;">
                <i class="fas fa-envelope"></i>
              </label>
              <input id="email" type="email" placeholder="Email" v-focus v-model="user.email"
              class="form-control rounded-0 form-control-sm" :class="classes">
              <small class="text-danger">{{errors[0]}}</small>
            </validation-provider>
          </div>
          <div class="form-group position-relative">
            <validation-provider rules='required' v-slot="{errors, classes}">
              <label for="password" class="position-absolute text-secondary"
              style="z-index: 1200; right: 28px; top: 3px;">
                <i class="fas fa-lock"></i>
              </label>
              <input id="password" type="password" placeholder="Password" v-model="user.password"
              class="form-control rounded-0 form-control-sm" :class="classes">
              <small class="text-danger">{{errors[0]}}</small>
            </validation-provider>
          </div>
          <button type="submit" class="btn btn-success btn-sm ml-3"
          :disabled="!valid"> {{$t(`__login`)}} </button>
        </validation-observer>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$router.push('/');
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss">
.cus-input-rounded-0 input{
  border-radius: 0;
}
  @media (min-width: 768px) {
    .login-area {
      width: 360px;
    }
  }
</style>
