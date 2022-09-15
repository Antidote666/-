<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isSearchResultShow = false"
      />
    </form>
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isSearchResultShow: false
    }
  },
  computed: {
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isSearchResultShow) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    },
    ...mapState(['histories'])
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      this.SET_HISTORIES([...new Set([keywords, ...this.histories])])
      this.keywords = keywords
      this.isSearchResultShow = true
    }
  },

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style lang="less" scoped>
[role='button'] {
  color: #fff;
}
</style>
