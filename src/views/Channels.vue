<template>
	<div>
		<h1>Каналы</h1>

		<div v-if="show">
			<SearchField 
				:name="'Введите название канала'"
			/>
			<div class="mb-3" v-if="inSearch">
				<router-link to="/channels">Показать все каналы</router-link>
			</div>
			<div v-if="allItems.length && showList">
				<MainListItem 
					v-for="item in allItems" 
					:key="item.id"
					:item="item"
					@openModal="showModal"
				/>
				<template v-if="needToLoad">
					<div class="d-flex justify-content-center mt-4" v-if="!ajaxShowLoader">
						<b-button variant="outline-primary" @click="update(true)">Загрузить еще</b-button>
					</div>
					<Loader v-else class="mt-5" />
				</template>
			</div>
			<div v-else-if="notFound">
			Ничего не найдено
			</div>
			<Loader v-else class="mt-5" />
		</div>
		<Loader v-else class="mt-5" />
		<ModalShort 
			:item="modalData"
			:modalShow="modalShow"
			@changeShow="modalShow = $event"
		/>
	</div>
</template>
<script>
import ajaxLoadMixin from '@/mixins/ajax.load.mixin'
import SearchField from '@/components/SearchField'
import ModalShort from '@/components/ModalShort'
import MainListItem from '@/components/MainListItem'
import Loader from '@/components/app/Loader'

export default {
	name: 'Channels',
	metaInfo () {
    return {
      title: 'Каналы'
    }
  },
	mixins: [ajaxLoadMixin],
	data() {
		return {
			show: false,
			showList: false,
			inSearch: false,
			type: 'channel',
		}
	},
	components: {
    MainListItem, SearchField, Loader, ModalShort
  }
}
</script>
