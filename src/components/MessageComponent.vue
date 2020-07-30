<template>
  <div>
    <b-card :title="message.authorName" class="mb-2">
      <b-card-text>{{ message.text }}</b-card-text>
      <div
        class="bottom-message d-flex justify-content-between align-items-center"
      >
        <a href="#" class="card-link" @click="openUser">Посмотреть автора</a>
        <div>
          <span class="chat"
            >Чат:
            <b-link :to="`/chats/${message.chatId}`">{{
              message.chatName
            }}</b-link></span
          >
          <small class="text-muted">{{ message.date }}</small>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      required: true,
      type: Object,
      id: Number,
      authorId: Number,
      chatId: Number,
      chatName: String
    }
  },
  methods: {
    openUser(e) {
      e.preventDefault()
      this.$emit('openModal', { id: this.message.authorId, type: 'user' })
    }
  }
}
</script>
<style scoped>
.bottom-message {
  border-top: 1px solid #dfdfdf;
  margin-top: 1rem;
  padding-top: 1rem;
}
.chat {
  margin-right: 1rem;
}
</style>
