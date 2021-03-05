<template>
  <div class="container-fluid pt-5"
  style="background-color: #d2d6de; height: 100vh;">
    <h2 class="text-center font-weight-bolder my-4">Wiside</h2>
    <login-area/>
    <div class="position-absolute" style="bottom: 20px;">
      <lang-buttons></lang-buttons>
    </div>
  </div>
</template>

<script>
import LangButtons from '../components/LanguageButtons.vue';
import LoginArea from '../components/LoginArea/LoginArea.vue';

export default {
  name: 'login',
  components: {
    LangButtons,
    LoginArea,
  },
};
</script>
