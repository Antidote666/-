<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button
        size="mini"
        class="title-btn"
        round
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid :column-num="4" :gutter="10" :border="false">
        <van-grid-item
          v-for="item in channel"
          :class="{ active: item.name == activeName }"
          :key="item.id"
          :icon="isEdit && item.name != activeName ? 'cross' : ''"
          :text="item.name"
          @click="gridClick(item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid :column-num="4" :gutter="10" :border="false">
        <van-grid-item
          v-for="item in filterChannel"
          :key="item.id"
          icon="plus"
          :text="item.name"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api/channel'
export default {
  props: {
    channel: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannel: []
    }
  },
  computed: {
    filterChannel() {
      return this.allChannel.filter(
        (item) => !this.channel.find((chan) => chan.id === item.id)
      )
    }
  },
  created() {
    this.getAllChannelAPI()
  },
  methods: {
    async getAllChannelAPI() {
      try {
        const { data } = await getAllChannelAPI()
        this.allChannel = data.channels
        console.log(this.allChannel)
      } catch (error) {}
    },
    gridClick({ name }) {
      if (this.isEdit && name !== this.activeName) {
        this.$emit('delChannel', name)
      } else {
        this.$emit('update:activeName', name)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 92px;
  :deep(.title-btn) {
    color: red;
    border-color: red;
    width: 100px;
    font-size: 25px;
  }
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
