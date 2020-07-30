<template>
	<b-modal v-model="show" centered :title="this.hasItem ? titleModal : 'Загрузка...'">
		<Loader v-if="!this.hasItem" />
		<template v-else>
			<div class="d-flex align-items-center">
				<a target="_blank" :href="item.photo" class="avatar"><img :src="item.photo" alt="Avatar"></a>
				<div v-if="item.type === 'user'">
					<h6><strong>Имя: </strong>{{ item.name }}</h6>
					<h6><strong>Фамилия: </strong>{{ item.secondName }}</h6>
				</div>
				<div v-else>
					<h6><strong>Название: </strong>{{ item.title }}</h6>
				</div>
			</div>
			<h6 class="mt-4"><strong>Информация: </strong></h6>
			<p>{{ item.aboutText }}</p>
		</template>
		<template v-if="this.hasItem" v-slot:modal-footer>
			<div class="w-100">
				<b-button
					variant="primary"
					class="float-right"
					:to="getMorePath"
				>
					Подробная информация
				</b-button>
			</div>
		</template>
		<template v-else v-slot:modal-footer>
			<div class="w-100">
				<b-button
					variant="primary"
					class="float-right"
					@click="show = false"
				>
					Закрыть
				</b-button>
			</div>
		</template>
		
	</b-modal>
</template>
<script>
import Loader from '@/components/app/Loader'

export default {
  props: {
    item: {
      required: true,
      type: Object,
			id: Number
    },
		modalShow: {
			type: Boolean,
			default: false,
			required: true
		}
  }, 
	components: {
		Loader
	},
	computed: {
		hasItem() {
			return Object.keys(this.item).length
		},
		titleModal() {
			return this.item.nameTg ? '@'+this.item.nameTg : this.item.title
		},
		getMorePath() {
			if(this.item.type === 'user') {
				return `/users/${this.item.id}`
			} else {
				return `${this.$route.path}/${this.item.id}`
			}
		}
	},
	data() {
		return {
			show: this.modalShow
		}
	},
	watch: {
		modalShow(val) {
			this.show = val
		},
		show(val) {
			this.$emit('changeShow', val)
		}
	}
}
</script>
<style scoped>
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: block;
		overflow: hidden;
		margin-right: 3rem;
	}
	img {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>