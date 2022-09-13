<template>
  <div class="articlelsit">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        @load="getNextPageArticle"
        :offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败 请刷新~"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
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
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      isLoading: false
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
        this.pre_timestamp = data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        }
      }
    },
    async getNextPageArticle() {
      try {
        if (Math.random() > 0.5) {
          throw new Error()
        }
        const { data } = await getArticles(this.id, this.pre_timestamp)
        this.pre_timestamp = data.pre_timestamp
        if (this.isLoading) {
          this.articles.unshift(...data.results)
        } else {
          this.articles.push(...data.results)
        }
        if (data.results.length < 10) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    },
    onRefresh() {
      this.getNextPageArticle()
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.articlelsit {
  overflow: auto;
  height: calc(100vh - 100px - 82px - 92px);
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dddee0;
    border-radius: 10px;
  }
}
</style>
