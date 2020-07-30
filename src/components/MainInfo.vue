<template>
  <div>
    <h1 class="mb-4">{{ getTitle }}</h1>
    <div class="wrapper">
      <div class="d-flex align-items-center mb-5">
        <a target="_blank" :href="item.photo" class="avatar"
          ><img :src="item.photo" alt="Avatar"
        /></a>
        <div v-if="item.type === 'user'">
          <h5><strong>Имя: </strong>{{ item.name }}</h5>
          <h5><strong>Фамилия: </strong>{{ item.secondName }}</h5>
        </div>
        <div v-else>
          <h5><strong>Название: </strong>{{ item.title }}</h5>
        </div>
      </div>
      <div>
        <h5><strong>Информация: </strong></h5>
        <p>{{ item.aboutText }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  computed: {
    getTitle() {
      return this.item.nameTg ? '@' + this.item.nameTg : this.item.title
    }
  }
}
</script>
<style scoped>
.wrapper {
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 4rem;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: block;
  overflow: hidden;
  margin-right: 2rem;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
