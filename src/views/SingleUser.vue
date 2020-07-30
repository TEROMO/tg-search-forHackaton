<template>
	<div>
		<div v-if="show">
			<MainInfo 
				:item="info"
			/>
			<div class="chart-area-wrapper" v-if="hasData(info.chatsMessages)">
				<h5 class="mb-3"><strong>Активность в чатах</strong></h5>
				<BarChart :height="200" :data="info.chatsMessages" :title="'Активность в чатах'" />
			</div>

			<div class="chart-area-wrapper" v-if="hasData(info.messages)">
				<h5 class="mb-3"><strong>Сообщения в день</strong></h5>
				<LineChart :height="200" :data="info.messages" :title="'За последний месяц'" />
			</div>
			<div class="chart-area-wrapper" v-if="hasData(info.chats)">
				<h5 class="mb-3"><strong>Чаты</strong></h5>
				<MainListItem 
					v-for="item in info.chats" 
					:key="item.id"
					:item="item"
					:shortInfo="false" />
			</div>
		</div>
		<Loader v-else class="mt-5" />
	</div>
</template>
<script>

import Loader from '@/components/app/Loader'
import MainInfo from '@/components/MainInfo'
import BarChart from '@/components/charts/BarChart.js'
import LineChart from '@/components/charts/LineChart.js'
import MainListItem from '@/components/MainListItem'

export default {
	name: 'Users',
	metaInfo () {
    return {
      title: 'Информация о пользователе'
    }
  },
	data() {
		return {
			show: false,
			type: 'user',
			info: {}
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
				'Не удалось загрузить пользователя.'
			)
			setTimeout(() => {
				this.$router.push('/users')
			}, 2000)
		}
	},
	components: {
    Loader, MainInfo, BarChart, LineChart, MainListItem
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