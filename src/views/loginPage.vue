<template lang="html">
  <div>
    <Head-view></Head-view>
    <div id="login-wrap">
      <div class="login-row">
        <label for="account">账号</label>
        <input type="text" name="" value="" id='account'>
      </div>
      <div class="login-row">
        <label for="password">密码</label>
        <input type="password" name="" value="" id='password'>
      </div>
      <div class="login-row">
        <a href="#">登录</a>
        <a href="#">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../components/head'
const url = 'http://127.0.0.8:3000/?baseName=users'
export default {
  components: {
    'Head-view': Head
  },
  methods: {
    loginIn () {
      
    }
  }
}
</script>

<style lang="css">
#login-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.login-row {
  display: flex;
  justify-content: center;
}
</style>
