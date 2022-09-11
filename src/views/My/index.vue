<template>
  <div class="profile">
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row
          type="flex"
          justify="center"
          align="center"
          style="height: 100%"
        >
          <van-col span="11">
            <van-row
              type="flex"
              style="height: 100%"
              justify="center"
              align="center"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="https://img1.baidu.com/it/u=4064025444,3686295405&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662829200&t=fae69d519c7980030e29d0d8a70f9a33"
              >
              </van-image>
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="8"></van-col>
          <van-col span="5">
            <van-row>
              <van-button size="mini" round class="editBtn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          :src="logoutSrc"
          width="1.76rem"
          height="1.76rem"
        ></van-image>
        <span class="text">登录/注册</span>
      </div>
    </header>

    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <footer>
      <van-button block v-if="isLogin" @click="logout" style="color: red"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logoutSrc from '../../assets/images/mobile.png'
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      logoutSrc,
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    if (this.isLogin) this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
        console.log(this.userInfo)
      } catch (error) {
        if (error?.status) return console.log(error)
        throw error
      }
    },
    logout() {
      this.$dialog
        .alert({
          cancelButtonText: '取消',
          showCancelButton: true,
          confirmButtonText: '确认',
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #f5f7f9;
  height: 100vh;
  .link {
    margin: 10px 0;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
  .toutiao {
    font-size: 30px;
  }
}
.banner {
  width: 100%;
  height: 5.333rem;
  // background-image: url('@/assets/images/banner.png');
  // background-repeat: no-repeat;
  // background-size: cover;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    color: #fff;
    font-size: 30px;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
    margin-left: 5px;
  }
  .van-row {
    height: 100%;
  }
  .editBtn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
