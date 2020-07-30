<template>
	<div class="d-flex align-items-center justify-content-between item bg-light border rounded mb-2">
    <div class="left d-flex align-items-center">
      <div class="img"><img :src="item.photo" alt="Avatar"></div>
      <router-link :to="getMorePath" class="ml-3 font-weight-bold title-block">{{getTitle}}</router-link>
    </div>
    <b-button v-if="shortInfo" variant="primary" @click="openModal">Краткая информация</b-button>
    <b-button v-else :to="getMorePath" variant="primary">Информация</b-button>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
			id: Number,
    },
    shortInfo: {
      required: false,
      default: true,
      type: Boolean
    }
  },
  computed: {
    getTitle() {
      return this.item.title ? this.item.title : this.item.name
    },
    getMorePath() {
      return `/${this.item.type}s/${this.item.id}`
		}
  },
  methods: {
		openModal(e) {
			e.preventDefault()
			this.$emit('openModal', { id:this.item.id, type: this.item.type })
		}
	}
}
</script>
<style scoped>
  .item {
    padding: 10px 15px;
  }
  .img {
    height: 50px;
    width: 50px;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  .title-block {
    color: #000000;
  }
</style>