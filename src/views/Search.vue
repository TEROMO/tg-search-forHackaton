<template>
	<div>
		<h1>Поиск по сообщениям</h1>
		<SearchField 
			:name="'Введите сообщение'"
		/>

		<div v-show="show">
			<div v-if="allItems.length">
				<MessageComponent 
					v-for="message in allItems" 
					:key="message.id"
					:message="message"
					@openModal="showModal"
				/>
				<template v-if="needToLoad">
					<div class="d-flex justify-content-center mt-4" v-if="!ajaxShowLoader">
						<b-button variant="outline-primary" @click="update(true)">Загрузить еще</b-button>
					</div>
					<Loader v-else class="mt-5" />
				</template>
			</div>
			<Loader v-else class="mt-5" />
		</div>
		<div v-if="notFound">
		Ничего не найдено
		</div>
		<ModalShort 
			:item="modalData"
			:modalShow="modalShow"
			@changeShow="modalShow = $event"
		/>
	</div>
</template>
<script>
import SearchField from '@/components/SearchField'
import MessageComponent from '@/components/MessageComponent'
import ModalShort from '@/components/ModalShort'
import Loader from '@/components/app/Loader'
import ajaxLoadMixin from '@/mixins/ajax.load.mixin'

export default {
	name: 'Search',
	metaInfo () {
    return {
      title: 'Поиск'
    }
  },
	mixins: [ajaxLoadMixin],
	data() {
		return {
			type: 'message',
		}
	},
	components: {
    MessageComponent, ModalShort, SearchField, Loader
  }
}
</script>
