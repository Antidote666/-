<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
//   git commit -m ''
//      feat: 新增特性，
//      fixed: debugger
//      comment:新增注释yarn add vant@latest-v2 -S
</script>

<style lang="less"></style>
