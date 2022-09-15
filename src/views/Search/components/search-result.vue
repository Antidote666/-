<template>
  <div class="result">
    <van-list
      @load="getResult"
      v-model="loading"
      :finished="finished"
      finished-text="没有过多了"
      :error.sync="error"
      error-text="点我重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in results"
        :key="item.art_id"
        :to="'/detail?articleId=' + item.art_id"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perpage: 10,
      results: []
    }
  },
  methods: {
    async getResult() {
      try {
        if (Math.random() > 0.5) {
          throw new Error()
        }
        const {
          data: { results }
        } = await getResult(this.page++, this.perpage, this.keywords)
        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
