<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isPopupShow = true"></span>
    </van-tabs>
    <van-popup
      close-icon-position="top-left"
      closeable
      v-model="isPopupShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        v-if="isPopupShow"
        :channel="channel"
        :active-id.sync="activeId"
        @delChannel="delChannel"
        @addChannel="addChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, editChannelAPI } from '@/api/channel'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      channel: [],
      isPopupShow: false
    }
  },
  created() {
    if (!this.isLogin && this.myChannels.length) {
      this.channel = this.myChannels
    } else {
      this.getChannelAPI()
    }
  },
  computed: {
    activeId: {
      set(val) {
        this.active = this.channel.findIndex((item) => item.id === val)
        this.isPopupShow = false
      },
      get() {
        return this.channel[this.active]?.id
      }
    },
    ...mapGetters(['isLogin']),
    ...mapState(['myChannels'])
  },
  methods: {
    async getChannelAPI() {
      try {
        const {
          data: { channels }
        } = await getChannelAPI()
        this.channel = channels
        console.log(channels)
      } catch (error) {
        if (!error.status) throw error
      }
    },
    async delChannel(id, curId) {
      try {
        this.channel = this.channel.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(this.channel)
        }
        this.active = this.channel.findIndex((item) => item.id === curId)
        this.$toast.success('删除频道成功')
      } catch (error) {}
    },
    async addChannel(item) {
      try {
        this.channel.push(item)
        if (this.isLogin) {
          await editChannelAPI(item.id, this.channel.length)
        } else {
          this.SET_MY_CHANNELS(this.channel)
        }
        this.$toast.success('添加频道成功')
      } catch (error) {}
    },
    ...mapMutations(['SET_MY_CHANNELS'])
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3396fc;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .van-button--block {
    width: 7.4rem;
    background-color: #5babfb !important;
    border: unset;
    color: #fff;
    font-size: 0.37333rem;
    .van-icon {
      color: #fff;
    }
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
