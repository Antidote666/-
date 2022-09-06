<template>
  <div>
    <van-nav-bar title="登录" class="login-navbar" />

    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="密码"
        placeholder="请填写验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /\d{6}/, message: '验证码格式错误' }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit() {}
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
}
</style>
