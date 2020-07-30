<template>
	<div>
		<h1 class="mb-3">Настройки</h1>		
		<h6 class="mb-4"><strong>Бот: </strong>{{ $botName }}</h6>
			<div class="mb-4">
				<label class="d-block" for="inline-form-input-email">Почта для приёма уведомлений</label>
				<b-form inline @submit.prevent="updateEmail">
					<b-input-group class="mr-2 input">
						<b-input type="email" id="inline-form-input-email" placeholder="Почта" :value="getEmail" v-model="$v.email.$model"></b-input>
					</b-input-group>
					<b-button type="submit" variant="primary" :disabled="$v.$invalid || sending">Сохранить</b-button>
				</b-form>
				<b-form-invalid-feedback :state="$v.email.email">Введите корректную почту</b-form-invalid-feedback>
			</div>
		<div class="mb-5">
			<h3 class="mb-3">Разработчики</h3>
			<b-list-group class="list">
				<b-list-group-item class="d-flex align-items-center justify-content-between"><span>Асадов Руслан (Frontend, Fullstack, презентация)</span> <b-button variant="primary" href="https://teleg.run/asadovru" target="_blank">Связаться</b-button></b-list-group-item>
				<b-list-group-item class="d-flex align-items-center justify-content-between"><span>Эдуард Таловиков (Backend, Email, презентация, дизайн)</span> <b-button variant="primary" href="https://teleg.run/EduardTalovikov" target="_blank">Связаться</b-button></b-list-group-item>
				<b-list-group-item class="d-flex align-items-center justify-content-between"><span>Никита Земсков (Backend)</span> <b-button variant="primary" href="https://teleg.run/sorry_but_i_amoral" target="_blank">Связаться</b-button></b-list-group-item>
				<b-list-group-item class="d-flex align-items-center justify-content-between"><span>Илья Черных (Презентация)</span> <b-button variant="primary" href="https://teleg.run/RED2cat" target="_blank">Связаться</b-button></b-list-group-item>
			</b-list-group>
		</div>
		<div>
			<b-button to="/logout" variant="outline-danger">Выйти из системы</b-button>
		</div>
	</div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
	name: 'Settings',
	metaInfo () {
    return {
      title: 'Настройки'
    }
  },
	data() {
		return {
			email: '',
			sending: false
		}
	},
	validations: {
		email: {
			required,
			email
		}
	},
	methods: {
		async updateEmail(evt) {
			evt.preventDefault()
				if (this.$v.$invalid || this.email == this.getEmail) {
				this.$v.$touch()
				return
			}
			try {
				this.sending = true
				await this.$store.dispatch('updateEmail', this.email)
				this.$message('Готово!', 'Ваша почта успешно обновлена!')
				this.sending = false
			} catch(e) { 
				this.sending = false
				this.$error(
          this.$error(
            'Ошибка',
            'Не удалось обновить почту. Пожалуйста, обновите страницу.'
          )
        )
			}
		}
	},
	computed: {
		getEmail() {
			return this.$store.getters.mainEmail
		}
	},
	mounted() {
		this.email = this.getEmail
	}
}
</script>
<style computed>
	.input {
		min-width: 300px;
	}
	.list {
		max-width: 650px;
	}
</style>