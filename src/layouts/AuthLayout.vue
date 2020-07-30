<template>
  <b-container>
    <b-row>
      <b-col cols="6" offset="3" class="fullheight d-flex align-items-center flex-column justify-content-center">
        <div class="form">
          <div class="d-flex align-items-center justify-content-center mb-4">
            <img class="logo" src="@/assets/logo.svg" alt="Logo"><h1>Вход {{$appName}}</h1>
          </div>
          <slot></slot>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (err) {
      this.$error('Ошибка', err || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-bottom: 0;
  }
  .fullheight { 
    min-height: 100vh;
  }
  .fullheight > * {
    width: 100%;
  }
  .logo {
    max-width: 50px;
    display: inline-block;
    height: auto;
    margin-right: 0.9rem;
  }
  .form {
    max-width: 400px;
  }
</style>
