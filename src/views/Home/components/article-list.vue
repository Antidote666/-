<template>
  <div>
    <article-item
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></article-item>
  </div>
</template>

<script>
import { getArticles } from '@/api/news'
import ArticleItem from './article-item.vue'
export default {
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, Date.now())
        this.articles = data.results
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        }
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
