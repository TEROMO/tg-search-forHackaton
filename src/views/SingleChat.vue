<template>
	<div>
		<div v-if="show">
			<MainInfo 
				:item="info"
			/>
			<div class="chart-area-wrapper" v-if="hasData(info.messages)">
				<h5 class="mb-3"><strong>Активность чата</strong></h5>
				<LineChart :height="200" :data="info.messages" :title="'За последний месяц'" />
			</div>

			<div class="chart-area-wrapper" v-if="hasData(info.users)">
				<h5 class="mb-3"><strong>Пользователи</strong></h5>
				<MainListItem 
					v-for="item in info.users" 
					:key="item.id"
					:item="item"
					:shortInfo="false" />
			</div>

			<div class="chart-area-wrapper" v-if="hasData(info.activeUsers)">
				<h5 class="mb-3"><strong>Самые активные пользователи</strong></h5>
				<b-table :fields="fields" striped hover :items="info.activeUsers">
					<template v-slot:cell(nameTg)="data">
						<b-link :to="`/users/${data.item.id}`">@{{ data.item.nameTg }}</b-link>
					</template>
				</b-table>
			</div>
		</div>
		<Loader v-else class="mt-5" />
	</div>
</template>
<script>

import Loader from '@/components/app/Loader'
import MainInfo from '@/components/MainInfo'
import LineChart from '@/components/charts/LineChart.js'
import MainListItem from '@/components/MainListItem'

export default {
	name: 'Users',
	metaInfo () {
    return {
      title: 'Информация о чате'
    }
  },
	data() {
		return {
			show: false,
			type: 'chat',
			info: {},
			fields: [
				{ key: 'place', label: 'Место' },
				{ key: 'name', label: 'Имя' },
				{ key: 'nameTg', label: 'Имя пользователя' },
				{ key: 'countMessages', label: 'Количество сообщений' },
			]
		}
	},
	computed: {
		getId() {
			return +this.$route.params.id
		},
	},
	methods: {
		hasData(arr) {
			if(typeof arr !== 'undefined') {
				if(arr.length) {
					return true
				}
			}
		}
	},
	async mounted() {
		try {
			this.show = false
			const info = await this.$store.dispatch('getInfo', {
				type: this.type,
				id: this.getId,
			})
			this.info = info
			this.show = true
		} catch (e) {
			this.$error(
				'Ошибка',
				'Не удалось загрузить чат.'
			)
			setTimeout(() => {
				this.$router.push('/chats')
			}, 2000)
		}
	},
	components: {
    Loader, MainInfo, LineChart, MainListItem
  }
}
</script>
<style scoped>
.chart {
	max-width: 300px;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 3rem;
}
.chart-area-wrapper {
	text-align: center;
	max-width: 900px; 
	margin: 0 auto;
	margin-bottom: 2rem;
}
</style>