<template>
  <div>
    <van-nav-bar title="登录" class="login-navbar" />
    <van-form @submit="onSubmit" class="form" ref="formRef">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model.trim="code"
        type="code"
        name="密码"
        placeholder="请填写验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isButtonShow"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss 秒"
            v-else
            @finish="isButtonShow = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeApi } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '13911111111',
      code: '246810',
      mobileRules,
      codeRules,
      isButtonShow: true
    }
  },
  methods: {
    async onSubmit() {
      this.loading()
      try {
        const data = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        if (error.status === 400) {
          this.$toast.fail(error.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      await this.$refs.formRef.validate('mobile')
      this.loading()
      try {
        await sendCodeApi(this.mobile)
        this.isButtonShow = false
      } catch (err) {
        throw err()
      }
    },
    ...mapMutations(['SET_TOKEN'])
  }
}
</script>

<style lang="less" scoped>
.login-navbar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px !important;
  }
  .btn {
    height: 51.2px;
    background-color: #eee;
    color: #a58594;
  }
}
</style>
