export default {
  data() {
    return {
      page: 0, // текущая страница
      pageSize: 2, // кол-во элкмкнтов на странице
      allItems: [], // все элементы
      ajaxShowLoader: false,
      needToLoad: false,
      modals: [],
      modalShow: false,
      modalData: {},
      show: false,
      notFound: false
    }
  },
  methods: {
    addItems(itemsPart) {
      this.allItems.push(...itemsPart)
      this.page++
    },
    resetPage() {
      this.page = 0
      this.modals = []
      this.modalShow = false
      this.modalData = {}
    },
    async showModal({ id, type }) {
      try {
        this.modalData = {}
        this.modalShow = true
        const modal = this.modals.find(m => m.id === id)
        if (!modal) {
          const newModal = await this.$store.dispatch('getShortInfo', {
            type,
            id
          })
          this.modals.push(newModal)
          this.modalData = newModal
        } else {
          this.modalData = modal
        }
      } catch (e) {
        this.modalShow = false
        this.modalData = {}
        this.$error(
          this.$error(
            'Ошибка',
            'Не удалось распознать пользователя. Пожалуйста, обновите страницу.'
          )
        )
      }
    },
    async search() {
      this.show = true
      if (this.type !== 'message') {
        this.inSearch = true
      }
      try {
        this.ajaxShowLoader = true
        const response = await this.$store.dispatch('search', {
          type: this.type,
          searchField: this.field,
          page: this.page,
          count: this.pageSize
        })
        this.addItems(response.items)
        this.needToLoad = response.needToLoad
        this.ajaxShowLoader = false
      } catch (e) {
        console.log(e)
        if (e === 'not-found') {
          this.show = false
          this.notFound = true
        } else {
          this.$error(
            'Ошибка',
            'Не удалось распознать ваш запрос. Пожалуйста, обновите страницу.'
          )
        }
      }
    },
    async getAll() {
      try {
        this.inSearch = false
        this.ajaxShowLoader = true
        const response = await this.$store.dispatch('getAll', {
          type: this.type,
          page: this.page,
          count: this.pageSize
        })
        this.addItems(response.items)
        this.needToLoad = response.needToLoad
        this.ajaxShowLoader = false
      } catch (e) {
        this.$error(
          this.$error(
            'Ошибка',
            'Не удалось распознать ваш запрос. Пожалуйста, обновите страницу.'
          )
        )
      }
    },
    async update(fetch) {
      this.notFound = false
      const searchString = this.$route.query.s
      if (!fetch) {
        this.show = false
        this.showList = false
        this.allItems = []
      }
      if (searchString) {
        await this.search(searchString)
      } else {
        if (this.type !== 'message') {
          await this.getAll()
        }
      }
      if (!fetch && this.type !== 'message') {
        this.showList = true
        this.show = true
      }
    }
  },
  async mounted() {
    this.update()
  },
  watch: {
    $route() {
      this.resetPage()
      this.update()
    }
  }
}
