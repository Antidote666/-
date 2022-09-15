<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in heightLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      handler: 'getSuggestions',
      immediate: true
    }
  },
  computed: {
    heightLightSuggestions() {
      // const reg = new RegExp(this.keywords, 'ig')
      // return this.suggestions.map((str) =>
      //   str.split(reg).join(`<span style="color:red">${this.keywords}</span>`)
      // )
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      const { data } = await getSuggestions(this.keywords)
      this.suggestions = data.options.filter(Boolean)
    }, 1000)
  }
}
</script>

<style></style>
