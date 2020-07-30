<template>
	<b-form @submit.prevent="submitHandler" inline class="flex-nowrap mt-4 mb-4">
		<label class="sr-only" for="inline-form-input-search">{{name}}</label>
		<b-input
		size="lg"
			id="inline-form-input-search"
			class="mb-2 mr-sm-2 mb-sm-0 input"
			width="100%"
			v-model="$v.searchField.$model"
			:placeholder="name"
		></b-input>

		<b-button type="submit" @click.prevent="submitHandler" variant="primary" size="lg" :disabled="$v.$invalid">Найти</b-button>
	</b-form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    name: {
			type: String,
			required: true
		}
  }, 
	data() {
		return {
			searchField: '',
		}
	},
	validations: {
		searchField: { required }
	},
	methods: {
		submitHandler() {
			if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
			this.$router.push('?s='+this.searchField).catch(() => {})
		},
		update() {
			const searchString = this.$route.query.s
			if(searchString) {
				this.searchField = searchString
			} else {
				this.searchField = ''
			}
		}
	},
	async mounted() {
		this.update()
	},
	watch: {
    $route() {
			this.update()
    }
  }
}
</script>
<style scoped>
	.input {
		width: 100%;
	}
</style>