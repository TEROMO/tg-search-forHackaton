<template>
	<div class="sidebar">
		<b-nav vertical>
			<b-nav-item
				v-for="link in links" 
				:key="link.url"
				:to="link.url"
				exact
				active-class="text-secondary"
			>
				<b-icon :icon="link.icon" class="icon"></b-icon>
				{{ link.title }}
			</b-nav-item>
		</b-nav>
	</div>
</template>
<script>
export default {
	data() {
		return {
			links: [
				{ title: 'Главная', url: '/', icon: 'house-fill' },
				{ title: 'Поиск сообщений', url: '/search', icon: 'search' },
				{ title: 'Чаты ', url: '/chats', icon: 'envelope-fill' },
				{ title: 'Каналы ', url: '/channels', icon: 'chat-fill' },
				{ title: 'Пользователи', url: '/users', icon: 'person-fill' },
				{ title: 'Настройки', url: '/settings', icon: 'gear-fill' },
			]
		}
	},
}
</script>
<style scoped>
	.sidebar {
		padding: 15px 0;
		min-height: 100vh;
	}
	.router-link-active {
		text-decoration: underline !important;
	}
	.icon {
		margin-right: 0.3rem;
	}
</style>