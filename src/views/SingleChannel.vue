<template>
	<div>
		<div v-if="show">
			<MainInfo 
				:item="info"
			/>
			<div class="chart-area-wrapper" v-if="hasData(info.messages)">
				<h5 class="mb-3"><strong>Активность канала</strong></h5>
				<LineChart :height="200" :data="info.messages" :title="'За последний месяц'" />
			</div>
			
		</div>
		<Loader v-else class="mt-5" />
	</div>
</template>
<script>

import Loader from '@/components/app/Loader'
import MainInfo from '@/components/MainInfo'
import LineChart from '@/components/charts/LineChart.js'

export default {
	name: 'Users',
	metaInfo () {
    return {
      title: 'Информация о канале'
    }
  },
	data() {
		return {
			show: false,
			type: 'channel',
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
				'Не удалось загрузить канал.'
			)
			setTimeout(() => {
				this.$router.push('/channels')
			}, 2000)
		}
	},
	components: {
    Loader, MainInfo, LineChart
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