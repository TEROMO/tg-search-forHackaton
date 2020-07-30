<template>
	<div>
		<b-jumbotron header-level="4" style="height: 100vh">
			<template v-slot:header>Ошибка 404</template>

			<template v-slot:lead>
				Страница не найдена!
			</template>

			<hr class="my-4">

			<p>
				На <router-link to="/">главную страницу</router-link> приложения {{ $appName }}
			</p>
		</b-jumbotron>
	</div>
</template>
<script>
export default {
	name: 'Error'
}
</script>