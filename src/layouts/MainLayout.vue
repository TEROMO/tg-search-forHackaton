<template>
	<b-container fluid>
    <b-row>
      <b-col cols="3" class="bg-light">
        <Navbar />
      </b-col>
      <b-col cols="9">
				<div class="main-content">
					<slot></slot>
				</div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Navbar from '@/components/app/Navbar.vue'
export default {
	components: {
		Navbar
	},
	computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (err) {
      this.$error(err || 'Что-то пошло не так')
    }
  }
}
</script>
<style scoped>
	.main-content {
		padding: 20px 15px;
	}
</style>