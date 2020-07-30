<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Логин:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="$v.login.$model"
          type="text"
          required
          placeholder="Введите логин"
        ></b-form-input>
        
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="$v.password.$model"
          type="password"
          required
          placeholder="Введите пароль"
        ></b-form-input>
        <b-form-invalid-feedback :state="$v.password.minLength">Пароль должен содержать более 6 символов</b-form-invalid-feedback>
      </b-form-group>

      <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary" :disabled="$v.$invalid || sending">Войти</b-button>
        <b-button type="reset" variant="danger" class="ml-2">Сброс</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import messages from '@/utils/messages'

  export default {
    data() {
      return {
        login: '',
        password: '',
        sending: false
      }
    },
    metaInfo () {
      return {
        title: 'Войти'
      }
    },
    validations: {
      login: {
        required,
      }, 
      password: {
        required,
        minLength: minLength(6)
      },
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
          if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const form = {
          login: this.login, 
          password: this.password
        }
        try {
          this.sending = true
          await this.$store.dispatch('login', form)
          this.$router.push('/')
        } catch (e) {
          this.sending = false
          this.$error(
            'Ошибка',
            'Не удалось авторизоваться.'
          )
        }
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.login = ''
        this.password = ''
      }
    },
    mounted () {
      if (messages[this.$route.query.message]) {
        this.$error(messages[this.$route.query.message].title, messages[this.$route.query.message].text)
      }
    }
  }
</script>
