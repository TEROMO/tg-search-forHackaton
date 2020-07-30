<template>
	<div>
		<b-jumbotron header-level="4">
			<template v-slot:header><img class="logo" src="@/assets/logo.svg" alt="Logo">Добро пожаловать в {{ $appName }}</template>

			<template v-slot:lead>
				Приложение для сбора статистики сообщений из telegram каналов и чатов
			</template>

			<hr class="my-4">

			<p>
				Для работы бота следует добавить бота в нужный канал или чат и предоставить ему <strong>права администратора</strong>!
			</p>
		</b-jumbotron>
	</div>
</template>
<script>
export default {
	name: 'Home',
	metaInfo () {
    return {
      title: 'Главная'
    }
  },
}
</script>
<style scoped>
.logo {
	max-width: 100px;
	display: inline-block;
	height: auto;
	margin-right: 2rem;
	margin-bottom: 1rem;
}
</style>